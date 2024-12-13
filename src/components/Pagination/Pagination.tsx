import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './styles/Pagination.scss'
import { Arrow, ArrowLeft } from '@react-vant/icons'

const Pagination = (props: any) => {
  const { t }:any = useTranslation()
  const { current, pageSize, total, onChange } = props
  const [pageNum, setPageNum] = useState(current)
  const [pageMax, setPageMax] = useState(Math.ceil(total/pageSize))
  console.log('当前props', props)
  console.log('当前页码pageNum & pageMax', pageNum, pageMax)
  const goToPage = (newPageNum: number) => {
    setPageNum(newPageNum)
    onChange(newPageNum)
  }
  const goToLastPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1)
      onChange(pageNum - 1)
    }
  }
  const goToNextPage = () => {
    if (pageNum < pageMax) {
      setPageNum(pageNum + 1)
      onChange(pageNum+1)
    }
  }
  
  return (
    <div className='pagination'>
      <div className={`page-last ${ pageNum <=1 ? 'disabled' : ''}`} onClick={goToLastPage}><ArrowLeft  /></div>
      <ul className='page-num-list'>
        {Array(pageMax).fill(1).map((item: any, index: any) => {
          return <li key={`pgi-${index+1}`} className={`page-num ${pageNum === index+1 ? 'active' : ''}`} onClick={() => goToPage(index+1)}>{index+1}</li>
        })}
      </ul>
      <div className={`page-next ${pageNum >= pageMax ? 'disabled' : ''}`} onClick={goToNextPage}><Arrow  /></div>
    </div>
  )
}

export default memo(Pagination)