class BlogService {
  private _baseUrl = `https://blog.kata.academy/api/`;
  private async getResource(url: string, token?: string) {
    let res;

    if (token !== undefined) {
      res = await fetch(url, {
        method: 'get',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
    } else {
      res = await fetch(url);
    }

    const body = (await res.json()) as
      | GetArticlesResponse
      | GetArticleSlugResponse
      | UserInfo
      | ErrorResponse;
    if (!res.ok) {
      const { errors } = body as ErrorResponse;
      throw new Error(`${errors.message}`);
    }
    return body;
  }

  private async postResource(url: string, payload: string) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: payload,
    });
    const body = await res.json();
    if (!res.ok) {
      const { errors } = body as ErrorResponse;
      const error =
        String(Object.entries(errors))[0].toUpperCase() +
        String(Object.entries(errors)).replace(/,/, ' ').slice(1);
      throw new Error(`${error}`);
    }
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

  async getLoggedUser(token: string) {
    console.log(token);
    return (await this.getResource(`${this._baseUrl}user/`, token)) as UserInfo;
  }
}

export default new BlogService();
