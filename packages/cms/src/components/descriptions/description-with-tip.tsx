'use client'

import { FC } from 'react'

import './descriptions.scss'

export type DescriptionWithTipProps = {
  text: string
  tip: string
}

const DescriptionWithTip: FC<DescriptionWithTipProps> = (props) => {
  const { text, tip } = props
  return (
    <>
      {text}
      <br />
      <span className="tip-text">{tip}</span>
    </>
  )
}

export default DescriptionWithTip

// export const makeDescriptionWithTip = (props: DescriptionWithTipProps) => () => (
//   <DescriptionWithTip {...props} />
// )
