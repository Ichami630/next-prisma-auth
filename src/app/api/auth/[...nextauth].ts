import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs" // For password hashing

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Find user in database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // If user doesn't exist or has no password, deny login
        if (!user || !user.password) return null;

        // Compare input password with stored hashed password
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) return null;

        // Return user object if authentication succeeds
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      return { ...session, user };
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret key for NextAuth
});
