#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
const cmd = args[0];

if (cmd === 'version' || cmd === '--version' || cmd === '-v') {
  console.log('GROK CLI v0.1.0');
  process.exit(0);
}

if (cmd === 'help' || cmd === '--help' || cmd === '-h') {
  console.log(`
  GROK CLI — AI Agent Terminal + Token Launcher

  Usage:
    grok serve [--port 8080] [--api-key xai-...]
    grok version

  Environment:
    GROK_API_KEY     Grok API key from x.ai
    GROK_MODEL       Model (default: grok-3-fast)
    WALLET_SECRET    Solana wallet (for launcher)
    PINATA_JWT       Pinata JWT (for launcher)

  Links:
    Website: https://grokcli.bot
    GitHub:  https://github.com/grok-cli
    X:       https://x.com/GrokAdams
  `);
  process.exit(0);
}

// Default: start server
const port = args.includes('--port') ? args[args.indexOf('--port') + 1] : process.env.PORT || 8080;
const apiKey = args.includes('--api-key') ? args[args.indexOf('--api-key') + 1] : '';

if (apiKey) process.env.GROK_API_KEY = apiKey;
process.env.PORT = port;

require(path.join(__dirname, '..', 'server.js'));

// Try to open browser
setTimeout(() => {
  try {
    const url = `http://localhost:${port}`;
    const platform = process.platform;
    if (platform === 'darwin') execSync(`open ${url}`);
    else if (platform === 'win32') execSync(`start ${url}`);
    else execSync(`xdg-open ${url} 2>/dev/null || true`);
  } catch {}
}, 1500);
