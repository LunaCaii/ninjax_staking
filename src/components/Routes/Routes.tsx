import { connect } from 'react-redux'
import Routers, { IRouter } from './routerMap'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Header } from '../Header'

const RoutesList = (props: any) => {
  return (
    <div className="app-layout">
      <div className='header-box'>
        <Header />
      </div>
      <div className='body-box'>
        <Routes>
          {Routers.map((item: IRouter, index) => (
            <Route
              path={item.path}
              key={index}
              element={
                item.redirect ? (
                  <Navigate to={item.redirect} replace />
                ) : (
                  item.component && <item.component />
                )
              }
            />
          ))}
        </Routes>
      </div>
      {/* <div className='footer-box'></div> */}
    </div>
  )
}

export default connect((state) => state, { })(RoutesList)