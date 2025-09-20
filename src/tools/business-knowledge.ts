import { Tool, CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Tool definition for getting business knowledge
export const getBusinessKnowledgeToolDefinition: Tool = {
  name: "get_business_knowledge",
  description: "Retrieve comprehensive business knowledge and information from the configured environment",
  inputSchema: {
    type: "object",
    properties: {},
    additionalProperties: false
  }
};

// Handler function for the business knowledge tool
export async function handleGetBusinessKnowledge(): Promise<CallToolResult> {
  try {
    const businessKnowledge = process.env.Business_knowledge;
    
    if (!businessKnowledge) {
      return {
        content: [
          {
            type: "text",
            text: "Error: Business_knowledge environment variable is not set. Please configure it in your .env file."
          }
        ],
        isError: true
      };
    }

    return {
      content: [
        {
          type: "text",
          text: businessKnowledge
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error retrieving business knowledge: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      ],
      isError: true
    };
  }
}
