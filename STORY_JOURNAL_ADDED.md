# 📖 Story Journal System Added!

## What's New

A **Story Journal** button now appears in the bottom-right corner. As you meet each ghost, their tragic backstory unlocks!

---

## How It Works

### Unlocking Stories

**Foyer Scene:**
- Meet Elara → Her story unlocks
- "The Mother - Keeper of Memories"

**Study Scene:**
- Meet Harlan → His story unlocks
- "The Scientist - Architect of Tragedy"

**Nursery Scene:**
- Meet Mira → Her story unlocks
- "The Daughter - Innocent Lost"

**Chapel Scene:**
- Reunion → Theo & Selene's stories unlock
- "The Brother - Coward Returned"
- "The Bride - Betrayed and Bound"

### Reading Stories

1. **Journal button appears** after meeting first ghost
2. **Click "📖 Story Journal (1)"** to open
3. **See list** of unlocked stories
4. **Click any story** to read full backstory
5. **Close** to return to game

---

## The Five Tragic Stories

### Elara - The Mother
**What happened:**
- Loving wife and mother
- Supported Harlan's Eternal Harmony project
- Believed love could transcend anything
- Died in the neural overload
- Now tries to hold the family together even in death

**Key Quote:**
> "For one perfect moment, I felt everything. Harlan's brilliant mind, Mira's innocent joy, Theo's regret, Selene's guarded heart. We were one. Then the overload hit."

---

### Harlan - The Scientist
**What happened:**
- Brilliant neuroscientist, distant father
- Created Eternal Harmony to connect families
- Tested on himself first, became obsessed
- Convinced family to join the experiment
- Caused the neural overload that killed everyone
- Memory fragmented by guilt

**Key Quote:**
> "I killed my family. My beautiful wife. My innocent daughter. My brother and his fiancée. All because I thought I could improve on love with technology."

---

### Mira - The Daughter
**What happened:**
- 7-year-old girl who loved stories and butterflies
- Thought the neural crowns were a fun game
- Died not understanding what was happening
- Still doesn't fully understand death
- Just wants to play with her family again

**Key Quote:**
> "I don't really understand death. Mommy tried to explain, but it's confusing. All I know is we can't leave the mansion. We can't hug anymore - our hands go through each other."

---

### Theo - The Brother
**What happened:**
- Theater actor, Harlan's brother
- Engaged to Selene, fled 3 weeks before wedding
- Returned a year later to apologize
- Agreed to neural experiment to prove sincerity
- Died before he could make amends
- Now bound to the woman he betrayed

**Key Quote:**
> "I ran from commitment, and now I'm bound to this place forever. Bound to Selene, who can barely look at me. Bound to the family I helped destroy."

---

### Selene - The Bride
**What happened:**
- Corporate lawyer, logical and sharp
- Fell in love with dramatic Theo
- Betrayed when he fled before wedding
- Agreed to experiment to see inside his mind
- Died just as she was beginning to forgive
- Now learning forgiveness in death

**Key Quote:**
> "I'd spent a year building walls to protect myself. Now I'm literally bound to the man who hurt me, for eternity. But perhaps... perhaps forgiveness is the only way either of us will find peace."

---

## The Complete Tragedy

**2038:** Theo and Selene engaged  
**2038:** Theo flees 3 weeks before wedding  
**2039:** Harlan develops Eternal Harmony project  
**2039:** Theo returns to apologize  
**2039:** Family gathers for experiment  
**2039:** Neural overload kills all five  
**2039-Present:** Trapped as ghosts in the mansion  

---

## UI Design

### Journal Button
- **Location:** Bottom-right corner
- **Style:** Purple glow, book icon
- **Shows:** Number of unlocked stories
- **Appears:** After meeting first ghost

### Journal Modal
- **Dark gothic theme** matching game aesthetic
- **List view:** All unlocked stories with icons
- **Detail view:** Full backstory text
- **Easy navigation:** Back button, close button

### Ghost Icons
- 👩 Elara (Mother)
- 👨‍🔬 Harlan (Scientist)
- 👧 Mira (Daughter)
- 🎭 Theo (Actor/Uncle)
- 👰 Selene (Bride/Aunt)

---

## Story Content

Each story is **500-800 words** and includes:
- Who they were in life
- Their relationship to the family
- What happened the night of the experiment
- How they died
- How they feel now as ghosts
- Their role in the tragedy

**Written in first person** from each ghost's perspective.

---

## Benefits

### Narrative Depth
- ✅ Players understand WHY they're helping
- ✅ Each ghost has clear motivation
- ✅ Tragedy feels earned, not arbitrary
- ✅ Emotional investment increases

### Gameplay Integration
- ✅ Stories unlock naturally through progression
- ✅ Optional reading (doesn't block gameplay)
- ✅ Adds replay value (collect all stories)
- ✅ Enhances ghost debates (you know their perspectives)

### Storytelling
- ✅ Show, don't tell (through their own words)
- ✅ Multiple perspectives on same event
- ✅ Reveals family dynamics gradually
- ✅ Makes the ending more impactful

---

## Files Created

- **`components/StoryJournal.tsx`** - Journal UI component
- **`lib/story/ghostStories.ts`** - All 5 backstories
- **`STORY_JOURNAL_ADDED.md`** - This documentation

**Files Modified:**
- `app/page.tsx` - Added journal state and component
- `components/scenes/FoyerScene.tsx` - Unlocks Elara
- `components/scenes/StudyScene.tsx` - Unlocks Harlan
- `components/scenes/NurseryScene.tsx` - Unlocks Mira
- `components/scenes/ChapelScene.tsx` - Unlocks Theo & Selene

---

## Testing

```bash
npm run dev
```

1. Play through to Foyer
2. Meet Elara
3. **Look for "📖 Story Journal (1)" button** (bottom-right)
4. Click to read Elara's story
5. Continue playing to unlock more stories

---

## Story Progression

- **After Foyer:** 1 story (Elara)
- **After Study:** 2 stories (Elara, Harlan)
- **After Nursery:** 3 stories (Elara, Harlan, Mira)
- **After Chapel:** 5 stories (All ghosts)

---

**Your game now has deep narrative context that makes the tragedy feel real! 📖✨**
