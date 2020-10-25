import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { RightArrow } from './components/icons'
import ArticleList from './components/article/list'
import { getCollectionList } from './../api'
import MockList from './../../mock/list.json'
import { ArticleList as ArticleListData } from './../../mock/articlelist'
import './index.scss'

export default function CollectionList() {
  const [collectionList, setList] = useState([])
  const [openTagIds, setOpenTagIds] = useState([])
  const [articleList, setArticleList] = useState({})

  useEffect(() => {
    // const list = await getCollectionList()
    // const { err_no, data } = list
    setList(MockList)
  }, [])

  const toggleOpenTagIds = useCallback((tagId) => {
    const index = openTagIds.findIndex(id => id === tagId)
    const articleOfTag = ArticleListData[tagId]
    if (index === -1) {
      setOpenTagIds([...openTagIds, tagId])
      setArticleList({ ...articleList, [tagId]: articleOfTag })
    } else {
      setOpenTagIds(openTagIds.filter(item => item !== tagId))
    }
  }, [setOpenTagIds, openTagIds, articleList, setArticleList])

  return <div className="juejin-collection-wrapper">
    <div className="collection-list">
      {
        collectionList.map(item => {
          const tagId = item.tag_id
          return <div key={tagId} className="collection-item">
            <div className="header" onClick={() => toggleOpenTagIds(tagId)}>
              <span
                className="icon"
                style={{ transform: openTagIds.includes(tagId) ? `rotateZ(90deg)` : '' }}
              >
                <RightArrow />
              </span>
              <span className="tag-name">{item.tag_name}</span>
            </div>
            {
              openTagIds.includes(tagId) && articleList[tagId] && <div className="content">
                <ArticleList data={articleList[tagId]} />
              </div>
            }
          </div>
        })
      }
    </div>
  </div>
}

const box = document.createElement('div')
// box.id = "__juejin-collection-box"
// document.documentElement.appendChild(box)

// ReactDOM.render(<CollectionList />, document.getElementById('__juejin-collection-box'))
