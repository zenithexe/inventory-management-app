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
    category: z.string().regex(/^[0-9a-f]{24}$/).optional(),
    description: z.string(),
    quantity: z.number(),
    price: z.number(),
    
}) 

export const categoryZSchema = z.object({
    categoryId: z.string(),
    name: z.string(),
    itemCount: z.number()
})