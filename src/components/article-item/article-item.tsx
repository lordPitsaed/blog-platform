import { nanoid } from "@reduxjs/toolkit"
import { Tag } from "antd"
import { format } from "date-fns"
import React from "react"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { Link } from "react-router-dom"
import TextOverflow from "react-text-overflow"
import classes from "./article-item.module.scss"
import avatarPh from "./avatar-ph.png"

const Article: React.FC<{ article: Article; fullText: boolean }> = ({
  article,
  fullText,
}) => {
  return (
    <article>
      <div
        className={classes.heading}
        style={fullText ? { margin: "0 0 16px 0" } : {}}
      >
        <div className={classes.articleInfo}>
          <Link to={`/articles/${article.slug}`}>
            <h5>
              <TextOverflow truncatePosition="end" text={article.title} />
            </h5>
          </Link>
          <div className={classes.favoritesCount}>{article.favoritesCount}</div>
          <div className={classes.tags}>
            {article.tagList.map((tag: string) => {
              return (
                <Tag key={nanoid()}>
                  <TextOverflow truncatePosition="end" text={tag} />
                </Tag>
              )
            })}
          </div>
        </div>
        <div className={classes.authorInfo}>
          <div className={classes.authorName}>
            <TextOverflow
              truncatePosition="end"
              text={article.author.username}
            />
          </div>
          <div className={classes.createdAt}>
            {format(new Date(article.createdAt), "MMMM d, y")}
          </div>
          <img
            className={classes.authorImage}
            src={article.author.image}
          />
        </div>
      </div>

      <div className={classes.description}>
        <TextOverflow truncatePosition="end" text={article.description} />
      </div>
      {fullText && (
        <div className={classes.text}>
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>
      )}
    </article>
  )
}

export default Article
