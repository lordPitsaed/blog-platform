import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../HOC/protectedRouteHOC';
import Layout from '../components/layout/layout';
import ArticlePage from '../pages/article-page/article-page';
import EditProfilePage from '../pages/editProfile-page/editProfile-page';
import ListPage from '../pages/list-page/list-page';
import SignInPage from '../pages/loginPage/loginPage';
import SignUpPage from '../pages/signUp-page/signUp-page';

const App: React.FC = () => {
  return (
    <main>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<ListPage />} />
          <Route path='/articles' element={<ListPage />} />
          <Route path='/articles/:slug' element={<ArticlePage />} />
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
        </Route>
      </Routes>
    </main>
  );
};

export default App;
