import { get, post } from './http'

export const satinCommentApi = cab => get('/v1/cities', cab)
export const login = cab => post('/marathon/user/login', cab)                   // 登陆
export const logout = cab => get('/marathon/user/logout', cab)                  // 退出

export const getUserInfo = cab => get('/marathon/user/info', cab)               // 获取当前登录用户信息
export const getAuctionNumber = cab => get('/auction/auctionNumber', cab)       // 获取拍卖号码
export const getAuctionInfo = cab => get('/auction/auctionInfo', cab)           // 获取某个号码的竞拍信息
export const getOffer = cab => post('/auction/offer', cab)                      // 号码竞拍-出价
export const getWatching = cab => post('/auction/watching', cab)                // 围观人数增加
export const getRemindList = cab => get('/auction/user/remindList', cab)        // 获取用户订阅列表
export const getRemind = cab => post('/auction/user/remind', cab)               // 用户关注某个号码的竞拍
export const getIsRemind = cab => post('/auction/user/isRemind', cab)           // 是否已订阅
export const getCancelRemind = cab => post('/auction/user/cancelRemind', cab)   // 取消订阅，用户不再关注某个号码的竞拍
export const getMargin = cab => get('/auction/user/margin', cab)                // 用户的保证金获取
export const getMarginLog = cab => get('/auction/user/marginLog', cab)          // 用户的保证金流水记录
export const send = cab => post('/marathon/matchInfo/verify/send', cab)         // 发送短信验证码
export const verifyCode = cab => post('/marathon/matchInfo/verifyCode', cab)    // 手机验证码有效性验证

export const auctionList = cab => get('/auction/user/auctionList', cab)         // 用户的拍卖列表