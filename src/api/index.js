import { login, userInfo, editUserInfo, editPhoto } from './user'
import { ownChannels } from './channel'
import { articleList } from './article'

// 暴露
export const loginAPI = login
export const userInfoAPI = userInfo
export const editUserInfoAPI = editUserInfo
export const editPhotoAPI = editPhoto
export const ownChannelsAPI = ownChannels
export const articleListAPI = articleList