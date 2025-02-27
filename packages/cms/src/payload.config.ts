// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import collections from './collections'
import EditorialBoard from './collections/management/EditorialBoard'
import Users from './collections/management/Users'
import { makeAvatar } from './components/avatar/avatar.make'
import { makeLogo } from './components/icon/icon.make'
import { makeIcon } from './components/logo/logo.make'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: makeLogo(),
        Icon: makeIcon(),
      },
    },
    avatar: {
      Component: makeAvatar(),
    },
    meta: {
      titleSuffix: ' - AC Publications Admin',
      icons: [
        {
          url: '/assumption-logo.svg',
          rel: 'icon',
        },
      ],
    },
  },
  collections: collections,
  globals: [EditorialBoard],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
