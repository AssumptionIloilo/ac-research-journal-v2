import type { CollectionConfig } from 'payload'

const ArchiveCategories: CollectionConfig = {
  slug: 'archive-categories',
  admin: {
    useAsTitle: 'name',
    description:
      'Categories related to the archives to categorize them for filtering. e.g. Mariale, Transformateur, Science, etc.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      unique: true,
      admin: {
        description:
          'A unique category name that you can attach on an archive item to categorize it.',
      },
    },
  ],
  timestamps: false,
}

export default ArchiveCategories
