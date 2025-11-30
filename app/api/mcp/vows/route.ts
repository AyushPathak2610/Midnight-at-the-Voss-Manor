import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'child_process'

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { action, person, vow } = await req.json()
    
    // Call the blockchain-vows MCP server
    const mcpServer = spawn('node', ['mcp-servers/blockchain-vows-server.js'])
    
    const request = {
      method: 'tools/call',
      params: {
        name: action === 'check' ? 'check_vow' : 'record_vow',
        arguments: { person, vow }
      }
    }
    
    mcpServer.stdin.write(JSON.stringify(request) + '\n')
    
    return new Promise<NextResponse>((resolve) => {
      mcpServer.stdout.on('data', (data) => {
        const response = JSON.parse(data.toString())
        resolve(NextResponse.json(response.content[0].text))
        mcpServer.kill()
      })
    })
  } catch (error) {
    console.error('Vows MCP error:', error)
    return NextResponse.json({ error: 'Vow check failed' }, { status: 500 })
  }
}
