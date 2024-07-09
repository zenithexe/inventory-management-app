"use server";

import hashPassword from "@/lib/encrypt";
import connectMongo from "@/mongodb/connect";
import { User } from "@/mongodb/schema";
import { userZSchema } from "@/lib/zodSchema";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { signIn } from "@/app/auth";
import { CredentialsSignin } from "next-auth";

export const register = async (userReg) => {
  const { name, username, email, password, isAdmin } = userReg;

  const db = connectMongo();

  const userExist = await User.findOne().or([
    { username: username },
    { email: email },
  ]);

  console.log(userReg);
  if (userExist) {
    return { success: false, error: "User already exists." };
  }

  const hpassword = await hashPassword(password);

  const userObj = {
    name,
    username,
    email,
    password: hpassword,
    isAdmin,
  };

  console.log(userObj);

  const zodV = userZSchema.safeParse(userObj);

  console.log(zodV.error);

  if (!zodV.success)
    return { success: false, error: "Server-side: Data Validation Error" };

  const user = new User(userObj);
  await user.save();

  return { success: true };
};

export const logIn = async (userLogin) => {
  const { username, password } = userLogin;
  

  try {
    
    await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    console.log("Sigin After")

    
  } catch (err) {
        throw new Error("LogIn Failed!!!")
  }
  
  redirect('/inventory')
};
