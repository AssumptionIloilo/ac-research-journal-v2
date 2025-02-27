import { PayloadComponent } from 'payload'
import type { DescriptionWithHrefProps } from './description-with-href'

export function makeDescriptionWithHref(props: DescriptionWithHrefProps) {
  return {
    path: 'src/components/descriptions/description-with-href',
    clientProps: props,
  } satisfies PayloadComponent
}
