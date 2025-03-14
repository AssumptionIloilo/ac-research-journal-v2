import type { CollectionConfig } from 'payload'

import formatSlug from '@/utils/format-slug'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { SlateToLexicalFeature } from '@payloadcms/richtext-lexical/migrate'

const Guidelines: CollectionConfig = {
  slug: 'guidelines',
  admin: {
    defaultColumns: ['title', 'content'],
    useAsTitle: 'title',
    description:
      'This is where you write guidelines for students. It can serve as their wiki page of what to do in research class.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The title for this guide. e.g. "How to do Review of Related Literature',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Write anything about your guide.',
      },
      // editor: lexicalEditor({
      //   features: ({ defaultFeatures }) => [...defaultFeatures,
      //     SlateToLexicalFeature({ disableHooks: true }),
      //   ],
      // }),
    },
    {
      name: 'orderNumber',
      type: 'number',
      defaultValue: 100,
      admin: {
        step: 1,
        position: 'sidebar',
        description:
          'By default, all order numbers are 100. But you can prioritize others to appear first by manually changing this to 1, 2, 3, etc.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        // components: {
        //   Cell: {
        //     path: '/src/components/SlugField/makeSlugField#SlugField',
        //     clientProps: {
        //       fieldNameToSlug: 'title',
        //     },
        //   },
        //   // Field: (fieldProps: any) =>
        //   //   makeSlugField({
        //   //     fieldNameToSlug: 'title',
        //   //     fieldProps,
        //   //   }),
        // },
        description: "A unique identifier for this guideline's page.",
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
  ],
}

export default Guidelines
