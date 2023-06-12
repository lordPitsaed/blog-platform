import { Alert, Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import Article from '../../components/article-item/article-item';
import Loading from '../../components/loading-spin/loading-spin';
import { fetchArticlesList } from './list-pageSlice';

const ListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [pageParams, setPageParams] = useSearchParams({ page: '1' });
  const { token, userLogged } = useSelector((state: RootState) => {
    let token = '';
    if (state.loginSlice.userLogged && state.loginSlice.status === 'success') {
      token = state.loginSlice.user.user.token;
    }
    return { token, userLogged: state.loginSlice.userLogged };
  });
  const { articles, status, error, totalArticles } = useSelector((state: RootState) => state.listPageSlice);
  const totalPages = Math.ceil(totalArticles / 5) * 10;
  const pageNumber = Number(pageParams.get('page'));
  const [offset, setOffset] = useState((pageNumber - 1) * 5);

  useEffect(() => {
    if (status === 'success') {
      if (pageNumber === 0) {
        setOffset(0);
      }
      if (isNaN(pageNumber) || pageNumber < 0) {
        setPageParams({ page: `1` });
      }

      if (pageNumber > totalPages / 10) {
        setPageParams({ page: `${totalPages / 10}` });
        setOffset((totalPages / 10 - 1) * 5);
      }
    }
  }, [pageParams]);

  useEffect(() => {
    if (userLogged) {
      dispatch(fetchArticlesList({ offset, token: token }));
    }
    if (!userLogged) {
      dispatch(fetchArticlesList({ offset }));
    }
  }, [dispatch, offset]);

  if (status === 'pending') {
    return <Loading />;
  }
  if (status === 'success') {
    return (
      <>
        {articles.map((article) => {
          return <Article article={article} fullText={false} key={article.slug} />;
        })}
        <div className='pagination'>
          <Pagination
            current={Number(pageParams.get('page') || 1)}
            total={totalPages}
            showSizeChanger={false}
            onChange={(page) => {
              setOffset((page - 1) * 5);
              setPageParams({ page: `${page}` });
            }}
          />
        </div>
      </>
    );
  }
  return <Alert message='Error' description={error.message} type='error' showIcon />;
};

export default ListPage;
