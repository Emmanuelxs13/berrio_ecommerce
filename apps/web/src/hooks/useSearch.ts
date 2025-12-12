'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { searchProducts } from '@/lib/api';
import { Product } from '@/types';
import { useDebounce } from './useDebounce';

export function useSearch() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Debounce search query to avoid too many API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Perform search when debounced query changes
  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearchQuery.trim().length < 2) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchProducts(debouncedSearchQuery);
        setSearchResults(results);
        setShowResults(true);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedSearchQuery]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  }, []);

  const handleResultClick = useCallback(
    (productId: string) => {
      router.push(`/products/${productId}`);
      handleClearSearch();
    },
    [router, handleClearSearch]
  );

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setShowResults(false);
      }
    },
    [searchQuery, router]
  );

  return {
    searchQuery,
    isSearching,
    searchResults,
    showResults,
    handleSearchChange,
    handleClearSearch,
    handleResultClick,
    handleSearchSubmit,
    setShowResults,
  };
}
