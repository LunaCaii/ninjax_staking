import { memo, useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './styles/Pagination.scss'
import { Arrow, ArrowLeft } from '@react-vant/icons'

const Pagination = (props: any) => {
  const { t }:any = useTranslation()
  const pageRef = useRef(null);
  const { current, pageSize, total, onChange } = props
  const [pageNum, setPageNum] = useState(current)
  const [pageMax, setPageMax] = useState(Math.ceil(total/pageSize))
  const [pageShowNums, setPageShowNums] = useState<any>(pageMax >= 3 ? [1, 2, 3] : pageMax === 2 ? [1, 2] : pageMax === 1 ? [1] : [])
  console.log('当前最大页码', pageMax)
  const goToPage = (newPageNum: number) => {
    setPageNum(newPageNum)
    onChange(newPageNum)
  }
  const goToLastPage = () => {
    if (pageNum >= 2) {
      setPageShowNums([pageNum - 1, pageNum, pageNum + 1])
      setPageNum(pageNum - 1)
      onChange(pageNum - 1)
    }
  }
  const goToNextPage = () => {
    // 调整页码展示区域
    if (pageNum <= pageMax - 2) {
      const showNums = [pageNum, pageNum + 1, pageNum + 2]
      setPageShowNums(showNums)
      setPageNum(pageNum + 1)
      onChange(pageNum + 1)
    } else if (pageNum === pageMax - 1) {
      setPageShowNums([pageMax - 2, pageMax - 1, pageMax])
      setPageNum(pageNum + 1)
      onChange(pageNum + 1)
    }
  }

  useEffect(() => {
    console.log('pagination,,,', props.pageType, props.total)
  }, [])
  
  return (
    <div ref={pageRef}  className='pagination' key={props.pageType}>
      <div className={`page-last ${ pageNum <=1 ? 'disabled' : ''}`} onClick={goToLastPage}><ArrowLeft  /></div>
      <ul className='page-num-list'>
        {pageShowNums.map((item: any) => {
          return <li key={`pgi-${item}`} className={`page-num ${pageNum === item ? 'active' : ''}`} onClick={() => goToPage(item)}>{item}</li>
        })}
      </ul>
      <div className={`page-next ${pageNum >= pageMax ? 'disabled' : ''}`} onClick={goToNextPage}><Arrow  /></div>
    </div>
  )
}

export default memo(Pagination)