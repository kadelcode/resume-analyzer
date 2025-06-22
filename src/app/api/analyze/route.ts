import { NextResponse } from "next/server"; // Next.js utility for handling responses

// LangChain's TogetherAI integration
import { TogetherAI } from "@langchain/community/llms/togetherai";


// Define a POST API route handler
export async function POST(req: Request) {
    // Extract 'resumeText' from the request body
    const { resumeText } = await req.json();

    // Initialize the TogetherAI model with configuration
    const model = new TogetherAI({
        modelName: "mistralai/Mixtral-8x7B-Instruct-v0.1", // Specifies which LLM to use
        apiKey: process.env.TOGETHER_API_KEY!, // API key from environment variables
        temperature: 0.7, // Control randomness (0 = deterministic, 1 = more creative)
    });

    // Create the prompt for the AI model
    const prompt = `You're a resume reviewer. Analyze this resume and give feedback in bullet points:\n\n${resumeText}`;

    // Invoke the model with our prompt and wait for the response
    const output = await model.invoke(prompt);

    // Return the AI's response as JSON
    return NextResponse.json({ result: output });
}