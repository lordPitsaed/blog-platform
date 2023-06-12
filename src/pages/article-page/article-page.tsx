import { Alert } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import Article from '../../components/article-item/article-item';
import Loading from '../../components/loading-spin/loading-spin';
import { fetchArticleBySlug } from './article-pageSlice';

const ArticlePage: React.FC = () => {
  const { slug } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { article, status, error } = useSelector((state: RootState) => state.articlePageSlice);
  const { token, userLogged } = useSelector((state: RootState) => {
    let token = '';
    if (state.loginSlice.userLogged && state.loginSlice.status === 'success') {
      token = state.loginSlice.user.user.token;
    }
    return { token, userLogged: state.loginSlice.userLogged };
  });

  useEffect(() => {
    if (slug) {
      if (userLogged) {
        dispatch(fetchArticleBySlug({ slug, token }));
      } else {
        dispatch(fetchArticleBySlug({ slug }));
      }
    }
  }, [dispatch]);

  if (status === 'pending') {
    return <Loading />;
  }
  if (status === 'success') {
    return <Article article={article} fullText />;
  }
  return <Alert message='Error' description={error.message} type='error' showIcon />;
};

export default ArticlePage;
