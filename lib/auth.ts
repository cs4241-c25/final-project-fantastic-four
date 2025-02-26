import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";
import { DefaultSession, DefaultUser, NextAuthOptions } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session extends DefaultSession{
    user: {
      role: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    id: string
    name: string
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string
    name: string
    role: string
  }
}

export const authOptions: NextAuthOptions  = {
  providers: [
    credentials({
      name: "Email and Password",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = new MongoClient(process.env.DB_URL!)
        await client.connect()
        const users = await client.db('fantastic-four').collection('users')
    
        const user = await users.findOne({email: credentials!.email})
        client.close()

        if(!user) return null
        if(!user.verified) return null

        const password = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if(!password) return null

<<<<<<< HEAD
          return {id: user.email, name: user.name}
      },
    }),
  ],
  session: {
    strategy: "jwt",
=======
        return {id: user.email, name: user.name, role: user.role}
      },
    }),
  ],
  pages: {
    signIn: '/signin'
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user: user }) {
      if(user) token.role = user.role
      return token
    },
    session({ session, token }) {
      session.user.role = token.role
      return session
    }
>>>>>>> dbccb004b1ebccb6ed1cdc0038166d2eaed37bfc
  }
}