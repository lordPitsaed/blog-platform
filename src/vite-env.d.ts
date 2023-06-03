/// <reference types="vite/client" />

interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

interface GetArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

interface GetArticleSlugResponse {
  article: Article;
}

interface RegisterData {
  user: {
    username: string;
    email: string;
    password: string;
  };
}

interface LoginData {
  user: {
    email: string;
    password: string;
  };
}

interface UserInfo {
  user: {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
  };
}
