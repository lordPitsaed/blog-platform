import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import ArticleForm from '../../components/article-form/article-form';
import { fetchArticleBySlug } from '../article-page/article-pageSlice';

const EditArticlePage: React.FC = () => {
  const { slug } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const article = useSelector((state: RootState) => {
    return state.articlePageSlice.article;
  });
  const { userLogged } = useSelector((state: RootState) => state.loginSlice);
  const username = useSelector((state: RootState) => {
    if (state.loginSlice.userLogged && state.loginSlice.status === 'success') {
      return state.loginSlice.user.user.username;
    } else {
      return '';
    }
  });

  useEffect(() => {
    if (!article.author && slug) {
      dispatch(fetchArticleBySlug({ slug }));
    }
  }, [dispatch]);
  useEffect(() => {
    if (article.author && userLogged && username !== article.author.username) {
      navigate('/', { replace: true });
    }
  }, [userLogged, username, article]);

  return <ArticleForm mode='edit'></ArticleForm>;
};

export default EditArticlePage;
