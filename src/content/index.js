import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { getCollectionList } from './../api'
import MockList from './../../mock/list.json'
import './index.scss'

export default function CollectionList() {
  const [collectionList, setList] = useState([])

  useEffect(() => {
    // const list = await getCollectionList()
    // const { err_no, data } = list
    setList(MockList)
  }, [])

  return <div className="juejin-collection-wrapper">
    <div className="list">
      {
        collectionList.map(item => {
          return <div className="item">
            {item.tag_name}
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
