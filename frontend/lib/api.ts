import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from './store';
import { AuthResponse, BlogResponse, CreateBlogData, UpdateBlogData, SignInData, SignUpData, Blog } from './types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== 'undefined') {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      if (typeof window !== 'undefined') {
        useAuthStore.getState().logout();
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signIn: async (data: SignInData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/user/signin', data);
    return response.data;
  },

  signUp: async (data: SignUpData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/user/signup', data);
    return response.data;
  },
};

// Blog API
export const blogAPI = {
  getAll: async (): Promise<Blog[]> => {
    const response = await api.get<BlogResponse>('/blog/bulk');
    return response.data.message as Blog[];
  },

  getById: async (id: number): Promise<Blog> => {
    const response = await api.get<BlogResponse>(`/blog/${id}`);
    return response.data.message as Blog;
  },

  create: async (data: CreateBlogData): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/blog/publish', data);
    return response.data;
  },

  update: async (data: UpdateBlogData): Promise<{ message: string; updatedBlog: Blog }> => {
    const response = await api.put<{ message: string; updatedBlog: Blog }>('/blog', data);
    return response.data;
  },
};

export default api; 