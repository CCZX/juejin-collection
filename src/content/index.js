import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { RightArrow } from './components/icons'
import ArticleList from './components/article/list'
import UserHeader from './components/user-header'
import ToggleVisibleArea from './components/toggle-visible'
import { getCollectionList, getArticleList } from '../services'
import render from './render'
import './index.scss'

export default function CollectionList() {
  const [collectionList, setCollectionList] = useState([])
  const [openTagIds, setOpenTagIds] = useState([])
  const [articleList, setArticleList] = useState({})
  const [isShow, setShow] = useState(false)

  useEffect(() => {
    (async () => {
      const list = await getCollectionList()
      const { err_no, data } = list
      if (err_no == 0) {
        setCollectionList(data)
      }
    })()
  }, [getCollectionList, setCollectionList])

  const toggleOpenTagIds = useCallback(async (tagId) => {
    if (!openTagIds.includes(tagId)) {
      const tagOfArticleList = await getArticleList(tagId)
      const {err_no, data} = tagOfArticleList
      if (err_no == 0) {
        setOpenTagIds([...openTagIds, tagId])
        setArticleList({ ...articleList, [tagId]: data.article_list })
      }
    } else {
      setOpenTagIds(openTagIds.filter(item => item !== tagId))
    }
  }, [setOpenTagIds, openTagIds, articleList, setArticleList])

  const handleToggleShow = useCallback((show) => {
    setShow(show)
  })

  return <div
    className={isShow ? "juejin-collection-wrapper" : "juejin-collection-wrapper hidden"}
    onMouseLeave={() => handleToggleShow(false)}
  >
    {
      !isShow && <ToggleVisibleArea
        onMouseOver={handleToggleShow}
        isShow={isShow}
      />
    }
    <UserHeader />
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

render(<CollectionList />, '__juejin-collection-box')
