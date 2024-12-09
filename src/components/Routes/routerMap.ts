/**
 * Router list
 * @param {string} path
 * @param {string} name
 */
import { ComponentType } from 'react'
import { ConnectedComponent } from 'react-redux'
import { EarnPage } from '../EarnPage'
import { StakingPage } from '../StakingPage'
import { Page404 } from '../Page404'

export interface IRouter {
  path: string
  name: string
  redirect?: string
  component?: ConnectedComponent<ComponentType<any>, any>
  auth?: boolean
}

const routers: Array<IRouter> = [
  {
    path: '/',
    name: 'ProfileRedirect',
    redirect: '/earn',
  },
  {
    path: '/earn',
    name: 'earn',
    component: EarnPage,
  },
  {
    path: '/staking',
    name: 'benefit',
    component: StakingPage,
  },
  {
    path: '*',
    name: 'notFound',
    component: Page404,
  }
]

export default routers