import hashPassword from "@/lib/encrypt";
import connectMongo from "@/mongodb/connect";
import { User } from "@/mongodb/schema";
import { compare } from "bcrypt";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },

    async jwt({ token, user, trigger, session }) {

      if(trigger === 'update'){
        return {...token, ...session.user};
      }

      if (user) {
        token.username = user.username;
        token.isAdmin = user.isAdmin;
      }

      return token;
    },

    async session({ session, token }) {
      if (token && session) {
        session.user.id = token.sub;
        session.user.username = token.username;
        session.user.isAdmin = token.isAdmin;
      }

      return session;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const username = credentials.username;
        const password = credentials.password;
        try {
          const db = await connectMongo();
          const user = await User.findOne({ username: username });
          if (!user) throw new CredentialsSignin("User doesn't exists.");

          const passwordMatch = await compare(password, user.password);
          if (!passwordMatch) throw new CredentialsSignin("Wrong Credentials");

          const userData = {
            name: user.name,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
          };

          return userData;
        } catch (err) {
          console.log(err.message);
        }
      },
    }),
  ],
});
