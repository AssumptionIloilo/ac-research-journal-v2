import type { PayloadComponent } from 'payload'

export function makeAvatar() {
  return {
    path: 'src/components/avatar/avatar',
  } satisfies PayloadComponent
}
