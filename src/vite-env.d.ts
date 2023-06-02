/// <reference types="vite/client" />

interface Article {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: {
    username: string
    bio: string
    image: string
    following: boolean
  }
}

interface GetArticlesResponse {
  articles: Article[]
  articlesCount: number
}

interface GetArticleSlugResponse {
  article: Article
}
