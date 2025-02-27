import type { CollectionConfig } from 'payload'

const NewsTags: CollectionConfig = {
  slug: 'news-tags',
  admin: {
    useAsTitle: 'name',
    description:
      'Tags related to the news post you make to categorize them. e.g. Research, Story, etc.',
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
        description: 'A unique tag name that you can attach on your post to categorize them.',
      },
    },
  ],
  timestamps: false,
}

export default NewsTags
