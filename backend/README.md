# Getting started

- Install dependencies

```
cd backend
npm install
```

- Build and run the project

```
npm run dev
```

- Build and run the project

```
npm run build
npm start
```

Navigate to `http://localhost:3000`

- Use this inside lib/auth-client.ts in react/nextjs app

```
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "http://localhost:3000"
})
```

- to use this auth client refer to this page [AuthClient Documentation](https://www.better-auth.com/docs/basic-usage)
