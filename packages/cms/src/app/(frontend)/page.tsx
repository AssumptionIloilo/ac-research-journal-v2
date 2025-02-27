import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="home">
      <div className="content">
        <picture>
          <source srcSet="/assumption-logo.svg" />
          <Image alt="Payload Logo" height={120} src="/assumption-logo.svg" width={120} />
        </picture>

        {user && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            <h1 style={{ margin: 0 }}>Welcome back</h1>
            <p>{user.email}</p>
          </div>
        )}

        <div className="links" style={{ marginTop: 10 }}>
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
            style={{
              height: 56,
              padding: '13px 20px',
              borderRadius: '5px',
              fontSize: '20px',
            }}
          >
            Go to admin panel
          </a>
          <button
            className="docs"
            style={{
              height: 56,
              padding: '13px 20px',
              borderRadius: '5px',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >
            Create a Backup
          </button>
        </div>
      </div>
    </div>
  )
}
