import React from 'react'
import { RightArrow } from './../icons'
import './index.scss'

export default function ToggleVisible(props) {
  const { onMouseOver } = props

  return <div className="toggle-visible-area" onMouseEnter={() => onMouseOver(true)}>
    <RightArrow />
  </div>
}
