import { GoogleGenAI } from "@google/genai";
import Content from '../models/content.js'

const API_KEY = "AIzaSyDCS_LxNpgFo7JVfcVSCRjOEXqlhnWIl8k";
const ai = new GoogleGenAI({apiKey: API_KEY});

async function search(searchText,username) {
    const data = await Content.find({user: username})
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `SYSTEM PROMPT:
        You are an intelligent retrieval model designed to find URLs most relevant to a user's search intent.

        You will receive:
        - A user identifier
        - A search text (the query)
        - A list of documents (each with title, url, summary, tags, and emotion fields)

        Your task:
        Find which URLs best match the user's search text using semantic understanding of the query
        and the text fields (title, summary, tags, emotion). Consider the overall meaning, not just keywords.

        ---

        INPUT FORMAT (JSON):
        {
            "user": "<username>",
            "search_text": "<text entered by the user>",
            "documents": [
                {
                    "user": "<username>",
                    "title": "<string>",
                    "url": "<string>",
                    "summary": "<string>",
                    "tags": ["<string>", ...],
                    "emotion": ["<string>", ...]
                },
                ...
            ]
        }

        ---

        OUTPUT FORMAT (JSON):
        {
            "user": "<username>",
            "search_text": "<original search text>",
            "related_urls": [
                "<url_1>",
                "<url_2>",
                "<url_3>",
                "<url_4>",
                "<url_5>"
            ]
        }

        ---

        INSTRUCTIONS:
        1. Analyze all document fields (title, summary, tags, emotion) to determine semantic similarity.
        2. Rank them by relevance to the search text.
        3. Return only the top 5 most relevant URLs.
        4. Output must strictly follow the JSON format above.
        5. If no relevant matches are found, return an empty "related_urls" array. 
        INPUT:
        {
            documents: ${data},
            searchText: ${searchText}
        }
    `,
  });
  return response.text;
}

export default search;