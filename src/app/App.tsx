import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../HOC/protectedRouteHOC';
import Layout from '../components/layout/layout';
import ArticlePage from '../pages/article-page/article-page';
import CreateArticlePage from '../pages/createArticle-page/createArticle-page';
import EditArticlePage from '../pages/editArticle-page/editArticle-page';
import EditProfilePage from '../pages/editProfile-page/editProfile-page';
import ListPage from '../pages/list-page/list-page';
import SignInPage from '../pages/loginPage/loginPage';
import NotFoundPage from '../pages/notFound-page/notFound-page';
import SignUpPage from '../pages/signUp-page/signUp-page';

const App: React.FC = () => {
  return (
    <main>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<ListPage />} />
          <Route path='/articles'>
            <Route index element={<ListPage />} />
            <Route path=':slug'>
              <Route index element={<ArticlePage />} />
              <Route
                path='edit'
                element={
                  <ProtectedRoute>
                    <EditArticlePage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>

          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/sign-in' element={<SignInPage />} />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <EditProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/new-article'
            element={
              <ProtectedRoute>
                <CreateArticlePage />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
