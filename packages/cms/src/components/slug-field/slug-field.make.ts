import { PayloadComponent } from 'payload'
import { SlugFieldProps } from './slug-field'

export function makeSlugField(props: SlugFieldProps) {
  return {
    path: 'src/components/slug-field/slug-field',
    clientProps: {
      formFieldToSlug: props.formFieldToSlug,
    } satisfies SlugFieldProps,
  } satisfies PayloadComponent
}
