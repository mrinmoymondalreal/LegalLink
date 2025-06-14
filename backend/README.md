# Getting started

put the .env file into the backend folder

- Install dependencies

```
cd backend
npm install
```

- run the project in development

```
npm run dev
```

- Build and run the project

```
npm run build
npm start
```

Navigate to `http://localhost:3000`

for auth i am using better-auth so refer to better-auth docs for frontend

- Use this inside lib/auth-client.ts in react/nextjs app

```js
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});
```

i have modified the some functions of better-auth like this

```js
authClient.signUp.email({
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        image, // User image URL (optional)
        callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
        userType: "client" | "advocate" // Required
    } as any); // use this any to aviod ts error
```

```js
authClient.updateUser({
        name?, // user display name
        image?, // User image URL (optional)
        district?,
        city?,
        location?,
        state?
    } as any); // use this any to aviod ts error
```

- to use this auth client refer to this page [Better-Auth Documentation](https://www.better-auth.com/docs/basic-usage)
