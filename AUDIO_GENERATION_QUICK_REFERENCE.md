# 🎙️ Audio Generation Quick Reference

## Copy-Paste Ready Format

---

## VOICE SETTINGS REFERENCE

| Character | Voice Name | Voice ID | Stability | Similarity | Style | Speaker Boost |
|-----------|------------|----------|-----------|------------|-------|---------------|
| Narrator | Adam | pNInz6obpgDQGcFmaJgB | 0.4 | 0.75 | 0.5 | ON |
| Elara | Bella | EXAVITQu4vr4xnSDxMaL | 0.3 | 0.7 | 0.5 | ON |
| Harlan | Clyde | 2EiwWnXFnvU5JabPnv8n | 0.5 | 0.75 | 0.5 | ON |
| Mira | Dorothy | ThT5KcBeYPX3keUQqHPh | 0.2 | 0.65 | 0.5 | ON |
| Theo | Antoni | ErXwobaYiN019PkySvjV | 0.25 | 0.7 | 0.5 | ON |
| Selene | Charlotte | XB0fDUnXU5powFXDhCwa | 0.6 | 0.8 | 0.5 | ON |

---

## ALL TEXT TO GENERATE (Copy-Paste Ready)

### INTRO SCENE

**narrator_intro_1.mp3** (Adam, Stability: 0.4)
```
Lost in the storm...
```

**narrator_intro_2.mp3** (Adam, Stability: 0.4)
```
Something watches from the shadows...
```

**narrator_intro_3.mp3** (Adam, Stability: 0.4)
```
A mansion looms ahead...
```

**narrator_intro_4.mp3** (Adam, Stability: 0.4)
```
The gate opens... there's no turning back.
```

---

### FOYER SCENE

**narrator_foyer_intro.mp3** (Adam, Stability: 0.4)
```
You enter the foyer. Dust hangs in moonbeams. A lantern ignites on its own...
```

**elara_foyer_intro.mp3** (Bella, Stability: 0.3)
```
Welcome, traveler. I am Elara... once mother to this family. We are trapped here, our bonds fractured by tragedy. Help us remember... help us weave our memories back together.
```

**elara_foyer_complete.mp3** (Bella, Stability: 0.3)
```
The tapestry weaves itself... memories restored. Thank you.
```

---

### STUDY SCENE

**narrator_study_intro.mp3** (Adam, Stability: 0.4)
```
Books orbit a pulsing crystal. The room itself seems to twist...
```

**harlan_study_intro.mp3** (Clyde, Stability: 0.5)
```
I... I remember fragments. The Eternal Harmony project. I wanted to connect us all... forever. But something went wrong. My memories... scattered like data packets. Help me... reconstruct them.
```

**harlan_study_complete.mp3** (Clyde, Stability: 0.5)
```
I... I remember now. The family. The love. The experiment... it was meant to preserve that.
```

---

### NURSERY SCENE

**narrator_nursery_intro.mp3** (Adam, Stability: 0.4)
```
Toys float in zero gravity. Crayon drawings animate on the walls...
```

**mira_nursery_intro.mp3** (Dorothy, Stability: 0.2)
```
Hi! I'm Mira! Do you wanna play? Mommy and Daddy are here but... they can't see me anymore. I miss bedtime stories and hugs. Can you help me remember the happy times?
```

**mira_nursery_complete.mp3** (Dorothy, Stability: 0.2)
```
Yay! The tree is pretty now! I remember everything! Thank you for playing with me!
```

---

### CHAPEL SCENE

**narrator_chapel_intro.mp3** (Adam, Stability: 0.4)
```
The Chapel. Stained glass windows depict the family in happier times. The Nexus Crystal glows golden on the altar.
```

**narrator_chapel_reunion.mp3** (Adam, Stability: 0.4)
```
The five ghosts stand in a circle. The Nexus Crystal pulses with their combined energy.
```

**elara_chapel_reunion.mp3** (Bella, Stability: 0.3)
```
My family... together again.
```

**harlan_chapel_reunion.mp3** (Clyde, Stability: 0.5)
```
I remember everything now.
```

