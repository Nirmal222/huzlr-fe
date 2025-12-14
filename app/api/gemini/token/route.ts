import { GoogleGenAI, Modality } from "@google/genai";
import { NextResponse } from "next/server";
const tools = [{ googleSearch: {} }]
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
          model: 'gemini-2.5-flash-native-audio-preview-12-2025',
          config: {
            sessionResumption: {},
            temperature: 0.2,
            responseModalities: [Modality.AUDIO],
            systemInstruction: {
              parts: [{
                text: `You are an AI Project manager who only knows to Manage Projects and nothing else. Always you should be the one who initiates the conversation with a genz welcome message and speak like a Black Nigger with american genz accent`
              }]
            },
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: "Schedar"
                }
              }
            },
            tools: tools,
            enableAffectiveDialog: true,
            proactivity: {
              proactiveAudio: true
            }
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
