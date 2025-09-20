import { Tool, CallToolResult } from '@modelcontextprotocol/sdk/types.js';

// Tool definition for getting business knowledge
export const getBusinessKnowledgeToolDefinition: Tool = {
  name: "get_business_knowledge",
  description: "Retrieve business knowledge and information",
  inputSchema: {
    type: "object",
    properties: {},
    additionalProperties: false
  }
};

// Handler function for the business knowledge tool
export async function handleGetBusinessKnowledge(): Promise<CallToolResult> {
  try {
    const businessKnowledge = "I am photographer and work from 9-5 on weekends.";

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
