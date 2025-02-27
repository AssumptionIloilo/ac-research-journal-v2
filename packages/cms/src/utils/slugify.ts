function _trimChars(str: string, c: string) {
  const re = new RegExp('^[' + c + ']+|[' + c + ']+$', 'g')
  return str.replace(re, '')
}

/** Utility function for converting a string into a slug.  */
export const slugify = (val: string): string => {
  let slug = val
    .replace(/ /g, '-')
    .replace(/[^\w-/]+/g, '')
    .toLowerCase()

  slug = _trimChars(slug, '-')
  return slug
}
