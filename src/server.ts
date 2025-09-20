import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import {
  getBusinessKnowledgeToolDefinition,
  handleGetBusinessKnowledge
} from './tools/index.js';

export class BusinessKnowledgeServer {
  private server: Server;

  constructor() {
    this.server = new Server(
      {
        name: "simple-business-knowledge-mcp-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  private setupToolHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        getBusinessKnowledgeToolDefinition
      ],
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name } = request.params;

      switch (name) {
        case 'get_business_knowledge':
          return await handleGetBusinessKnowledge();
        
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  getServer(): Server {
    return this.server;
  }
}

/**
 * Factory function to create a standalone server instance
 */
export function createStandaloneServer(): Server {
  const businessKnowledgeServer = new BusinessKnowledgeServer();
  return businessKnowledgeServer.getServer();
}
