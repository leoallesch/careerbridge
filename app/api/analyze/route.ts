import { NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { interests } from '@/prisma/data/interests';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('resume') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Convert PDF to text
        const buffer = Buffer.from(await file.arrayBuffer());
        const pdfData = await pdfParse(buffer);
        const resumeText: string = pdfData.text;

        // Set up Gemini 2.0 Flash model
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        // Create prompt
        const interestNames = interests.map(interest => interest.name).join(', ');
        const prompt = `
      Analyze this resume text and identify matches with these interests: ${interestNames}.
      Return the results in JSON format as an array of interest IDs (numbers).
      Only include interest IDs that have clear matches in the resume and correspond to the provided interests.
      
      Resume text:
      ${resumeText}
      
      Output format:
      [number, number, ...]
    `;

        // Get response from Gemini
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();

        // Check if response is HTML
        if (responseText.trim().startsWith('<!DOCTYPE') || responseText.includes('<html')) {
            throw new Error('Received HTML instead of JSON from Gemini API');
        }

        // Clean up the response
        let jsonString: string;
        const jsonMatch = responseText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            jsonString = jsonMatch[0];
        } else {
            jsonString = responseText; // Fallback
        }

        // Parse JSON with error handling
        let matchedInterestIds: number[];
        try {
            matchedInterestIds = JSON.parse(jsonString);
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            throw new Error('Invalid JSON response from Gemini');
        }

        // Validate interest IDs against the bounds of the interests array
        const maxInterestId = Math.max(...interests.map(i => i.interestId), 0);
        const minInterestId = Math.min(...interests.map(i => i.interestId), 0);
        const validInterestIds = matchedInterestIds.filter(id => {
            const isValid = id >= minInterestId && id <= maxInterestId && interests.some(i => i.interestId === id);
            if (!isValid) {
                console.warn(`Invalid interest ID detected: ${id}`);
            }
            return isValid;
        });

        return NextResponse.json(validInterestIds); // Return array of numbers directly
    } catch (error) {
        console.error('Error processing resume:', error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Failed to analyze resume',
                details: error instanceof Error ? error.stack : undefined,
            },
            { status: 500 }
        );
    }
}