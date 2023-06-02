class BlogService {
  private _baseUrl = `https://blog.kata.academy/api/`
  private async getResource(url: string) {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    const body = (await res.json()) as
      | GetArticlesResponse
      | GetArticleSlugResponse
    return body
  }

  async getArticles(offset: number) {
    const res = (await this.getResource(
      `${this._baseUrl}/articles?limit=5&offset=${offset}`,
    )) as GetArticlesResponse
    return { articles: res.articles, totalArticles: res.articlesCount }
  }

  async getArticleBySlug(slug: string) {
    const res = (await this.getResource(
      `${this._baseUrl}/articles/${slug}`,
    )) as GetArticleSlugResponse
    console.log(res.article)
    return res.article
  }
}

export default new BlogService()
