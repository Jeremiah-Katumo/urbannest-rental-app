
import { GoogleGenAI, Type } from "@google/genai";
import { House } from "../types";

// Fixed: Using process.env.API_KEY directly for initialization as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  /**
   * Generates a creative and enticing marketing description for a house listing.
   */
  async generateListingDescription(house: Partial<House>) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a professional real estate copywriter. Create a compelling, detailed marketing description for the following property:
        Title: ${house.title}
        Price: $${house.price}/month
        Type: ${house.type}
        Location: ${house.location}
        Beds/Baths: ${house.bedrooms}/${house.bathrooms}
        Amenities: ${house.amenities?.join(', ')}
        
        The description should be engaging, highlight the best features, and target the right demographic.`,
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Unable to generate description at this time.";
    }
  },

  /**
   * AI-powered search assistant to help customers find homes based on natural language.
   */
  async findMatchingHomes(query: string, availableHouses: House[]) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a real estate expert assistant. A customer is looking for a home with this request: "${query}".
        Based on our database of houses: ${JSON.stringify(availableHouses)},
        Return a JSON array of the IDs of the houses that best match this request, ordered by relevance.
        Only return the JSON array of strings.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      });
      return JSON.parse(response.text || '[]');
    } catch (error) {
      console.error("Gemini Error:", error);
      return [];
    }
  }
};
