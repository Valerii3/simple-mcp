// Tool definition for getting business knowledge
export const getBusinessKnowledgeToolDefinition = {
    name: "get_business_knowledge",
    description: "Retrieve business knowledge and information",
    inputSchema: {
        type: "object",
        properties: {},
        additionalProperties: false
    }
};
// Handler function for the business knowledge tool
export async function handleGetBusinessKnowledge() {
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
    }
    catch (error) {
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
//# sourceMappingURL=business-knowledge.js.map