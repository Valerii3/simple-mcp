import { createServer } from 'http';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { randomUUID } from 'crypto';
import { createStandaloneServer } from '../server.js';
const sessions = new Map();
export function startHttpTransport(config) {
    const httpServer = createServer();
    httpServer.on('request', async (req, res) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        switch (url.pathname) {
            case '/mcp':
                await handleMcpRequest(req, res, config);
                break;
            case '/sse':
                await handleSSERequest(req, res, config);
                break;
            case '/health':
                handleHealthCheck(res);
                break;
            default:
                handleNotFound(res);
        }
    });
    const host = config.isProduction ? '0.0.0.0' : 'localhost';
    httpServer.listen(config.port, host, () => {
        logServerStart(config);
    });
}
async function handleMcpRequest(req, res, config) {
    const sessionId = req.headers['mcp-session-id'];
    if (sessionId) {
        const session = sessions.get(sessionId);
        if (!session) {
            res.statusCode = 404;
            res.end('Session not found');
            return;
        }
        return await session.transport.handleRequest(req, res);
    }
    if (req.method === 'POST') {
        await createNewSession(req, res, config);
        return;
    }
    res.statusCode = 400;
    res.end('Invalid request');
}
async function handleSSERequest(req, res, config) {
    const serverInstance = createStandaloneServer();
    const transport = new SSEServerTransport('/sse', res);
    try {
        await serverInstance.connect(transport);
        console.log('SSE connection established');
    }
    catch (error) {
        console.error('SSE connection error:', error);
        res.statusCode = 500;
        res.end('SSE connection failed');
    }
}
async function createNewSession(req, res, config) {
    const serverInstance = createStandaloneServer();
    const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        onsessioninitialized: (sessionId) => {
            sessions.set(sessionId, { transport, server: serverInstance });
            console.log('New Business Knowledge session created:', sessionId);
        }
    });
    transport.onclose = () => {
        if (transport.sessionId) {
            sessions.delete(transport.sessionId);
            console.log('Business Knowledge session closed:', transport.sessionId);
        }
    };
    try {
        await serverInstance.connect(transport);
        await transport.handleRequest(req, res);
    }
    catch (error) {
        console.error('Streamable HTTP connection error:', error);
        res.statusCode = 500;
        res.end('Internal server error');
    }
}
function handleHealthCheck(res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'business-knowledge-mcp',
        version: '0.2.0'
    }));
}
function handleNotFound(res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
}
function logServerStart(config) {
    const displayUrl = config.isProduction
        ? `Port ${config.port}`
        : `http://localhost:${config.port}`;
    console.log(`Business Knowledge MCP Server listening on ${displayUrl}`);
    if (!config.isProduction) {
        console.log('Put this in your client config:');
        console.log(JSON.stringify({
            "mcpServers": {
                "business-knowledge": {
                    "url": `http://localhost:${config.port}/mcp`
                }
            }
        }, null, 2));
        console.log('For backward compatibility, you can also use the /sse endpoint.');
    }
}
//# sourceMappingURL=http.js.map