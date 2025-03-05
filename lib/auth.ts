import bcrypt from "bcryptjs";
import { MongoClient, ObjectId } from "mongodb";
import { DefaultSession, DefaultUser, NextAuthOptions } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session extends DefaultSession{
    user: {
      id: ObjectId
      email: string
      name: string
      role: string
    }
  }

  interface User extends DefaultUser {
    id: ObjectId
    email: string
    name: string
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: ObjectId
    email: string
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

        return {id: user._id, email: user.email, name: user.name, role: user.role}
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    signOut: '/'
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user: user, trigger, session }) {
      if(user) {
        token.role = user.role
        token.id = new ObjectId(user.id)
      }
      if (trigger === "update" && session?.user?.email) {
        token.email = session.user.email
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      session.user.id = token.id
      session.user.email = token.email
      return session
    }
  }
}