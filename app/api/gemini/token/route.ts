import { GoogleGenAI, Modality } from "@google/genai";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set in environment variables" },
        { status: 500 }
      );
    }

    const client = new GoogleGenAI({ apiKey });
    const expireTime = new Date(Date.now() + 30 * 60 * 1000).toISOString();
    
    // Create an ephemeral token
    // The token expires in 30 minutes by default
    const token = await client.authTokens.create({
      config: {
        uses: 1, // The default
        expireTime: expireTime,
        liveConnectConstraints: {
            model: 'gemini-2.5-flash-native-audio-preview-09-2025',
            config: {
                sessionResumption: {},
                temperature: 0.7,
                responseModalities: [Modality.AUDIO]
            }
        },
        httpOptions: {
            apiVersion: 'v1alpha'
        }
      },
    });

    return NextResponse.json({ token: token.name });
  } catch (error: any) {
    console.error("Error creating ephemeral token:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create token" },
      { status: 500 }
    );
  }
}
