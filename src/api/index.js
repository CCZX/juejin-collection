import request from './request'
import { collectionList } from './apiURL'

export function getCollectionList() {
  return request.get(`${collectionList}?cursor=0&limit=100`)
}
