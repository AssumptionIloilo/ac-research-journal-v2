import type { CollectionConfig } from 'payload'

import { makeDescriptionWithHref } from '@/components/descriptions/description-with-href.make'
import { makeSlugField } from '@/components/slug-field/slug-field.make'
import formatSlug from '@/utils/format-slug'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const Archives: CollectionConfig = {
  slug: 'archives',
  admin: {
    defaultColumns: ['title'],
    useAsTitle: 'title',
    components: {
      // Description: {
      //   path: 'src/components/descriptions/makeDescriptionWithHref.tsx#DescriptionWithHref',
      //   clientProps: {
      //   } satisfies DescriptionWithHrefProps,
      // },
      Description: makeDescriptionWithHref({
        displayedText: 'Archived items found in',
        displayedHref: '/archive',
        href: '/archive,',
      }),
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'archiveCover',
      label: 'Archive Cover (Image)',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Recommended Size: 720px(w) x 1080px(h)',
      },
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Title of this archive.',
      },
    },
    {
      name: 'about',
      type: 'richText',
      admin: {
        description: 'A longer description about what this archived item is about.',
      },
      // editor: lexicalEditor({
      //   features: ({ defaultFeatures }) => [...defaultFeatures],
      // }),
    },
    {
      name: 'publishedDate',
      type: 'date',
    },
    {
      name: 'pdf',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'application/pdf' },
      },
      label: 'Archived PDF',
      admin: {
        description: 'The downloadable PDF File that can also be a flipbook on the website.',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'archive-categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
        components: {
          Field: makeSlugField({
            formFieldToSlug: 'title',
          }),
        },
        description: "A unique identifier for this archive item's page.",
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
  ],
}

export default Archives
