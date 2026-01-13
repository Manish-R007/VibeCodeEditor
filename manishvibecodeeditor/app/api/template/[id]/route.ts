import db from "@/lib/db";
import {readTemplateStructureFromJson, saveTemplateStructureToJson} from "@/modules/playground/lib/path-to-json";
import {templatePaths} from "@/lib/template"
import type {NextRequest, NextResponse} from "next/server";

import path from "path";
import fs from 'fs/promises'

function validateJSONStructure(data: any): boolean {
    try {
        JSON.parse(JSON.stringify(data));
        return true;
    } catch (error) {
        return false;
    }
}

export async function GET(request:NextRequest , {params}:{params:Promise<{id:string}>}) {
    const {id} =  await params
    if(!id) {
        return Response.json({error: 'Template ID is required'}, {status: 400});
    }

    const playground = await db.playground.findUnique({
        where:{id}
    })

    if(!playground) {
        return Response.json({error: 'Playground not found'}, {status: 404});
    }

    const templateKey = playground.templates as keyof typeof templatePaths;
    const templatePath = templatePaths[templateKey]
    if(!templatePath) {
        return Response.json({error: 'Template path not found'}, {status: 404});
    }

    try {
        const inputPath = path.join(process.cwd(), templatePath);
        const outputFile = path.join(process.cwd(),`output/${templateKey}.json`)

        await saveTemplateStructureToJson(inputPath, outputFile);

        const result = await readTemplateStructureFromJson(outputFile)

        if(!validateJSONStructure(result.items)) {
            return Response.json({error: 'Invalid template structure'}, {status: 500});
        }

        await fs.unlink(outputFile)

        return Response.json({success:true, templateJson: result}, {status: 200});
    } catch (error) {
        console.error("Error processing template:", error);
        return Response.json({error: 'Failed to process template'}, {status: 500});
    }


}