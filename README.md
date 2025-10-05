## BrickByBrick MCP Server

MCP server for the BrickByBrick workout app.

### Prerequisites
Node 20 or higher

### Installation

- Install from NPM globally
```sh
npm i -g brickbybrick-mcp
```

- Modify your `claude_desktop_config.json` and provide your API key in the env section.

```json
{
    "mcpServers": {
        "brickbybrick": {
            "command": "npx",
            "args": [
                "brickbybrick-mcp"
            ],
            "env": {
                "BRICKBYBRICK_API_KEY": "insert API key here"
            }
        }
    }
}
```

- Restart Claude Desktop.

### Features
- Create workouts
- Preview the next workout
- Analyze your workout history