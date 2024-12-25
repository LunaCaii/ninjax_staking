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
  console.log('Current maximum page number', pageMax, pageShowNums)
  const goToPage = (newPageNum: number) => {
    if (pageMax > 3 && newPageNum <= pageMax - 1 && newPageNum >= 2) {
      setPageShowNums([newPageNum-1,newPageNum,newPageNum+1])
    }
    setPageNum(newPageNum)
    onChange(newPageNum)
  }
  const goToLastPage = () => {
    if (pageNum >= 2) {
      if (pageNum === 2) {
        // to 1
        setPageNum(pageNum - 1)
        onChange(pageNum - 1)
      } else if (pageNum > 2) {
        // to > 1
        setPageShowNums([pageNum - 2, pageNum - 1, pageNum])
        setPageNum(pageNum - 1)
        onChange(pageNum - 1)
      }
    } else if (pageNum < 2) {
      if (pageMax === 1) {
        setPageShowNums([1])
      } else if (pageMax === 2) {
        setPageShowNums([1, 2])
      } else if (pageMax === 3) {
        setPageShowNums([1, 2, 3])
      }
    }
  }
  const goToNextPage = () => {
    // Adjust the page number display area
    if (pageMax === 2) {
      setPageShowNums([1,2])
      setPageNum(pageNum + 1)
      onChange(pageNum + 1)
    } else if (pageMax === 1) {
      setPageShowNums([1])
      setPageNum(1)
      onChange(1)
    } else if (pageNum <= pageMax - 2) {
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