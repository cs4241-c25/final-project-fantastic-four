import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";
import { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";

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

        const password = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        console.log(user.password, credentials!.password)

        if(!password) return null

          return {id: user.email, name: user.name}
      },
    }),
  ],
  session: {
    strategy: "jwt",
  }
}