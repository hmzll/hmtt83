import { login, userInfo, editUserInfo, editPhoto } from './user'
import { ownChannels, allChannels, resetChannel } from './channel'
import { articleList, articleDetail } from './article'
import { getCmtList, sendCmt } from './comment'
import { suggest, resultList } from './search'

// 暴露
export const loginAPI = login
export const userInfoAPI = userInfo
export const editUserInfoAPI = editUserInfo
export const editPhotoAPI = editPhoto
export const ownChannelsAPI = ownChannels
export const articleListAPI = articleList
export const articleDetailAPI = articleDetail
export const getCmtListAPI = getCmtList
export const sendCmtAPI = sendCmt
export const allChannelsAPI = allChannels
export const resetChannelAPI = resetChannel
export const suggestAPI = suggest
export const resultListAPI = resultList