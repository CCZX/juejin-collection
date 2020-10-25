import React from 'react'
import ReactDOM from 'react-dom'

/**
 * 
 * @param {JSX.Element} app 
 * @param {string} id 
 */
export default function render(app, id) {
  let wrapper = document.getElementById(id)
  if (!wrapper) {
    wrapper = document.createElement('div')
    wrapper.id = id
    document.documentElement.appendChild(wrapper)
  }
  ReactDOM.render(app, wrapper)
}
