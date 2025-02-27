'use client'

import { useRowLabel } from '@payloadcms/ui'

const EditorialBoardMembersRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ name?: string }>()

  return <div>{data?.name || `Member ${String(rowNumber).padStart(2, '0')}`}</div>
}

export default EditorialBoardMembersRowLabel
