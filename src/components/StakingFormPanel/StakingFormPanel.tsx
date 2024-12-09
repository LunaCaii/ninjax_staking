import { memo, useEffect, useState } from 'react'
import './styles/StakingFormPanel.scss'
import { useTranslation } from 'react-i18next'

const StakingFormPanel = (props: any) => {
  const { t }:any = useTranslation()

  return (
    <div className='com-panel'>
      Staking
    </div>
  )
}

export default memo(StakingFormPanel)