#!/usr/bin/env node

// Quick verification script to check if everything is set up correctly

const fs = require('fs')
const path = require('path')

console.log('🎃 Shadowed Haven - Setup Verification\n')

const checks = []

// Check 1: .env file exists
if (fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8')
  if (envContent.includes('GROQ_API_KEY') && !envContent.includes('your_groq_api_key_here')) {
    checks.push({ name: 'Groq API Key', status: '✅', message: 'Configured (FREE!)' })
  } else {
    checks.push({ name: 'Groq API Key', status: '⚠️', message: 'Not configured (required) - Get free key at https://console.groq.com/keys' })
  }
  
  if (envContent.includes('REPLICATE_API_KEY') && !envContent.includes('your_replicate_key')) {
    checks.push({ name: 'Replicate API Key', status: '✅', message: 'Configured (optional)' })
  } else {
    checks.push({ name: 'Replicate API Key', status: '⚠️', message: 'Not configured (optional)' })
  }
} else {
  checks.push({ name: '.env file', status: '❌', message: 'Missing - copy .env.example to .env' })
}

// Check 2: node_modules exists
if (fs.existsSync('node_modules')) {
  checks.push({ name: 'Dependencies', status: '✅', message: 'Installed' })
} else {
  checks.push({ name: 'Dependencies', status: '❌', message: 'Run: npm install' })
}

// Check 3: Kiro files
if (fs.existsSync('.kiro/hooks/on-puzzle-hint.json')) {
  checks.push({ name: 'Agent Hooks', status: '✅', message: 'Configured' })
} else {
  checks.push({ name: 'Agent Hooks', status: '⚠️', message: 'Hook file missing' })
}

if (fs.existsSync('.kiro/steering/ghost-agent-rules.md')) {
  checks.push({ name: 'Steering Docs', status: '✅', message: 'Configured' })
} else {
  checks.push({ name: 'Steering Docs', status: '⚠️', message: 'Steering file missing' })
}

if (fs.existsSync('.kiro/settings/mcp.json')) {
  checks.push({ name: 'MCP Config', status: '✅', message: 'Configured' })
} else {
  checks.push({ name: 'MCP Config', status: '⚠️', message: 'MCP config missing' })
}

// Check 4: MCP server
if (fs.existsSync('mcp-servers/blockchain-vows-server.js')) {
  checks.push({ name: 'Blockchain MCP Server', status: '✅', message: 'Ready' })
} else {
  checks.push({ name: 'Blockchain MCP Server', status: '❌', message: 'Server file missing' })
}

// Print results
console.log('Setup Status:\n')
checks.forEach(check => {
  console.log(`${check.status} ${check.name}: ${check.message}`)
})

// Summary
const errors = checks.filter(c => c.status === '❌').length
const warnings = checks.filter(c => c.status === '⚠️').length
const success = checks.filter(c => c.status === '✅').length

console.log(`\n📊 Summary: ${success} OK, ${warnings} warnings, ${errors} errors\n`)

if (errors > 0) {
  console.log('❌ Setup incomplete. Fix errors above before running.\n')
  process.exit(1)
} else if (warnings > 0) {
  console.log('⚠️  Setup mostly complete. Warnings are optional features.\n')
  console.log('You can run: npm run dev\n')
} else {
  console.log('✅ All systems go! Run: npm run dev\n')
}
