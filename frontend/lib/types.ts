export interface User {
  id: number;
  email: string;
  name: string;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
  };
}

export interface AuthResponse {
  message: string;
  token: string;
  name: string;
}

export interface BlogResponse {
  message: Blog[] | Blog;
}

export interface CreateBlogData {
  title: string;
  content: string;
}

export interface UpdateBlogData {
  id: number;
  title?: string;
  content?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  fullname: string;
} 