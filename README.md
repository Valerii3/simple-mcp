# Simple Business Knowledge MCP Server

A minimal Model Context Protocol (MCP) server that provides access to business knowledge stored in environment variables.

## Features

- Single tool: `get_business_knowledge` - retrieves business knowledge from environment variables
- Simple configuration via `.env` file
- Lightweight and focused on business knowledge retrieval

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `env.example`:
   ```bash
   cp env.example .env
   ```

3. Edit the `.env` file and add your business knowledge:
   ```
   Business_knowledge=Your comprehensive business knowledge goes here...
   ```

4. Build the project:
   ```bash
   npm run build
   ```

## Usage

### As MCP Server

Run the server with stdio transport for MCP communication:
```bash
npm run start:stdio
```

### Development

For development with auto-rebuild:
```bash
npm run dev:stdio
```

## Configuration

The server reads business knowledge from the `Business_knowledge` environment variable. This can contain any text-based business information such as:

- Company policies and procedures
- Product information and specifications
- Customer service guidelines
- Technical documentation
- Business processes and workflows

## Tool Reference

### get_business_knowledge

**Description**: Retrieve comprehensive business knowledge and information from the configured environment

**Parameters**: None

**Returns**: The business knowledge text from the `Business_knowledge` environment variable

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

- If the `Business_knowledge` environment variable is not set, the tool returns an error message
- Any other errors during retrieval are caught and returned as error responses
