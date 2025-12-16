/**
 * Hook para gestionar el historial de búsquedas
 * Guarda las búsquedas en localStorage
 */

import { useState, useEffect } from 'react';

const SEARCH_HISTORY_KEY = 'berrio_search_history';
const MAX_HISTORY_ITEMS = 10;

export interface SearchHistoryItem {
  query: string;
  timestamp: number;
  categoryId?: string;
  brandId?: string;
}

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  // Cargar historial al montar
  useEffect(() => {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setHistory(parsed);
      } catch (error) {
        console.error('Error parsing search history:', error);
      }
    }
  }, []);

  // Agregar búsqueda al historial
  const addToHistory = (item: Omit<SearchHistoryItem, 'timestamp'>) => {
    const newItem: SearchHistoryItem = {
      ...item,
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      // Filtrar duplicados (misma query y filtros)
      const filtered = prev.filter(
        (h) =>
          !(
            h.query === item.query &&
            h.categoryId === item.categoryId &&
            h.brandId === item.brandId
          )
      );

      // Agregar al inicio y limitar
      const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);

      // Guardar en localStorage
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));

      return updated;
    });
  };

  // Eliminar item del historial
  const removeFromHistory = (index: number) => {
    setHistory((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Limpiar historial completo
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
}
