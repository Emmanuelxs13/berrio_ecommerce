/**
 * Hook para búsqueda por voz usando Web Speech API
 */

import { useState, useCallback } from 'react';

interface UseSpeechRecognitionResult {
  isListening: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  hasRecognitionSupport: boolean;
  error: string | null;
}

export function useSpeechRecognition(): UseSpeechRecognitionResult {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Verificar soporte del navegador
  const hasRecognitionSupport =
    typeof globalThis.window !== 'undefined' &&
    ('SpeechRecognition' in globalThis.window ||
      'webkitSpeechRecognition' in globalThis.window);

  const startListening = useCallback(() => {
    if (!hasRecognitionSupport) {
      setError('Tu navegador no soporta reconocimiento de voz');
      return;
    }

    try {
      // @ts-expect-error - webkit prefix for cross-browser support
      const SpeechRecognition =
        globalThis.window.SpeechRecognition ||
        globalThis.window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = 'es-ES';
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event: {
        results: { [key: number]: { [key: number]: { transcript: string } } };
      }) => {
        const transcriptResult = event.results[0][0].transcript;
        setTranscript(transcriptResult);
      };

      recognition.onerror = (event: { error: string }) => {
        setIsListening(false);
        if (event.error === 'no-speech') {
          setError('No se detectó voz. Intenta de nuevo.');
        } else if (event.error === 'not-allowed') {
          setError('Permiso de micrófono denegado');
        } else {
          setError('Error en el reconocimiento de voz');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error('Speech recognition error:', err);
      setError('Error al iniciar el reconocimiento de voz');
      setIsListening(false);
    }
  }, [hasRecognitionSupport]);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    hasRecognitionSupport,
    error,
  };
}
