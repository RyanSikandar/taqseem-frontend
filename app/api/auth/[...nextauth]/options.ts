import type { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLEID as string,
      clientSecret: process.env.GOOGLESECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials) {
        
        const user = { id: 1, name: "J Smith", email: "test@example.com" };

        if (
          credentials?.email === user.email &&
          credentials?.password === "password"
        ) {
          // Return user object that matches the `User` type
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
          };
        }
        return null; // Return null if user validation fails
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Add user ID to the token when a new user logs in
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the user ID from the token to the session
      if (token && session.user) {
        session.user= token.id as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login", // Redirect here if the user isn't logged in
  },

  session: {
    strategy: "jwt", // Use JSON Web Tokens for session management
  },

  secret: process.env.NEXTAUTH_SECRET, // Ensure you set this in your .env file
};
