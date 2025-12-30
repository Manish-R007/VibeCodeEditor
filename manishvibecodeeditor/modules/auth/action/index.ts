"use server"

import db from "@/lib/db"
import { auth } from "../../../auth"

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: { id },
            include: {
                accounts: true,
            },
        })

        return user
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getAccountByUserId = async (userId: String) => {
    try {
        const account = await db.account.findFirst({
            where: {
                userId: String(userId),
            },
        })

        return account
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getCurrentUser = async () => {
    const session = await auth()
    return session?.user ?? null
}