// auth.d.ts
declare module '#auth-utils' {
  interface User {
    username: string
    role: string
    token: string
  }

  interface UserSession {
    loggedInAt: Date
  }
}

export {}