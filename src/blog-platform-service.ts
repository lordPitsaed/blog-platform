class ServerValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServerValidationError';
  }
}

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

    if (!res.ok && res.status !== 422) {
      throw new Error(`Something went wrong. Error code: ${res.status}.`);
    }
    const body = (await res.json()) as GetArticlesResponse | GetArticleSlugResponse | UserInfo | ErrorResponse;
    if (res.status === 422) {
      const { errors } = body as ErrorResponse;
      throw new ServerValidationError(JSON.stringify(errors));
    } else {
      return body;
    }
  }

  private async postResource(url: string, payload?: string, token?: string) {
    let res;
    if (token !== undefined && payload === undefined) {
      res = await fetch(url, {
        method: 'post',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
    } else {
      res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: payload,
      });
    }

    if (token !== undefined && payload !== undefined) {
      res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Token ${token}`,
        },
        body: payload,
      });
    }

    if (!res.ok && res.status !== 422) {
      throw new Error(`Something went wrong. Error code: ${res.status}.`);
    }
    const body = await res.json();
    if (res.status === 422) {
      const { errors } = body as ErrorResponse;
      throw new ServerValidationError(JSON.stringify(errors));
    } else {
      return body;
    }
  }

  private async putResource(url: string, token: string, payload: string) {
    const res = await fetch(url, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Token ${token}`,
      },
      body: payload,
    });
    const body = await res.json();
    if (!res.ok && res.status !== 422) {
      throw new Error(`Something went wrong. Error code: ${res.status}.`);
    }
    if (res.status === 422) {
      const { errors } = body as ErrorResponse;
      throw new ServerValidationError(JSON.stringify(errors));
    } else {
      return body;
    }
  }

  private async deleteResource(url: string, token: string) {
    const res = await fetch(url, {
      method: 'delete',
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    const body = await res.json();
    if (!res.ok && res.status !== 422) {
      throw new Error(`Something went wrong. Error code: ${res.status}.`);
    }
    return body;
  }

  async getArticles(offset: number, token?: string) {
    const res = (await this.getResource(
      `${this._baseUrl}articles?limit=5&offset=${offset}`,
      token,
    )) as GetArticlesResponse;
    return { articles: res.articles, totalArticles: res.articlesCount };
  }

  async getArticleBySlug(slug: string, token?: string) {
    const res = (await this.getResource(`${this._baseUrl}articles/${slug}`, token)) as GetArticleSlugResponse;
    return res.article;
  }

  async postRegisterUser(user: RegisterData) {
    console.log(user);
    const res = (await this.postResource(`${this._baseUrl}users`, JSON.stringify(user))) as UserInfo;
    return res;
  }

  async postLogin(user: LoginData) {
    const res = (await this.postResource(`${this._baseUrl}users/login`, JSON.stringify(user))) as UserInfo;
    return res;
  }

  async getLoggedUser(token: string) {
    return (await this.getResource(`${this._baseUrl}user/`, token)) as UserInfo;
  }

  async editUser(token: string, editData: EditData) {
    return await this.putResource(`${this._baseUrl}user/`, token, JSON.stringify(editData));
  }

  async postLike(token: string, slug: string) {
    return await this.postResource(`${this._baseUrl}articles/${slug}/favorite`, undefined, token);
  }

  async deleteLike(token: string, slug: string) {
    return await this.deleteResource(`${this._baseUrl}articles/${slug}/favorite`, token);
  }

  async postArticle(token: string, body: NewArticle) {
    return await this.postResource(`${this._baseUrl}/articles`, JSON.stringify(body), token);
  }

  async postEditedArticle(token: string, slug: string, body: NewArticle) {
    return await this.putResource(`${this._baseUrl}/articles/${slug}`, token, JSON.stringify(body));
  }

  async deleteArticle(token: string, slug: string) {
    return (await this.deleteResource(`${this._baseUrl}/articles/${slug}`, token)) as Article;
  }
}

export default new BlogService();
