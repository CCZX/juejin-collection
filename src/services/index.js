import request from './request'
import { COLLECTION_LIST_URL, ARTICLE_LIST_URL, USER_INFO_URL } from './apiURL'
import { getNodeENV } from './../utils'
import CollectionListData from './../mock/collectionlist.json'
import ArticleListData from './../mock/articlelist.json'
import UserInfo from './../mock/userinfo.json'

const PROD = "production"
const ENV = getNodeENV()

export function getUserInfo() {
  if (ENV === PROD) {
    return request.get(`${USER_INFO_URL}`)
  } else {
    return Promise.resolve({
      err_no: 0,
      data: UserInfo
    })
  }
}

export function getCollectionList() {
  if (ENV === PROD) {
    return request.get(`${COLLECTION_LIST_URL}?cursor=0&limit=100`)
  } else {
    return Promise.resolve({
      err_no: 0,
      data: CollectionListData
    })
  }
}

export function getArticleList(tag_id) {
  if (ENV === PROD) {
    return request.get(`${ARTICLE_LIST_URL}?tag_id=${tag_id}&cursor=0`)
  } else {
    return Promise.resolve({
      err_no: 0,
      data: {
        article_list: ArticleListData[tag_id]
      }
    })
  }
}
