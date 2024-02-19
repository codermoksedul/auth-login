// api/auth/[...nextauth]/route.js
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { username, password } = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ username });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
          return null; // Return null in case of error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      console.log("jwt callback", { token, user, session });

      // pass user information
      if (user) {
        return {
          ...token,
          id: user.id,
          phone_number: user.phone_number,
          username: user.username,
          institute_name: user.institute_name,
          district: user.district,
          course: user.course,
          year: user.year,
          board: user.board,
          facebook_link: user.facebook_link,
          user_logo_url: user.user_logo_url,
          verified: user.verified,
          password: user.password,
        };
      }
      return token;
    },

    async session({ session, token, user }) {
      console.log("session callback", { session, token, user });
      // pass user id and phone number to session
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          phone_number: token.phone_number,
          username: token.username,
          institute_name: token.institute_name,
          district: token.district,
          course: token.course,
          year: token.year,
          board: token.board,
          facebook_link: token.facebook_link,
          user_logo_url: token.user_logo_url,
          verified: token.verified,
          password: token.password,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

