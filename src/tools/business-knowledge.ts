import { Tool, CallToolResult } from '@modelcontextprotocol/sdk/types.js';

// Tool definition for getting business knowledge
export const getBusinessKnowledgeToolDefinition: Tool = {
  name: "get_business_knowledge",
  description: "Retrieve configurable business knowledge and information from environment variables",
  inputSchema: {
    type: "object",
    properties: {},
    additionalProperties: false
  }
};

// Handler function for the business knowledge tool
export async function handleGetBusinessKnowledge(): Promise<CallToolResult> {
  try {
    const businessKnowledge = process.env.BUSINESS_KNOWLEDGE;
    
    if (!businessKnowledge) {
      return {
        content: [
          {
            type: "text",
            text: "Error: BUSINESS_KNOWLEDGE environment variable is not set. Please configure it in your deployment environment."
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
