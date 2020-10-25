import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { RightArrow } from './components/icons'
import ArticleList from './components/article/list'
import UserHeader from './components/user-header'
import ToggleVisibleArea from './components/toggle-visible'
import { getCollectionList, getArticleList } from '../services'
import render from './render'
import { getNodeENV, setStorage, getStorage } from './../utils'
import { STORAGE_KEYS } from './../constants'
import './index.scss'

export default function App() {
  const localFixed = getStorage(STORAGE_KEYS.isFixed)

  const [collectionList, setCollectionList] = useState([])
  const [openTagIds, setOpenTagIds] = useState([])
  const [articleList, setArticleList] = useState({})
  const [isShow, setShow] = useState(true)
  const [isFixed, setFixed] = useState(localFixed ?? false)

  const wrapperClassName = useMemo(() => {
    const defaultName = "juejin-collection-wrapper"
    if (isFixed) {
      return defaultName
    }
    return isShow ? defaultName : `${defaultName} ${defaultName}-hidden`
  }, [isShow, isFixed])

  const showToggle = useMemo(() => {
    if (isFixed) {
      return false
    }
    return !isShow
  }, [isShow, isFixed])

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
    if (isFixed) return
    setShow(show)
  }, [isFixed, setShow])

  const handleToggleFixed = useCallback(() => {
    const nextIsFixed = !isFixed
    setStorage(STORAGE_KEYS.isFixed, nextIsFixed)
    setFixed(nextIsFixed)
  }, [setFixed, isFixed])

  return <div
    className={wrapperClassName}
    onMouseLeave={() => handleToggleShow(false)}
  >
    { showToggle && <ToggleVisibleArea onMouseOver={handleToggleShow} /> }
    <UserHeader handleToggleFixed={handleToggleFixed} isFixed={isFixed} />
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

getNodeENV() === 'production' && render(<App />, '__juejin-collection-box')
