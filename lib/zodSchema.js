import { z } from "zod";

export const userZSchema = z.object({
    name: z.string(),
    username: z.string(),
    email: z.string(),
    password: z.string(),
    isAdmin: z.boolean()
})

export const itemZSchema = z.object({
    itemId: z.string(),
    name: z.string(),
    description: z.string(),
    quantity: z.number(),
    price: z.number(),
    category: z.array(z.string().regex(/a-fA-F0-9]{24}$/)).or(z.nullable())
}) 

export const itemTypeZSchema = z.object({
    name: z.string(),
    itemCount: z.number()
})