**mira_chapel_reunion.mp3** (Dorothy, Stability: 0.2)
```
Mommy! Daddy! You can see me!
```

**theo_chapel_reunion.mp3** (Antoni, Stability: 0.25)
```
Brother... I'm sorry I ran.
```

**selene_chapel_reunion.mp3** (Charlotte, Stability: 0.6)
```
Theo... I forgive you.
```

**narrator_chapel_ending.mp3** (Adam, Stability: 0.4)
```
The light consumes everything. When it fades, the mansion stands peaceful in morning light. The five ghosts have found peace. Not through a single mind, but through five independent AI agents learning to work together.
```

---

## MUSIC PROMPTS (Optional)

### intro.mp3 (60 seconds)
```
Dark atmospheric horror ambience with distant thunder, eerie wind, ominous drones, gothic mansion atmosphere
```

### foyer.mp3 (60 seconds)
```
Melancholic piano melody with strings, sad but beautiful, haunting memories, gentle ghostly atmosphere
```

### study.mp3 (60 seconds)
```
Glitchy electronic ambience, fragmented memories, digital corruption sounds, sci-fi horror atmosphere
```

### nursery.mp3 (60 seconds)
```
Innocent music box melody slowly distorting, childlike wonder turning eerie, soft lullaby with dark undertones
```

### chapel.mp3 (60 seconds)
```
Epic orchestral crescendo, emotional resolution, hope and sadness combined, cinematic finale atmosphere
```

---

## FILE STRUCTURE

```
public/audio/voices/
├── narrator_intro_1.mp3
├── narrator_intro_2.mp3
├── narrator_intro_3.mp3
├── narrator_intro_4.mp3
├── narrator_foyer_intro.mp3
├── elara_foyer_intro.mp3
├── elara_foyer_complete.mp3
├── narrator_study_intro.mp3
├── harlan_study_intro.mp3
├── harlan_study_complete.mp3
├── narrator_nursery_intro.mp3
├── mira_nursery_intro.mp3
├── mira_nursery_complete.mp3
├── narrator_chapel_intro.mp3
├── narrator_chapel_reunion.mp3
├── elara_chapel_reunion.mp3
├── harlan_chapel_reunion.mp3
├── mira_chapel_reunion.mp3
├── theo_chapel_reunion.mp3
├── selene_chapel_reunion.mp3
└── narrator_chapel_ending.mp3

public/audio/music/
├── intro.mp3
├── foyer.mp3
├── study.mp3
├── nursery.mp3
└── chapel.mp3
```

---

## GENERATION WORKFLOW

1. Open https://elevenlabs.io/app/speech-synthesis
2. Select voice from dropdown
3. Set stability, similarity, style values
4. Enable Speaker Boost
5. Paste text
6. Click Generate
7. Download as MP3
8. Rename to exact filename
9. Move to correct folder
10. Repeat for all 21 files

**Total: 21 voice files + 5 music files (optional)**

---

## QUICK CHECKLIST

**Intro (4):**
- [ ] narrator_intro_1
- [ ] narrator_intro_2
- [ ] narrator_intro_3
- [ ] narrator_intro_4

**Foyer (3):**
- [ ] narrator_foyer_intro
- [ ] elara_foyer_intro
- [ ] elara_foyer_complete

**Study (3):**
- [ ] narrator_study_intro
- [ ] harlan_study_intro
- [ ] harlan_study_complete

**Nursery (3):**
- [ ] narrator_nursery_intro
- [ ] mira_nursery_intro
- [ ] mira_nursery_complete

**Chapel (8):**
- [ ] narrator_chapel_intro
- [ ] narrator_chapel_reunion
- [ ] elara_chapel_reunion
- [ ] harlan_chapel_reunion
- [ ] mira_chapel_reunion
- [ ] theo_chapel_reunion
- [ ] selene_chapel_reunion
- [ ] narrator_chapel_ending

**Music (5 - optional):**
- [ ] intro
- [ ] foyer
- [ ] study
- [ ] nursery
- [ ] chapel

---

**Total Files: 21 voices + 5 music = 26 files**  
**Time: ~45-60 minutes**  
**Benefit: 51% API cost savings!**
