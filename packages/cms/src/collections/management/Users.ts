import type { CollectionConfig } from 'payload'

import { makeDescriptionWithHref } from '@/components/descriptions/description-with-href.make'
import isAdmin from '@/utils/access-control/is-admin'
import isAdminOrCurrentUser from '@/utils/access-control/is-admin-or-current-user'

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: true,
  },
  admin: {
    useAsTitle: 'email',
    description: 'Manage admins, moderators, and user roles here.',
    defaultColumns: ['email', 'role', 'name'],
  },
  access: {
    read: () => true,
    create: isAdmin,
    delete: isAdmin,
    update: isAdminOrCurrentUser,
  },
  fields: [
    // Email added by default
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      required: true,
      defaultValue: 'user',
    },
    {
      name: 'avatarImage',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
      },
      admin: {
        components: {
          Description: makeDescriptionWithHref({
            displayedText:
              'Used for author picture in blog posts. Recommended (512x512px). Tip: to optimize size, compress it before uploading with ',
            displayedHref: 'TinyJPG',
          }),
        },
      },
    },
  ],
}

export default Users
