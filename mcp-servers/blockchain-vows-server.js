#!/usr/bin/env node

// Simple MCP server for blockchain-style vow verification
// Simulates a promise ledger for Selene's character

const vows = new Map()

const server = {
  name: 'blockchain-vows',
  version: '1.0.0',
  
  tools: [
    {
      name: 'check_vow',
      description: 'Check if a vow/promise was kept in the ledger',
      inputSchema: {
        type: 'object',
        properties: {
          person: { type: 'string', description: 'Who made the vow' },
          vow: { type: 'string', description: 'What was promised' }
        },
        required: ['person', 'vow']
      }
    },
    {
      name: 'record_vow',
      description: 'Record a new vow in the ledger',
      inputSchema: {
        type: 'object',
        properties: {
          person: { type: 'string' },
          vow: { type: 'string' },
          kept: { type: 'boolean', description: 'Was it kept?' }
        },
        required: ['person', 'vow', 'kept']
      }
    }
  ]
}

// Seed data for Theo and Selene's story
vows.set('theo-wedding', { person: 'Theo', vow: 'Marry Selene', kept: false, timestamp: '2039-01-15' })
vows.set('theo-return', { person: 'Theo', vow: 'Return to make amends', kept: true, timestamp: '2039-06-20' })

function handleToolCall(name, args) {
  if (name === 'check_vow') {
    const key = `${args.person.toLowerCase()}-${args.vow.toLowerCase().replace(/\s+/g, '-')}`
    const record = vows.get(key)
    return record || { found: false, message: 'No record of this vow' }
  }
  
  if (name === 'record_vow') {
    const key = `${args.person.toLowerCase()}-${args.vow.toLowerCase().replace(/\s+/g, '-')}`
    vows.set(key, { ...args, timestamp: new Date().toISOString() })
    return { success: true, message: 'Vow recorded on ledger' }
  }
  
  return { error: 'Unknown tool' }
}

// MCP protocol handler
process.stdin.on('data', (data) => {
  const request = JSON.parse(data.toString())
  
  if (request.method === 'tools/list') {
    process.stdout.write(JSON.stringify({ tools: server.tools }) + '\n')
  } else if (request.method === 'tools/call') {
    const result = handleToolCall(request.params.name, request.params.arguments)
    process.stdout.write(JSON.stringify({ content: [{ type: 'text', text: JSON.stringify(result) }] }) + '\n')
  }
})

console.error('Blockchain Vows MCP Server started')
