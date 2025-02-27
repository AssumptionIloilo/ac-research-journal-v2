import type { EntityDescriptionComponent } from 'payload'
import type { DescriptionWithTipProps } from './description-with-tip'

export function makeDescriptionWithTip(props: DescriptionWithTipProps): EntityDescriptionComponent {
  return {
    path: 'src/components/descriptions/description-with-tip',
    clientProps: props,
  }
}
