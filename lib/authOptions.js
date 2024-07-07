import connectMongo from "@/mongodb/connect";
import { User } from "@/mongodb/schema";
import CredentialsProvider from "next-auth/providers/credentials"
import {z} from 'zod';
import bcrypt from 'bcrypt'

export const authOptions = {
    pages:{
        signIn: '/login',

    },

    session:{
        strategy: 'jwt',
    },



    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email:{},
                password:{}
            },
            async authorize(credentials, req){

                //Input Validation - Credentials
                const parsedCredentials = z.object({
                    username: z.string(),
                    password: z.string()
                }).safeParse(credentials);

                if(!parsedCredentials.success) return null

                //Checking if the User Exists in our Database
                const db = connectMongo()
                const user = await User.findOne({username: credentials.username})
                if(!user) return null

                //Password Matching
                const passMatched = await bcrypt.compare(credentials.password, user.hpassword);
        
                if(passMatched) return user;
                return null;
            }
        })        
    ],
}