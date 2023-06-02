import { Alert, Spin } from "antd"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { AppDispatch, RootState } from "../../app/store"
import Article from "../../components/article-item/article-item"
import Loading from "../../components/loading-spin/loading-spin"
import { fetchArticleBySlug } from "./article-pageSlice"

const ArticlePage: React.FC = () => {
  const { slug } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { article, status, error } = useSelector(
    (state: RootState) => state.articlePageSlice,
  )
  useEffect(() => {
    dispatch(fetchArticleBySlug(slug as string))
  }, [dispatch])

  if (status === "pending") {
    return <Loading />
  }
  if (status === "success") {
    return <Article article={article} fullText />
  }
  return (
    <Alert
      message="Error"
      description={error.map((el) => el.message)}
      type="error"
      showIcon
    />
  )
}

export default ArticlePage
