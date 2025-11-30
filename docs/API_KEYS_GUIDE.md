# Complete API Keys Setup Guide

## Required: Groq API (FREE) ✅

**What it does:** Powers all 5 ghost AI agents

**Cost:** FREE (30 req/min, 14,400/day)

**Setup:**
1. Visit https://console.groq.com/keys
2. Click "Sign in" → Choose GitHub or email
3. Once logged in, click "Create API Key"
4. Give it a name like "Shadowed Haven"
5. Copy the key (starts with `gsk_`)
6. Add to `.env`:
   ```env
   GROQ_API_KEY=gsk_your_actual_key_here
   ```

**Troubleshooting:**
- Key not working? Make sure it starts with `gsk_`
- Rate limited? Free tier is 30/min - wait a minute
- Sign up issues? Use GitHub auth (fastest)

---

## Optional: Replicate API (Image Generation) 🎨

**What it does:** Mira generates crayon drawings when she's happy

**Cost:** FREE $5 credit on signup (enough for ~500 images)

**Setup:**
1. Visit https://replicate.com/account/api-tokens
2. Sign up with GitHub
3. Click "Create token"
4. Copy the token (starts with `r8_`)
5. Add to `.env`:
   ```env
   REPLICATE_API_KEY=r8_your_actual_key_here
   ```

**Without this key:**
- App uses placeholder images from placeholder.com
- Everything else works normally
- Still looks good in demos!

**Troubleshooting:**
- Images not generating? Check browser console for errors
- Out of credits? App automatically falls back to placeholders
- Want more credits? Replicate has pay-as-you-go ($0.01/image)

---

## Optional: Pinecone API (Vector Memory) 🧠

**What it does:** Harlan stores and retrieves puzzle memories

**Cost:** FREE tier (no credit card required)

**Setup:**
1. Visit https://app.pinecone.io
2. Sign up with email or GitHub
3. Create a new project (any name)
4. Go to "API Keys" in left sidebar
5. Copy your API key
6. Add to `.env`:
   ```env
   PINECONE_API_KEY=your_actual_key_here
   ```

**Additional setup for Pinecone:**
You'll also need to create an index:
1. In Pinecone dashboard, click "Create Index"
2. Name: `shadowed-haven-memories`
3. Dimensions: `1536` (for OpenAI embeddings)
4. Metric: `cosine`
5. Click "Create Index"

**Without this key:**
- App uses in-memory storage (Map object)
- Memories reset when server restarts
- Perfect for demos and testing!

**Troubleshooting:**
- Connection errors? Check API key is correct
- Index not found? Create index as described above
- Want persistent memory? Keep Pinecone configured

---

## Summary: What You Actually Need

### Minimum (Game Works Great)
- ✅ **Groq API** - FREE, required

### Full Experience (All Features)
- ✅ **Groq API** - FREE, required
- 🎨 **Replicate API** - FREE $5 credit, optional
- 🧠 **Pinecone API** - FREE tier, optional

### Recommended for Hackathon Demo
Just use **Groq**! The other features are cool but not essential. Judges care more about:
- Agent debates (works with just Groq)
- Inter-agent communication (works with just Groq)
- Real-time responses (works with just Groq)

Save time, skip the optional keys, and focus on your demo video!

---

## Quick Copy-Paste Setup

**Minimum viable `.env`:**
```env
GROQ_API_KEY=gsk_your_key_from_console_groq_com
```

**Full featured `.env`:**
```env
GROQ_API_KEY=gsk_your_key_from_console_groq_com
REPLICATE_API_KEY=r8_your_key_from_replicate_com
PINECONE_API_KEY=your_key_from_app_pinecone_io
```

---

## Testing Your Keys

Run the verification script:
```bash
npm run verify
```

You should see:
- ✅ Groq API Key: Configured
- ⚠️ Replicate API Key: Not configured (optional)
- ⚠️ Pinecone API Key: Not configured (optional)

Warnings are fine! The app works without optional keys.

---

## Cost Breakdown

| Service | Free Tier | What You Get | Enough For |
|---------|-----------|--------------|------------|
| Groq | ✅ Yes | 30 req/min, 14,400/day | Entire hackathon + demos |
| Replicate | ✅ $5 credit | ~500 images | All testing + final demo |
| Pinecone | ✅ Yes | 1 index, 100k vectors | Unlimited for this project |

**Total cost to run this project: $0** 🎉

---

## Security Notes

- Never commit `.env` to git (already in `.gitignore`)
- Don't share API keys in screenshots/videos
- Regenerate keys if accidentally exposed
- Use environment variables in production (Vercel, etc.)

---

## Need Help?

- Groq issues: https://console.groq.com/docs
- Replicate issues: https://replicate.com/docs
- Pinecone issues: https://docs.pinecone.io

Or check the main `SETUP.md` for troubleshooting tips!
