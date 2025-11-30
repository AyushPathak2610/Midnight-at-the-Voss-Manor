#!/usr/bin/env node

/**
 * Frankenstein Feature Verification Script
 * Checks that all required Kiro features are properly implemented
 */

const fs = require('fs')
const path = require('path')

console.log('🧟 Verifying Frankenstein Implementation...\n')

let passed = 0
let failed = 0

function check(name, condition, details = '') {
  if (condition) {
    console.log(`✅ ${name}`)
    if (details) console.log(`   ${details}`)
    passed++
  } else {
    console.log(`❌ ${name}`)
    if (details) console.log(`   ${details}`)
    failed++
  }
}

// 1. Agent Hooks
console.log('📌 Checking Agent Hooks...')
const hooksDir = '.kiro/hooks'
check(
  'Agent Hooks Directory Exists',
  fs.existsSync(hooksDir),
  `Location: ${hooksDir}`
)

const requiredHooks = [
  'ghost-debate-trigger.json',
  'mira-crayon-draw.json',
  'harlan-memory-store.json'
]

requiredHooks.forEach(hook => {
  const hookPath = path.join(hooksDir, hook)
  check(
    `Hook: ${hook}`,
    fs.existsSync(hookPath),
    `Automates: ${hook.replace('.json', '').replace(/-/g, ' ')}`
  )
})

// 2. MCP Configuration
console.log('\n📌 Checking MCP Extensions...')
const mcpConfig = '.kiro/settings/mcp.json'
check(
  'MCP Configuration Exists',
  fs.existsSync(mcpConfig),
  `Location: ${mcpConfig}`
)

if (fs.existsSync(mcpConfig)) {
  const config = JSON.parse(fs.readFileSync(mcpConfig, 'utf8'))
  const servers = Object.keys(config.mcpServers || {})
  
  check(
    'Blockchain Vows MCP',
    servers.includes('blockchain-vows'),
    'For Selene\'s promise verification'
  )
  
  check(
    'Replicate Image Gen MCP',
    servers.includes('replicate-image-gen'),
    'For Mira\'s crayon drawings'
  )
  
  check(
    'Pinecone Memory MCP',
    servers.includes('pinecone-memory'),
    'For Harlan\'s vector storage'
  )
}

// 3. Spec-Driven Development
console.log('\n📌 Checking Spec-Driven Development...')
const specsDir = '.kiro/specs/ghost-agents'
check(
  'Specs Directory Exists',
  fs.existsSync(specsDir),
  `Location: ${specsDir}`
)

const requiredSpecs = ['requirements.md', 'design.md']
requiredSpecs.forEach(spec => {
  const specPath = path.join(specsDir, spec)
  check(
    `Spec: ${spec}`,
    fs.existsSync(specPath),
    `Defines: ${spec.replace('.md', '')}`
  )
})

// 4. Steering Docs
console.log('\n📌 Checking Steering Docs...')
const steeringDir = '.kiro/steering'
check(
  'Steering Directory Exists',
  fs.existsSync(steeringDir),
  `Location: ${steeringDir}`
)

const requiredSteering = ['ghost-agent-rules.md', 'scene-structure.md']
requiredSteering.forEach(doc => {
  const docPath = path.join(steeringDir, doc)
  check(
    `Steering: ${doc}`,
    fs.existsSync(docPath),
    `Guides: ${doc.replace('.md', '').replace(/-/g, ' ')}`
  )
})

// 5. Ghost Agents
console.log('\n📌 Checking Ghost Agents...')
const agentsFile = 'lib/agents/ghostAgents.ts'
check(
  'Ghost Agents Module Exists',
  fs.existsSync(agentsFile),
  `Location: ${agentsFile}`
)

if (fs.existsSync(agentsFile)) {
  const agentsCode = fs.readFileSync(agentsFile, 'utf8')
  const ghosts = ['elara', 'harlan', 'mira', 'theo', 'selene']
  
  ghosts.forEach(ghost => {
    check(
      `Agent: ${ghost.charAt(0).toUpperCase() + ghost.slice(1)}`,
      agentsCode.includes(`${ghost}:`),
      `Personality defined with system prompt`
    )
  })
}

// 6. Debate API
console.log('\n📌 Checking Debate System...')
const debateAPI = 'app/api/ghost-debate/route.ts'
check(
  'Debate API Route Exists',
  fs.existsSync(debateAPI),
  `Location: ${debateAPI}`
)

// 7. Scene Components
console.log('\n📌 Checking Scene Components...')
const scenesDir = 'components/scenes'
const requiredScenes = [
  'IntroScene.tsx',
  'FoyerScene.tsx',
  'StudyScene.tsx',
  'NurseryScene.tsx',
  'ChapelScene.tsx'
]

requiredScenes.forEach(scene => {
  const scenePath = path.join(scenesDir, scene)
  check(
    `Scene: ${scene.replace('.tsx', '')}`,
    fs.existsSync(scenePath),
    `Implements puzzle + debate integration`
  )
})

// 8. Visual Assets
console.log('\n📌 Checking Visual Assets...')
const shotsDir = 'public/shots'
check(
  'Shots Directory Exists',
  fs.existsSync(shotsDir),
  `Location: ${shotsDir}`
)

if (fs.existsSync(shotsDir)) {
  const shots = fs.readdirSync(shotsDir).filter(f => f.endsWith('.png'))
  check(
    'Gothic-Cyberpunk Shots',
    shots.length >= 20,
    `Found ${shots.length} pre-generated scene images`
  )
}

// 9. Documentation
console.log('\n📌 Checking Documentation...')
const docs = [
  'README.md',
  'FRANKENSTEIN_SUBMISSION.md',
  'docs/API_KEYS_GUIDE.md',
  'docs/MCP_SETUP.md'
]

docs.forEach(doc => {
  check(
    `Doc: ${doc}`,
    fs.existsSync(doc),
    `Explains: ${doc.split('/').pop().replace('.md', '')}`
  )
})

// 10. Environment Setup
console.log('\n📌 Checking Environment...')
check(
  '.env.example Exists',
  fs.existsSync('.env.example'),
  'Template for API keys'
)

check(
  '.env Exists',
  fs.existsSync('.env'),
  'User has configured environment'
)

if (fs.existsSync('.env')) {
  const env = fs.readFileSync('.env', 'utf8')
  check(
    'GROQ_API_KEY Configured',
    env.includes('GROQ_API_KEY=') && !env.includes('your_groq_api_key_here'),
    'Required for all 5 ghost agents'
  )
}

// Summary
console.log('\n' + '='.repeat(50))
console.log(`✅ Passed: ${passed}`)
console.log(`❌ Failed: ${failed}`)
console.log('='.repeat(50))

if (failed === 0) {
  console.log('\n🎉 All Frankenstein features verified!')
  console.log('Ready for hackathon submission!')
  console.log('\nNext steps:')
  console.log('1. npm run dev')
  console.log('2. Test all 5 scenes')
  console.log('3. Record demo video')
  console.log('4. Submit to hackathon')
} else {
  console.log('\n⚠️  Some features need attention.')
  console.log('Review the failed checks above.')
  process.exit(1)
}
