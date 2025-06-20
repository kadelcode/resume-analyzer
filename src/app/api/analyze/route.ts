import { NextResponse } from "next/server";
import { TogetherAI } from "@langchain/community/llms/togetherai";


export async function POST(req: Request) {
    const { resumeText } = await req.json();

    const model = new TogetherAI({
        modelName: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        apiKey: process.env.TOGETHER_API_KEY!,
        temperature: 0.7,
    });

    const prompt = `You're a resume reviewer. Analyze this resume and give feedback in bullet points:\n\n${resumeText}`;

    const output = await model.invoke(prompt);

    return NextResponse.json({ result: output });
}