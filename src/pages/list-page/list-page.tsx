import { Alert, Pagination } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { AppDispatch, RootState } from "../../app/store"
import Article from "../../components/article-item/article-item"
import Loading from "../../components/loading-spin/loading-spin"
import { fetchArticlesList, setOffset } from "./list-pageSlice"

const ListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [pageParams, setPageParams] = useSearchParams({ page: "1" })
  const { articles, status, error, totalArticles, offset } = useSelector(
    (state: RootState) => state.listPageSlice,
  )
  const totalPages = Math.ceil(totalArticles / 5) * 10
  let pageNumber = Number(pageParams.get("page"))

  useEffect(() => {
    dispatch(fetchArticlesList(offset))
  }, [dispatch, pageNumber])

  useEffect(() => {
    if (status === "success") {
      if (isNaN(pageNumber) || pageNumber < 1) {
        pageNumber = 1
        navigate("/", { replace: true })
      }

      if (pageNumber > totalPages / 10) {
        console.log(totalPages)
        setPageParams({ page: `${totalPages / 10}` })
      }
    }
  }, [status, dispatch])

  if (status === "pending") {
    return <Loading />
  }
  if (status === "success") {
    return (
      <>
        {articles.map((article) => {
          return (
            <Article article={article} fullText={false} key={article.slug} />
          )
        })}
        <div className="pagination">
          <Pagination
            current={pageNumber}
            total={totalPages}
            showSizeChanger={false}
            onChange={(page) => {
              dispatch(setOffset((page - 1) * 5))
              setPageParams({ page: `${page}` })
            }}
          />
        </div>
      </>
    )
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

export default ListPage
