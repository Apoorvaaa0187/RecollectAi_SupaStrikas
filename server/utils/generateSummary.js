import { GoogleGenAI } from "@google/genai";
const API_KEY = "AIzaSyDCS_LxNpgFo7JVfcVSCRjOEXqlhnWIl8k";
const ai = new GoogleGenAI({apiKey: API_KEY});

async function generate(title,url) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `You are an AI assistant specialized in summarizing online content. Given a title and a URL, generate a concise and clear summary of the content at that URL. Additionally, extract relevant tags and detect the overall emotion(s) conveyed in the content. 

        Return the response strictly in the following JSON format:

        {
        "user": "<the user requesting the summary>",
        "title": "<the title provided>",
        "url": "<the URL provided>",
        "summary": "<a concise summary of the content>",
        "tags": ["<tag1>", "<tag2>", "..."],
        "emotion": ["<emotion1>", "<emotion2>", "..."]
        }

        Notes:
        - Ensure all fields are filled. If you cannot detect tags or emotion, return an empty array [].
        - The summary should be a brief paragraph (3-5 sentences).
        - Tags should be keywords or topics relevant to the content.
        - Emotion should reflect the overall sentiment, e.g., ["happy"], ["angry", "frustrated"], etc.

        Title: "${title}"  
        URL: "${url}"  
    `,
  });
  return response.text;
}

export default generate;