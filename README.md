# Business Knowledge MCP Server

A production-ready Model Context Protocol (MCP) server that provides configurable business knowledge via environment variables. Built following Dedalus platform guidelines with both HTTP and STDIO transport support.

## Features

- **Configurable Business Knowledge**: Set your business information via `BUSINESS_KNOWLEDGE` environment variable
- **Dual Transport Support**: HTTP (production) and STDIO (development) transports
- **Production Ready**: Health checks, session management, error handling
- **Dedalus Compatible**: Follows all Dedalus platform architecture guidelines

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

## Usage

### HTTP Transport (Production)

Start the server with HTTP transport:
```bash
npm start                    # Default port 8080
npm start -- --port 3000    # Custom port
```

The server will be available at:
- MCP endpoint: `http://localhost:8080/mcp`
- Health check: `http://localhost:8080/health`
- SSE endpoint: `http://localhost:8080/sse` (backward compatibility)

### STDIO Transport (Development)

For local development with MCP clients:
```bash
npm run start:stdio
```

### Development with Auto-rebuild

```bash
npm run dev        # HTTP transport
npm run dev:stdio  # STDIO transport
```

## Configuration

### Environment Variables

Set your business knowledge using the `BUSINESS_KNOWLEDGE` environment variable:

```bash
export BUSINESS_KNOWLEDGE="Your comprehensive business information here..."
```

**Example for Dedalus deployment:**
```bash
BUSINESS_KNOWLEDGE="I am a professional photographer based in London, UK. Here are my key business details:

📸 **Services Offered:**
- Portrait photography (individual & family)
- Event photography (weddings, corporate events, parties)
- Commercial photography (product shots, headshots, lifestyle)
- Real estate photography
- Street photography workshops

🕒 **Working Hours:**
- Weekends: 9:00 AM - 5:00 PM (Saturday & Sunday)
- Weekdays: Available for consultations and post-processing
- Emergency shoots: Available with 24-hour notice

📍 **London Coverage Areas:**
- Central London (Westminster, City of London, Camden)
- North London (Islington, Hackney, Haringey)
- South London (Southwark, Lambeth, Wandsworth)
- East London (Tower Hamlets, Newham, Waltham Forest)
- West London (Kensington & Chelsea, Hammersmith & Fulham)

💰 **Pricing Structure:**
- Portrait sessions: £150-300 (1-2 hours)
- Event photography: £400-800 (4-8 hours)
- Commercial shoots: £200-500 per day
- Travel within London: Included
- Travel outside London: £0.50 per mile

📱 **Contact & Booking:**
- Email: hello@londonphotographer.co.uk
- Phone: +44 20 7123 4567
- Website: www.londonphotographer.co.uk
- Instagram: @london_photographer_pro

🎯 **Specializations:**
- Natural light photography
- Studio photography (access to professional studios in Shoreditch)
- Post-processing and retouching
- Photo editing and color grading
- Digital delivery within 48-72 hours

I pride myself on capturing authentic moments and providing a professional, friendly service to clients across London."
```

### Additional Environment Variables

- `PORT`: HTTP server port (default: 8080)
- `NODE_ENV`: Set to 'production' for production mode

## Client Configuration

For MCP clients, use this configuration:

```json
{
  "mcpServers": {
    "business-knowledge": {
      "url": "http://localhost:8080/mcp"
    }
  }
}
```

## Tool Reference

### get_business_knowledge

**Description**: Retrieve configurable business knowledge and information from environment variables

**Parameters**: None

**Returns**: The business knowledge text from the `BUSINESS_KNOWLEDGE` environment variable

**Example Response**:
```json
{
  "content": [
    {
      "type": "text",
      "text": "Your business knowledge content here..."
    }
  ]
}
```

## Error Handling

- If the `BUSINESS_KNOWLEDGE` environment variable is not set, the tool returns a clear error message
- Any other errors during retrieval are caught and returned as error responses
- Health check endpoint provides server status monitoring

## Architecture

This server follows the Dedalus platform architecture guidelines:

- **Modular Structure**: Clear separation of concerns with dedicated modules
- **Streamable HTTP First**: Modern HTTP transport as the primary interface
- **Type Safety**: Full TypeScript coverage with proper interfaces
- **Production Ready**: Built-in error handling, logging, and configuration management
- **Session Management**: Proper session handling with cleanup
- **Health Monitoring**: Built-in health check endpoint
