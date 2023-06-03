import React from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "../components/layout/layout"
import ArticlePage from "../pages/article-page/article-page"
import ListPage from "../pages/list-page/list-page"
import SignInPage from '../pages/signIn-page/signin-page'
import SignUpPage from "../pages/signUp-page/signUp-page"

const App: React.FC = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ListPage />} />
          <Route path="/articles" element={<ListPage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/sign-in' element={<SignInPage />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
