// Temporary script I used to migrate to lexical. Not used anymore after it was migrated but
// can be useful for learning so I saved it here.
//
// This is a 5-step migration:
// 1. Backup the database.
// 2. Make sure all `type: 'richText` fields are using `editor: lexicalEditor(...)`. With the SlateToLexicalFeature. See resources for this.
// 3. Ran the app to check if there are any issues. If there are, manually resolve them, I noticed there were a bunch so I just listed down each id.
// 4. After checking, set SlateToLexicalFeature({ disableHooks: true }) to true. Then run the migration script.
//   - If you don't do this, even when you run the migration, it will succeed (but the migration actually IGNORES any richText without the criteria above).
// 5. After migrating, make sure to check each data again, there were a couple for me. Then clean them so it complies to the schema (this is just trial and error like making sure "content": null, etc).
// 6. But I think after successful migration with the `editor: lexicalEditor(...)` and `SlateToLexicalFeature`, you can finally remove it and no issues should happen.
//
// Resources:
// https://payloadcms.com/docs/local-api/overview#importing-it
// https://payloadcms.com/docs/rich-text/migration#migration-via-migration-script-recommended

import config from '@payload-config'
import { getPayload } from 'payload'

import { migrateSlateToLexical } from '@payloadcms/richtext-lexical/migrate'

async function main() {
  const payload = await getPayload({ config })
  console.log('\x1b[32m%s\x1b[0m', 'Starting to Migrate...')
  await migrateSlateToLexical({ payload })
  console.log('\x1b[32m%s\x1b[0m', '🎉 Finished Migrating to Lexical!')

  process.exit(0)
}

main()
