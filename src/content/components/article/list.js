import React from 'react'

export default function ArticleList(props) {
  const { data } = props

  return <div className="article-list">
    {
      Array.isArray(data) && data.map(articleItem => {
        return <div>{articleItem.article_info.title}</div>
      })
    }
  </div>
}
