<h1>AC Research Journal Project</h1>

- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [🛠️ Development](#%F0%9F%9B%A0%EF%B8%8F-development)
  - [Frontend](#frontend)
  - [CMS](#cms)
- [🚀 Deployment](#%F0%9F%9A%80-deployment)
- [📌 Resource Links](#%F0%9F%93%8C-resource-links)

---

### Architecture

```
🍃 MongoDB
   |
   |
   |
☁ Server (Dokploy)
  - PayloadCMS
   |  - media/ (stored locally)
   |
   |
  - Frontend
```

### Prerequisites

- Bun - Package manager and runtime.
- Docker - To spin up mongodb quickly.

### 🛠️ Development

#### Frontend

```sh
cd packages/frontend
bun install
cp .env.example .env # There is documentation on where to get each variable.
bun dev
```

#### CMS

```sh
cd packages/cms
bun install
cp .env.example .env # There is documentation on where to get each variable.
docker compose up # If you want to use the local db
bun dev
```

- More Commands

  ```sh
  bun run generate:graphql # generates schema.graphql
  bun run db:clone # Clones the prod db to local machine. So you can play around with migrations without affecting prod.
  bun run media:clone # Not here yet. Clones the prod media to local machine. Might be a long process, not recommended. But if you want the pictures, etc.
  ```

- Access PayloadCMS Admin on `http://localhost:8080:/admin`. Email and Password (get it from the owners of the site).

### 🚀 Deployment

Currently deployed using Dokploy on a VPS container.

**Here's how to deploy from scratch.**

1. Get a VPS like $7 from Hetzner or anywhere that's good.
2. Run the installation command from: https://dokploy.com/
3. Open the Dokploy Web UI from the URL given after installation.
   `http://<your-vps-ip>:3000` usually here.
4. You will create an account there the first time.
5. After creating an account, first, connect **Git Provider** (GitHub).

- Go to Settings > **Git** and press **GitHub** > **Create GitHub App** > ✅ Organization > Write the "AssumptionIloilo"
  organization name. > Create.
- Press the "⬇️" icon to "Install" the Dokploy App in that organization.

6. Create the Project.

- Go to **Projects** > **[Create a Project]** > **Go to that Project**

7. Create two services: (1) Frontend and (2) CMS.

- **[Create Service]** > **Application** > Call it "Frontend"

  - Connect the Git Repo: Click on **General** > Provider > GitHub > Fill up the form.
    - Branch `main`
    - Build Type `Dockerfile`.
    - Docker File Path: `packages/frontend/Dockerfile`
  - Set Env Variables: Click on **Environment** and paste the variables there.
  - Configure Domain: Click on **Domains** and paste the domain. Path: `/`. Port: `3000`. HTTPS `on` with `Let's Encrypt`.

- **[Create Service]** > **Application** > Call it "CMS"

  - Connect the Git Repo: Same steps.
    - Branch `main`
    - Build Type `Dockerfile`.
    - Docker File Path: `packages/cms/Dockerfile`
  - Set Env Variables: Same steps.
  - Configure Domain: Same steps. Path: `/`. Port: `8080`. HTTPS `on` with `Let's Encrypt`.
  - Make sure to set the Docker Volumes so that local `media/` folder is mounted and works.

8. All deployed 🎉. It will have Push to Deploy, Rolling Deploys.

### 📌 Resource Links

- [Figma](https://www.figma.com/file/XZNiNLWkCDJqoi37oZqSYo/Assumption-Research-Journal?type=design&node-id=0%3A1&mode=design&t=peGx1eUHzUtoyJK0-1)
- [payloadcms docs](https://payloadcms.com/docs/getting-started/what-is-payload)
- [urql docs](https://formidable.com/open-source/urql/docs/)
