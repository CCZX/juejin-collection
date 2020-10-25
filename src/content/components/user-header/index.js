import React, { useEffect, useState } from 'react'
import { Fixed } from './../icons'
import { getUserInfo } from '../../../services'
import './index.scss'

const fixedColor = '#f2f2f2'
const noFixedColor = '#969b9e'

export default function MyHeader(props) {
  const { isFixed, handleToggleFixed } = props

  const [userInfo, setUserInfo] = useState({})
  const [fixedIconColor, setFixedIconColor] = useState(noFixedColor)

  useEffect(() =>{
    setFixedIconColor(isFixed ? fixedColor : noFixedColor)
  }, [isFixed])

  useEffect(() => {
    (async () => {
      const { err_no, data } = await getUserInfo()
      if (err_no == 0) {
        setUserInfo(data)
      }
    })()
  }, [getUserInfo, setUserInfo])

  return <div className="user-header">
    <img className="avatar" src={userInfo.avatar_large} />
    <div className="info">
      <a href={`https://juejin.im/user/${userInfo.user_id}`} target="_blank" className="user-name">{userInfo.user_name}</a>
    </div>
    <div className="operation">
      <span className="operation-icon" onClick={handleToggleFixed}>
        <Fixed fill={fixedIconColor} />
      </span>
    </div>
  </div>
}
