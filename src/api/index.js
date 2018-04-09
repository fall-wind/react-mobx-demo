import { domain } from './config'

import rpc from './rpc'

export const queryCorpList = (...params) => rpc.get(`/corp/query`)(...params)

export const daCall = (url, params) => rpc.get(url)(params)
