import React, { useEffect, useState } from 'react'
import { Fixed } from './../icons'
import { getUserInfo } from '../../../services'
import './index.scss'

export default function MyHeader() {
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    (async () => {
      const { err_no, data } = await getUserInfo()
      if (err_no == 0) {
        setUserInfo(data)
      }
    })()
  }, [getUserInfo])

  return <div className="user-header">
    <span className="avatar" style={{backgroundImage: `url(${userInfo.avatar_large})`}}></span>
    <div className="info">
      <a href={`https://juejin.im/user/${userInfo.user_id}`} target="_blank" className="user-name">{userInfo.user_name}</a>
    </div>
    <div className="operation">
      <Fixed />
    </div>
  </div>
}
