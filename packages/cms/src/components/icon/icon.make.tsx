import type { PayloadComponent } from 'payload'

export function makeLogo() {
  return {
    path: 'src/components/logo/logo',
  } satisfies PayloadComponent
}
