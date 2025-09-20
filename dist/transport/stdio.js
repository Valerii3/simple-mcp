import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
export async function runStdioTransport(server) {
    const transport = new StdioServerTransport();
    try {
        await server.connect(transport);
        console.error("Business Knowledge MCP Server running on stdio");
    }
    catch (error) {
        console.error("Failed to start STDIO transport:", error);
        throw error;
    }
}
//# sourceMappingURL=stdio.js.map