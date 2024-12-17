import { action } from 'typesafe-actions'
export const SHOW_Loading = '[Request] Show Loading'
export const CLOSE_Loading = '[Request] Close Loading'

export const showLoading = () => action(SHOW_Loading, { data: { open: true } })

export const closeLoading = () =>
  action(CLOSE_Loading, { data: { open: false } })

export type ShowLoadingAction = ReturnType<typeof showLoading>
export type CloseLoadingAction = ReturnType<typeof closeLoading>
