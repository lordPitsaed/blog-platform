import { Tag } from 'antd';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TextOverflow from 'react-text-overflow';
import remarkGfm from 'remark-gfm';
import { RootState } from '../../app/store';
import blogPlatformService from '../../blog-platform-service';
import Avatar from '../avatar/avatar';
import classes from './article-item.module.scss';
import hasLikeImg from './heart-fill-ico.svg';
import noLikeImg from './heart-ico.svg';

const Article: React.FC<{ article: Article; fullText: boolean }> = ({ article, fullText }) => {
  const { token, username } = useSelector((state: RootState) => {
    if (state.loginSlice.userLogged && state.loginSlice.status === 'success') {
      return { token: state.loginSlice.user.user.token, username: state.loginSlice.user.user.username };
    } else {
      return { token: '', username: '' };
    }
  });

  const [liked, setLiked] = useState(article.favorited);

  const likeClick = () => {
    if (token) {
      if (!liked) {
        blogPlatformService.postLike(token, article.slug).then((res) => {
          console.log(res.article.favorited);
          setLiked(res.article.favorited);
        });
      } else {
        blogPlatformService.deleteLike(token, article.slug).then((res) => {
          setLiked(res.article.favorited);
        });
      }
    }
  };

  return (
    <article>
      <div className={classes.heading} style={fullText ? { margin: '0 0 16px 0' } : {}}>
        <div className={classes.articleInfo}>
          <Link to={`/articles/${article.slug}`}>
            <h5>
              <TextOverflow truncatePosition='end' text={article.title} />
            </h5>
          </Link>

          <div className={classes.favoritesCount} onClick={likeClick}>
            <img src={liked ? hasLikeImg : noLikeImg} />
            {article.favoritesCount}
          </div>
          <div className={classes.tags}>
            {article.tagList.map((tag: string, idx) => {
              if (tag.length > 0) {
                return (
                  <Tag key={idx}>
                    <TextOverflow truncatePosition='end' text={tag} />
                  </Tag>
                );
              }
            })}
          </div>
        </div>
        <div className={classes.authorInfo}>
          <div className={classes.authorName}>
            <TextOverflow truncatePosition='end' text={article.author.username} />
          </div>
          <div className={classes.createdAt}>{format(new Date(article.createdAt), 'MMMM d, y')}</div>
          <Avatar url={article.author.image} />
        </div>
      </div>

      <div className={classes.description}>
        <TextOverflow truncatePosition='end' text={article.description} />
        {article.author.username === username && fullText && (
          <div>
            <button
              className={classes.deleteArticle}
              onClick={() => blogPlatformService.deleteArticle(token, article.slug)}
            >
              Delete
            </button>
            <Link to={`edit`} className={classes.editArticle}>
              Edit
            </Link>
          </div>
        )}
      </div>

      {fullText && (
        <div className={classes.text}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown>
        </div>
      )}
    </article>
  );
};

export default Article;
