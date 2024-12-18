import './styles/Page404.scss'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import img404 from './images/404.png'

const Page404 = (props: any) => {
  const { t }:any = useTranslation()
  return (
    <div className='page404'>
      <div className='page404-image'>
        <img src={img404} alt='' width={360} height={289}/>
      </div>
      <div className='page404-content'>
        <h1>{t('Page does not exist')}</h1>
        <p>{t('The page you requested could not be found. Please check your access address, or use the navigation above to access the corresponding page.')}</p>
      </div>
    </div>
  )
}

export default memo(Page404)