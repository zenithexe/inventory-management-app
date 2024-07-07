import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({

  pages:{
    signIn:'/login'
  },
  
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const username = credentials.email;
        const password = credentials.password;
        return true;
      },
    }),
  ],
});
