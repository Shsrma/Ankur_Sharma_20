/**
 * API configuration and client
 * Centralized API management for all HTTP requests
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

/**
 * Generic API request handler
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return data as ApiResponse<T>;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Contact API endpoints
 */
export const contactAPI = {
  /**
   * Submit contact form
   */
  submit: (formData: ContactFormData) =>
    apiRequest<{ id: string }>('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    }),
};

/**
 * Project API endpoints
 */
export const projectAPI = {
  /**
   * Get all projects
   */
  getAll: () => apiRequest<any[]>('/projects'),

  /**
   * Get featured projects only
   */
  getFeatured: () =>
    apiRequest<any[]>('/projects', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    }).then((res) => {
      // Note: This would need backend support for ?featured=true
      return res;
    }),

  /**
   * Get project by ID
   */
  getById: (id: string) => apiRequest<any>(`/projects/${id}`),
};
