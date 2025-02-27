import type { FieldHook } from 'payload/types'

import { slugify } from './slugify'

/** Format Slug is a Field Hook Callback. */
const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    if (typeof value === 'string') {
      return slugify(value)
    }
    const fallbackData = data?.[fallback] || originalDoc?.[fallback]

    if (fallbackData && typeof fallbackData === 'string') {
      return slugify(fallbackData)
    }

    return value
  }

export default formatSlug
