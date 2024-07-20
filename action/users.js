"use server";

import hashPassword from "@/lib/encrypt";
import connectMongo from "@/mongodb/connect";
import { User } from "@/mongodb/schema";
import { userZSchema } from "@/lib/zodSchema";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { signIn } from "@/app/auth";
import { CredentialsSignin } from "next-auth";
import { compare } from "bcrypt";

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

export const getUser = async(username) => {
  try{
    const db = await connectMongo();
    const user = await User.findOne({username:username})

    if(!user)
      return JSON.stringify({success:false, error: "User doesn't exists."})
    
    return JSON.stringify({success:true, user: user})

  }catch(err){
    return JSON.stringify({success: false, error:"Internal Server Error."})
  }
}

export const updateUser = async(user) => {
  try{
    const db = connectMongo()

    const result = await User.findOneAndUpdate(
      {username:user.username},
      {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      {new: true}
    )


    if(!result) return {success:false, message:"Error: Can't Update"}

    return JSON.stringify({success:true, user: result})

  } catch(err){
    console.log("Error ::", err);
    return {success:false, message:"Server Error."}
  }
}

export const deleteUser = async(username) => {
  try{
    const db = connectMongo();
    const result = await User.deleteOne({username:username})
    if(!result.acknowledged) return {success:false, message:"There is some Error"}

    return JSON.stringify({success:true, result:result})
  }catch(err){
    console.log("Error ::",err)
    return {success:false, message:"Server Error."}
  }
}

export const changePassword = async(body) => {
  try{
    const db = await connectMongo();

    const user = await User.findOne({username: body.username});
    if(!user) return JSON.stringify({success:false, message:"Server-Error: User doesn't exist."})

    const passwordMatch = await compare(body.presentPassword, user.password);
    if(!passwordMatch) return JSON.stringify({success: false, message:"Incorrect Present-Password."})

    const hpassword = await hashPassword(body.newPassword)
    const result = await User.findOneAndUpdate(
      {username: body.username},
      {password:hpassword},
      {new:true}
    )

    if(!result) return JSON.stringify({success:false, message:"Server Internal Error."})

    return JSON.stringify({success:true, result:result})

  }catch(err){
    console.log("Error", err)
    return JSON.stringify({success:false, message:"Server-Side Error."})
  }
}