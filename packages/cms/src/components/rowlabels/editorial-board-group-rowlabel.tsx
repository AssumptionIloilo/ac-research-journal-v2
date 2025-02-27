'use client'

import { useRowLabel } from '@payloadcms/ui'

const EditorialBoardGroupRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ heading?: string }>()

  return <div>{data?.heading || `Board Group ${String(rowNumber).padStart(2, '0')}`}</div>
}

export default EditorialBoardGroupRowLabel
