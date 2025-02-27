'use client'

import { slugify } from '@/utils/slugify'
import { useField, useFormFields } from '@payloadcms/ui'
import './slug-field.scss'

/** Not sure why this type is not available, so I just manually make it here. */
type TextFieldComponentProps = {
  field: {
    name: string
    type: 'text'
    unique: boolean
    index: boolean
    admin: {
      position: string
      description: string
    }
    label: string
  }
  path: string
  permissions: boolean
  readOnly: boolean
  schemaPath: string
}

// ===========================================================================
// Base Component (With custom props, because Payload passes limited amount of props).
// ===========================================================================
export type SlugFieldProps = {
  /** Name of the field in this collection to be slugged. */
  formFieldToSlug: string
}

const SlugField = (props: TextFieldComponentProps & SlugFieldProps) => {
  const { value, setValue } = useField<string>({ path: props.path })
  const fieldToSlug = useFormFields((context) => {
    const [fields, _dispatch] = context
    return fields[props.formFieldToSlug]?.value as string
  })

  function autoGenerateSlug(toSlug: string) {
    const slug = slugify(toSlug)
    setValue(slug)
  }

  return (
    <div className="field-type text slug-field">
      <label className="field-label">
        <span>Slug</span>
        <button type="button" onClick={() => autoGenerateSlug(fieldToSlug || '')}>
          Generate
        </button>
      </label>
      <input
        value={value}
        onChange={(e) => {
          console.log({ a: e.target.value, b: e.currentTarget.value })
          setValue(e.currentTarget.value)
        }}
      />
      <br />
      {props?.field?.admin?.description && (
        <span className="field-description">{props?.field?.admin?.description}</span>
      )}

      {/* Recommended Debugging - in case this breaks. */}
      {/* <pre>{JSON.stringify(props, null, 2)}</pre>
      <br />
      <pre>{JSON.stringify(value, null, 2)}</pre>
      <br />
      <pre>{JSON.stringify(fieldToSlug, null, 2)}</pre> */}
    </div>
  )
}

export default SlugField
