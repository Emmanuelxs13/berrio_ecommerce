import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, LoginCredentials, RegisterData } from '@/types';
import * as api from '@/lib/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  setAuth: (user: User, token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setAuth: (user, token) => {
        if (typeof globalThis.window !== 'undefined') {
          localStorage.setItem('auth-token', token);
        }
        set({
          user,
          token,
          isAuthenticated: true,
          error: null,
        });
      },

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.login(credentials);
          
          if (typeof globalThis.window !== 'undefined') {
            localStorage.setItem('auth-token', response.token);
          }

          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: unknown) {
          const message =
            error instanceof Error
              ? error.message
              : 'Error al iniciar sesión';
          set({
            isLoading: false,
            error: message,
          });
          throw error;
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.register(data);
          
          if (typeof globalThis.window !== 'undefined') {
            localStorage.setItem('auth-token', response.token);
          }

          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: unknown) {
          const message =
            error instanceof Error
              ? error.message
              : 'Error al registrarse';
          set({
            isLoading: false,
            error: message,
          });
          throw error;
        }
      },

      logout: () => {
        if (typeof globalThis.window !== 'undefined') {
          localStorage.removeItem('auth-token');
        }
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'berrio-auth-storage',
      version: 1,
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
