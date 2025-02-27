import { makeDescriptionWithHref } from '@/components/descriptions/description-with-href.make'
import { makeEditorialBoardGroupRowLabel } from '@/components/rowlabels/editorial-board-group-rowlabel.make'
import { makeEditorialMembersRowLabel } from '@/components/rowlabels/editorial-board-members-rowlabel.make'
import type { GlobalConfig } from 'payload'

const EditorialBoard: GlobalConfig = {
  slug: 'editorial-board',
  admin: {
    components: {
      elements: {
        Description: makeDescriptionWithHref({
          displayedText: 'Update the editorial board shown on',
          displayedHref: '/about',
          href: '/about',
        }),
      },
    },
    group: '⚙️ Management',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'boardGroups',
      type: 'array',
      admin: {
        description: 'A "board group" single hierarchical group containing members.',
        components: {
          RowLabel: makeEditorialBoardGroupRowLabel(),
        },
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          admin: {
            placeholder: '(e.g. Editors-in-Chief)',
          },
        },
        {
          name: 'members',
          type: 'array',
          admin: {
            components: {
              RowLabel: makeEditorialMembersRowLabel(),
            },
          },
          fields: [
            {
              name: 'profileImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Recommended Size: 100px(w) x 100px(h)',
              },
              filterOptions: {
                mimeType: { contains: 'image' },
              },
            },
            {
              name: 'name',
              required: true,
              type: 'text',
            },
            {
              name: 'subtitle',
              type: 'text',
              required: true,
              admin: {
                placeholder: '(e.g. Member)',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default EditorialBoard
