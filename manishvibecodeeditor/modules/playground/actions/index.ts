'use server'

import db from "@/lib/db"
import type { TemplateFolder } from "../lib/path-to-json";
import { getCurrentUser } from "@/modules/auth/action";

export const getPlaygroundById = async (id: string) => {
    try {
        const playground = await db.playground.findUnique({
            where: {id},
            select:{
                title: true,
            }
        })
        return playground
    } catch (error) {
        console.log('Error in fetching the playground data',error); 
    }
}

export const SaveUpdatedCode = async (PlaygroundId: string, data: TemplateFolder) => {
    const user = getCurrentUser()
    if(!user) {
        throw new Error('Unauthorized')
    }

    try {
        const updatedPlayground = await db.templateFile.upsert({
            where:{
                PlaygroundId
            },
            update: {
                content: JSON.stringify(data)
            },
            create: {
                PlaygroundId,
                content: JSON.stringify(data)
            }
        })

        return updatedPlayground
    } catch (error) {
        console.log('Error in saving the playground data',error);
    }
}