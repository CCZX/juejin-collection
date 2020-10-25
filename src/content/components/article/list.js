import Item from 'antd/lib/list/Item'
import React from 'react'
import './index.scss'

export default function ArticleList(props) {
  const { data, isLoading } = props

  if (isLoading) {
    return <div className="loading">
      <span></span><span></span><span></span><span></span><span></span>
    </div>
  }

  return <div className="article-list">
    {
      Array.isArray(data) && data.map(articleItem => {
        const { article_id, article_info } = articleItem
        return <div key={article_id} className="article-item">
          <a className="title" href={article_info.link_url} target="_blank" title={article_info.title}>{article_info.title}</a>
        </div>
      })
    }
  </div>
}
