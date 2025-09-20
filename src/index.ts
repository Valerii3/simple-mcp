#!/usr/bin/env node

import { createStandaloneServer } from './server.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';

async function main() {
  const args = process.argv.slice(2);
  const useStdio = args.includes('--stdio');

  const server = createStandaloneServer();

  if (useStdio) {
    // Use stdio transport for MCP communication
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Simple Business Knowledge MCP Server running on stdio');
  } else {
    // For development/testing purposes, you could add HTTP transport here
    console.error('Simple Business Knowledge MCP Server - use --stdio flag for MCP communication');
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
