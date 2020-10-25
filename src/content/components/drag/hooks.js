import React, { useEffect, useRef, useState } from 'react'

export function useDrag(dragType) {
  const dragRef = useRef()
  useEffect(() => {
    if (dragRef.current) {
      dragRef.current.draggable = true
      dragRef.current.id = "custom-drag-dom"
      dragRef.current.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData(dragType, e.target.id);
      })
    }
  }, [dragRef.current])
  return [dragRef, dragType]
}

export function useDrop(dragType, dragDom) {
  const dropRef = useRef()
  useEffect(() => {
    if (dropRef.current) {
      const handleDrop = (e) => {
        e.preventDefault();
        console.log(dragDom)
        const data = e.dataTransfer.getData(dragType);
        e.target.appendChild(dragDom.current);
      }
      const allowDrop = (e) => {
        e.preventDefault()
      }
      dropRef.current.addEventListener('drop', handleDrop)
      dropRef.current.addEventListener('dragover', allowDrop)
    }
  }, [dropRef.current, dragDom])
  return [dropRef]
}
