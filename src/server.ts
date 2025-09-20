import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    InitializedNotificationSchema,
} from "@modelcontextprotocol/sdk/types.js";
import {
    getBusinessKnowledgeToolDefinition,
    handleGetBusinessKnowledge,
} from './tools/index.js';

export function createStandaloneServer(): Server {
    const serverInstance = new Server(
        {
            name: "org/business-knowledge",
            version: "0.2.0",
        },
        {
            capabilities: {
                tools: {},
            },
        }
    );

    serverInstance.setNotificationHandler(InitializedNotificationSchema, async () => {
        console.log('Business Knowledge MCP client initialized');
    });

    serverInstance.setRequestHandler(ListToolsRequestSchema, async () => ({
        tools: [getBusinessKnowledgeToolDefinition],
    }));

    serverInstance.setRequestHandler(CallToolRequestSchema, async (request) => {
        const { name, arguments: args } = request.params;
        
        switch (name) {
            case "get_business_knowledge":
                return await handleGetBusinessKnowledge();
            default:
                return {
                    content: [{ type: "text", text: `Unknown tool: ${name}` }],
                    isError: true,
                };
        }
    });

    return serverInstance;
}

export class BusinessKnowledgeServer {
    getServer(): Server {
        return createStandaloneServer();
    }
}
