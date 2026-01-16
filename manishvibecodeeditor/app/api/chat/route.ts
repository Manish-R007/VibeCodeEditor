import { hi } from "date-fns/locale";
import {type NextRequest,NextResponse } from "next/server";

interface ChatMessage{
    role: "user" | "Assistant";
    content: string;
}

interface chatRequest {
    message: string
    history:ChatMessage[]
}

async function generateAiresponse(messages:ChatMessage[]):Promise<String>{
    const systemPrompt = `
    You are a helpful assistant.You help the developers With:
    1. Debugging code
    2. Solving problems
    3. Explaining concepts
    4. Writing code
    5. Writing documentation
    6. Writing tests
    7. Troubleshooting issues

    Always Provide clear, Practcal answers.use Proper code formattig when showing examples.
    `
    const fullMessages =[
        {role:"system",content:systemPrompt},
        ...messages
    ]

    const prompt = fullMessages.map((m) => `${m.role}: ${m.content}`).join("\n\n")

    try {
        const response = await fetch("http://localhost:11434/api/generate",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                model:"codellama:latest",
                prompt,
                stream:false,
                option:{temperature:0.7,max_tokens:300,top_p:0.1},
            })
        })

        const data = await response.json()

        if(!data.response){
            throw new Error("No response from AI service")
        }

        return data.response.trim()
    } catch (error) {
        console.error(error)
        throw new Error("Error generating AI response")
    }
}

export async function POST(request:NextRequest){
    try {
        const body:chatRequest = await request.json()
        const {message,history} = body

        if(!message || !history){
            return NextResponse.json({error:"Invalid request"},{status:400})
        }

        const validateHistory = Array.isArray(history)?
             history.filter((h) => {
                h && 
                typeof h === "object" &&
                typeof h.role === "string" &&
                typeof h.content === "string" &&
                ["user","assistant"].includes(h.role)
             }):[]

        const recentHistory = validateHistory.slice(-10)

        const messages :ChatMessage[] = [
            ...recentHistory,
            {role:"user",content:message}
        ]

        const airesponse = await generateAiresponse(messages)

        return NextResponse.json({
            response:airesponse,
            status:200,
            timestamp: new Date().toISOString()

        })
    } catch (error) {
        console.error(error)
        NextResponse.json({error:"Internal Server Error"},{status:500})
    }
}