import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";
import User from "@models/user";

// using google as the OAuth for the authentication with the help of nextauth
const handler = NextAuth({
  // providers for authentication
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  // mention the callbacks we are gonna use - session and signIn
  callbacks: {
    // find the user with email and set him as the session user id
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },

    // signIn functionality for the user
    async signIn({ profile }) {
      // every nextjs route is serverless route, everytime its called - it spins up server and makes connection to the database
      try {
        await connectToDB();

        // check is the user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
