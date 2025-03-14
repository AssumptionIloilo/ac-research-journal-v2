import type { CollectionConfig } from 'payload'

import { makeDescriptionWithHref } from '@/components/descriptions/description-with-href.make'
import { makeSlugField } from '@/components/slug-field/slug-field.make'
import isAdmin from '@/utils/access-control/is-admin'
import isAdminOrCurrentUser from '@/utils/access-control/is-admin-or-current-user'
import { extractTextFromContent } from '@/utils/extract-text-from-content'
import formatSlug from '@/utils/format-slug'
import { readingTime } from 'reading-time-estimator'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { SlateToLexicalFeature } from '@payloadcms/richtext-lexical/migrate'

const News: CollectionConfig = {
  slug: 'news',
  admin: {
    defaultColumns: ['title', 'author', 'status'],
    useAsTitle: 'title',
    components: {
      Description: makeDescriptionWithHref({
        displayedText: 'Blog posts appearing in',
        displayedHref: '/news',
        href: '/news',
      }),
    },
    livePreview: {
      url: ({ data }) => `http://localhost:3000/news/${data.slug}`,
    },
  },
  access: {
    read: () => true,
    update: () => true,
    delete: isAdminOrCurrentUser,
  },
  fields: [
    {
      name: 'featureImage',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      admin: {
        components: {
          Description: makeDescriptionWithHref({
            displayedText:
              'Will be used as the thumbnail for this news post. Tip: to optimize size, compress it before uploading with ',
            displayedHref: 'TinyJPG',
            href: 'https://tinyjpg.com',
          }),
        },
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Title for your news post.',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      access: {
        update: isAdmin,
      },
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        description: 'Who wrote this news post.',
        // condition: (data) => Boolean(data?.author),
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'news-tags',
      hasMany: true,
      admin: {
        description: 'Categorize your news post using tags.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        description: 'Write anything about your news/story article.',
      },
      // editor: lexicalEditor({
      //   features: ({ defaultFeatures }) => [...defaultFeatures,
      //     SlateToLexicalFeature({ disableHooks: true }),
      //   ],
      // }),
    },
    {
      name: 'readTime',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: (t) =>
          `It will take this many minutes to read based on the average reading speed.`,
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          value: 'draft',
          label: 'Draft',
        },
        {
          value: 'published',
          label: 'Published',
        },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
        description:
          "Draft posts aren't visible on the website, but you can keep writing them. Set to publish to make it visible.",
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        components: {
          Field: makeSlugField({
            formFieldToSlug: 'title',
          }),
        },
        description: "A unique identifier for this news post's page.",
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        // Update Author on Create
        if (operation === 'create') {
          if (req.user) {
            data.author = req.user.id
            return data
          }
        }
      },
      ({ req, operation, data }) => {
        // If no Author, update it to current.
        if (operation === 'update' && req.user && !data.author) {
          data.author = req.user.id
          return data
        }
      },
      ({ req, operation, data }) => {
        // Change ReadTime
        const text = extractTextFromContent(data.content)

        const readTime = readingTime(text.join(' '), 129).minutes

        data.readTime = readTime

        return data
      },
    ],
  },
}

export default News
