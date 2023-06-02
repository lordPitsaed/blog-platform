import React from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "../components/layout/layout"
import ArticlePage from "../pages/article-page/article-page"
import ListPage from "../pages/list-page/list-page"

const App: React.FC = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ListPage />} />
          <Route path="/articles" element={<ListPage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
