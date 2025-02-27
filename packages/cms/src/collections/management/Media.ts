import { makeDescriptionWithTip } from '@/components/descriptions/description-with-tip.make'
import type { CollectionConfig } from 'payload'

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    components: {
      Description: makeDescriptionWithTip({
        text: 'Store assets, images, and files here.',
        tip: "Tip: You can't rename file names, so make sure you properly named them before uploading.",
      }),
    },
    listSearchableFields: ['fileName', 'alt'],
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    // Specify the size name that you'd like to use as admin thumbnail
    adminThumbnail: 'thumbnail',
    // imageSizes: [
    //   {
    //     height: 400,
    //     width: 400,
    //     crop: 'center',
    //     name: 'thumbnail',
    //   },
    //   {
    //     width: 900,
    //     height: 450,
    //     crop: 'center',
    //     name: 'sixteenByNineMedium',
    //   },
    // ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description:
          'Recommended: <Collection_Name> - <Purpose>. e.g. news - journal showcase event.',
      },
    },
  ],
}

export default Media
