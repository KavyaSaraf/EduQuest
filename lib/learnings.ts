import { LearningPath } from "@/app/types/learning-path";
import { CareerRoadmap } from "@/types/learning-path";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDFH7x274InAdFpjJXfxk9b0d82XdGlngo");

export async function generateRoadmap(career: string): Promise<CareerRoadmap> {
  console.log('Generating roadmap for career:', career);
//   console.log('API Key:', process.env.NEXT_PUBLIC_GEMINI_API_KEY);

//   if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
//     console.error('Gemini API key is not set');
//     throw new Error('Gemini API key is not set');
//   }

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Generate a detailed career roadmap for ${career}. Provide a tree-like structure with multiple branching paths and options. For each step, include a title, description, and potential sub-steps or alternative paths. Format the response as a JSON object with the following structure:
  {
    "career": "${career}",
    "steps": [
      {
        "id": "unique_id",
        "title": "Step Title",
        "description": "Step description",
        "children": [
          {
            "id": "child_unique_id",
            "title": "Sub-step Title",
            "description": "Sub-step description",
            "children": []
          },
          ...
        ]
      },
      ...
    ]
  }
  Ensure the structure is at least 3 levels deep with multiple branches. Do not include any markdown formatting or additional text outside of the JSON structure.`;

  console.log('Sending prompt to Gemini API:', prompt);

  try {
    const result = await model.generateContent(prompt);
    console.log('Received result from Gemini API');
    const response = await result.response;
    let text = response.text();
    console.log('Gemini API response:', text);

    // Remove any markdown formatting if present
    text = text.replace(/```json\n?|\n?```/g, '').trim();

    try {
      const roadmap: CareerRoadmap = JSON.parse(text);
      console.log('Successfully parsed roadmap:', roadmap);
      return roadmap;
    } catch (error) {
      console.error('Error parsing Gemini API response:', error);
      throw new Error('Failed to parse roadmap data');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to generate roadmap');
  }
}

export async function generateLearningPath(subject: string): Promise<LearningPath> {
  console.log('Generating learning path for subject:', subject);

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Generate a detailed learning path for ${subject}. Provide a tree-like structure with multiple branching paths and options. For each step, include a title, description, and potential sub-topics or alternative learning paths. Format the response as a JSON object with the following structure:
  {
    "subject": "${subject}",
    "steps": [
      {
        "id": "unique_id",
        "title": "Topic Title",
        "description": "Topic description",
        "children": [
          {
            "id": "child_unique_id",
            "title": "Sub-topic Title",
            "description": "Sub-topic description",
            "children": []
          },
          ...
        ]
      },
      ...
    ]
  }
  Ensure the structure is at least 3 levels deep with multiple branches. Do not include any markdown formatting or additional text outside of the JSON structure.`;

  console.log('Sending prompt to Gemini API:', prompt);

  try {
    const result = await model.generateContent(prompt);
    console.log('Received result from Gemini API');
    const response = await result.response;
    let text = response.text();
    console.log('Gemini API response:', text);

    // Remove any markdown formatting if present
    text = text.replace(/```json\n?|\n?```/g, '').trim();

    try {
      const learningPath: LearningPath = JSON.parse(text);
      console.log('Successfully parsed learning path:', learningPath);
      return learningPath;
    } catch (error) {
      console.error('Error parsing Gemini API response:', error);
      throw new Error('Failed to parse learning path data');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to generate learning path');
  }
}