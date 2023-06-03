class BlogService {
  private _baseUrl = `https://blog.kata.academy/api/`;
  private async getResource(url: string) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    const body = (await res.json()) as
      | GetArticlesResponse
      | GetArticleSlugResponse;
    return body;
  }

  private async postResource(url: string, payload: string) {
    console.log(payload);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: payload,
    });

    if (res.status === 422) {
      throw new Error(`User with this username already exist.`);
    } else if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}.`);
    }
    const body = await res.json();
    return body;
  }

  async getArticles(offset: number) {
    const res = (await this.getResource(
      `${this._baseUrl}articles?limit=5&offset=${offset}`,
    )) as GetArticlesResponse;
    return { articles: res.articles, totalArticles: res.articlesCount };
  }

  async getArticleBySlug(slug: string) {
    const res = (await this.getResource(
      `${this._baseUrl}articles/${slug}`,
    )) as GetArticleSlugResponse;
    return res.article;
  }

  async postRegisterUser(user: RegisterData) {
    const res = (await this.postResource(
      `${this._baseUrl}users`,
      JSON.stringify(user),
    )) as UserInfo;
    return res;
  }
  async postLogin(user: LoginData) {
    const res = (await this.postResource(
      `${this._baseUrl}users/login`,
      JSON.stringify(user),
    )) as UserInfo;
    return res;
  }
}

export default new BlogService();
