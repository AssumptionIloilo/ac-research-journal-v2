/**
 * This file contains all the collections to be used for the CMS.
 *
 * You are required to organize the collections here to their respective groups.
 * Just edit `groups`
 *
 * The exported `collections` will be the final variable.
 */

import type { CollectionConfig } from 'payload'

// Collections
import ArchiveCategories from './archive/ArchiveCategories'
import Archives from './archive/Archives'
import Guidelines from './guidelines/Guidelines'
import Media from './management/Media'
import Users from './management/Users'
import News from './news/News'
import NewsTags from './news/NewsTags'

type GroupedCollections = Record<string, CollectionConfig[]>
export const groups: GroupedCollections = {
  '📰 News & Stories': [News, NewsTags],
  '🗃️ Archive': [Archives, ArchiveCategories],
  '📜 Guidelines': [Guidelines],
  '⚙️ Management': [Media, Users],
}

/**
 * Collections with their Groups Applied to them.
 */
const appliedGroups = Object.keys(groups).map((groupKey) => {
  return groups[groupKey].map((collection) => ({
    ...collection,
    admin: {
      ...collection.admin,
      group: groupKey,
    },
  }))
})

/**
 * Final Collections Config Array with respective groups.
 */
const collections: CollectionConfig[] = appliedGroups.filter((arr) => arr.length > 0).flat()

export default collections
