// Text-to-Speech service for character dialogue with ElevenLabs API

export type GhostVoice = 'elara' | 'harlan' | 'mira' | 'theo' | 'selene' | 'narrator'

interface VoiceConfig {
  // ElevenLabs voice IDs (fallback to browser TTS if API unavailable)
  elevenLabsVoiceId?: string
  // Browser TTS fallback
  pitch: number
  rate: number
  volume: number
  voiceIndex?: number
  // Character emotion settings
  stability: number // 0-1, lower = more expressive
  similarityBoost: number // 0-1, higher = more similar to original voice
}

const VOICE_CONFIGS: Record<GhostVoice, VoiceConfig> = {
  elara: {
    // Maternal, gentle, warm - Bella (softer than Rachel)
    elevenLabsVoiceId: 'EXAVITQu4vr4xnSDxMaL', // Bella - gentle, maternal
    pitch: 1.1,
    rate: 0.8, // Slower, more deliberate
    volume: 0.9,
    voiceIndex: 0,
    stability: 0.3, // Very expressive for emotional moments
    similarityBoost: 0.7
  },
  harlan: {
    // Scientific, confused, logical - Clyde (older, wiser)
    elevenLabsVoiceId: '2EiwWnXFnvU5JabPnv8n', // Clyde - mature, thoughtful
    pitch: 0.85,
    rate: 0.85, // Measured, confused
    volume: 0.85,
    voiceIndex: 1,
    stability: 0.5, // Moderate for confusion
    similarityBoost: 0.75
  },
  mira: {
    // Childlike, innocent, playful - Dorothy (young girl)
    elevenLabsVoiceId: 'ThT5KcBeYPX3keUQqHPh', // Dorothy - childlike, sweet
    pitch: 1.5,
    rate: 1.0, // Natural child pace
    volume: 1.0,
    voiceIndex: 0,
    stability: 0.2, // Very expressive, emotional
    similarityBoost: 0.65
  },
  theo: {
    // Dramatic, regretful, theatrical - Antoni (emotional, expressive)
    elevenLabsVoiceId: 'ErXwobaYiN019PkySvjV', // Antoni - emotional, dramatic
    pitch: 0.95,
    rate: 0.9, // Deliberate, theatrical
    volume: 0.9,
    voiceIndex: 1,
    stability: 0.25, // Very expressive for drama
    similarityBoost: 0.7
  },
  selene: {
    // Cold but softening, elegant, demanding - Charlotte (sophisticated)
    elevenLabsVoiceId: 'XB0fDUnXU5powFXDhCwa', // Charlotte - elegant, controlled
    pitch: 1.05,
    rate: 0.75, // Slow, deliberate, commanding
    volume: 0.85,
    voiceIndex: 0,
    stability: 0.6, // More controlled, cold
    similarityBoost: 0.8
  },
  narrator: {
    // Deep, expressive, atmospheric - Adam (deep male voice)
    elevenLabsVoiceId: 'pNInz6obpgDQGcFmaJgB', // Adam - deep, authoritative
    pitch: 0.9, // Slightly lower for depth
    rate: 1.1, // Faster delivery
    volume: 0.8,
    voiceIndex: 0,
    stability: 0.4, // Lower for MORE expressiveness and tonality
    similarityBoost: 0.75 // Natural variation
  }
}

class SpeechService {
  private synth: SpeechSynthesis | null = null
  private voices: SpeechSynthesisVoice[] = []
  private currentUtterance: SpeechSynthesisUtterance | null = null
  private currentAudio: HTMLAudioElement | null = null
  private enabled: boolean = true
  private useElevenLabs: boolean = true
  private elevenLabsApiKey: string | null = null
  private speechQueue: Array<{ text: string; character: GhostVoice; resolve: () => void }> = []
  private isSpeaking: boolean = false
  private audioCache: Map<string, string> = new Map() // Cache audio URLs by text+character

  constructor() {
    if (typeof window !== 'undefined') {
      // Initialize browser TTS
      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis
        this.loadVoices()
        
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = () => {
            this.loadVoices()
          }
        }
      }

      // Check for ElevenLabs API key
      this.elevenLabsApiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || null
      if (!this.elevenLabsApiKey) {
        console.log('TTS: ElevenLabs API key not found, using browser TTS fallback')
        this.useElevenLabs = false
      }
    }
  }

  private loadVoices() {
    if (this.synth) {
      this.voices = this.synth.getVoices()
      console.log('TTS voices loaded:', this.voices.length)
    }
  }

  private addEmotionalPauses(text: string, character: GhostVoice): string {
    // Add SSML-like pauses for emotional delivery
    let processedText = text

    // Add pauses after ellipsis for dramatic effect
    processedText = processedText.replace(/\.\.\./g, '... ')
    
    // Add pauses after commas for breath
    processedText = processedText.replace(/,/g, ', ')
    
    // Add emphasis for character-specific patterns
    if (character === 'mira') {
      // Excited, faster delivery with emphasis on exclamations
      processedText = processedText.replace(/!/g, '! ')
    } else if (character === 'theo') {
      // Dramatic pauses
      processedText = processedText.replace(/\?/g, '? ')
    } else if (character === 'selene') {
      // Cold, deliberate pauses
      processedText = processedText.replace(/\./g, '. ')
    }

    return processedText
  }

  private getStaticAudioFilename(text: string, character: GhostVoice): string | null {
    // Map text to pre-generated audio files
    const staticAudioMap: Record<string, string> = {
      // Intro
      'Lost in the storm...': 'narrator_intro_1',
      'Something watches from the shadows...': 'narrator_intro_2',
      'A mansion looms ahead...': 'narrator_intro_3',
      "The gate opens... there's no turning back.": 'narrator_intro_4',
      
      // Foyer
      'You enter the foyer. Dust hangs in moonbeams. A lantern ignites on its own...': 'narrator_foyer_intro',
      "Welcome, traveler. I am Elara... once mother to this family. We are trapped here, our bonds fractured by tragedy. Help us remember... help us weave our memories back together.": 'elara_foyer_intro',
      'The tapestry weaves itself... memories restored. Thank you.': 'elara_foyer_complete',
      
      // Study
      'Books orbit a pulsing crystal. The room itself seems to twist...': 'narrator_study_intro',
      "I... I remember fragments. The Eternal Harmony project. I wanted to connect us all... forever. But something went wrong. My memories... scattered like data packets. Help me... reconstruct them.": 'harlan_study_intro',
      'I... I remember now. The family. The love. The experiment... it was meant to preserve that.': 'harlan_study_complete',
      
      // Nursery
      'Toys float in zero gravity. Crayon drawings animate on the walls...': 'narrator_nursery_intro',
      "Hi! I'm Mira! Do you wanna play? Mommy and Daddy are here but... they can't see me anymore. I miss bedtime stories and hugs. Can you help me remember the happy times?": 'mira_nursery_intro',
      "Yay! The tree is pretty now! I remember everything! Thank you for playing with me!": 'mira_nursery_complete',
      
      // Chapel
      'The Chapel. Stained glass windows depict the family in happier times. The Nexus Crystal glows golden on the altar.': 'narrator_chapel_intro',
      'The five ghosts stand in a circle. The Nexus Crystal pulses with their combined energy.': 'narrator_chapel_reunion',
      'My family... together again.': 'elara_chapel_reunion',
      'I remember everything now.': 'harlan_chapel_reunion',
      'Mommy! Daddy! You can see me!': 'mira_chapel_reunion',
      "Brother... I'm sorry I ran.": 'theo_chapel_reunion',
      'Theo... I forgive you.': 'selene_chapel_reunion',
      'The light consumes everything. When it fades, the mansion stands peaceful in morning light. The five ghosts have found peace. Not through a single mind, but through five independent AI agents learning to work together.': 'narrator_chapel_ending'
    }
    
    return staticAudioMap[text] || null
  }

  private async speakWithElevenLabs(text: string, character: GhostVoice): Promise<void> {
    const config = VOICE_CONFIGS[character]
    const processedText = this.addEmotionalPauses(text, character)
    
    // Check if this is static audio with a pre-generated file
    const staticFilename = this.getStaticAudioFilename(text, character)
    
    if (staticFilename) {
      // Use pre-generated local file
      const audioUrl = `/audio/voices/${staticFilename}.mp3`
      console.log(`TTS: Using pre-generated audio: ${staticFilename}`)
      
      return new Promise((resolve, reject) => {
        const audio = new Audio(audioUrl)
        this.currentAudio = audio

        audio.onended = () => {
          this.currentAudio = null
          resolve()
        }

        audio.onerror = (error) => {
          console.error(`Failed to load ${audioUrl}, falling back to API`)
          this.currentAudio = null
          // Fallback to API if file doesn't exist
          this.speakWithElevenLabsAPI(text, character).then(resolve).catch(reject)
        }

        audio.play().catch((error) => {
          console.error('Audio play failed:', error)
          // If play fails (e.g., autoplay blocked), try API fallback
          this.speakWithElevenLabsAPI(text, character).then(resolve).catch(reject)
        })
      })
    }
    
    // Dynamic text (debates, etc.) - use API with caching
    return this.speakWithElevenLabsAPI(text, character)
  }

  private async speakWithElevenLabsAPI(text: string, character: GhostVoice): Promise<void> {
    if (!this.elevenLabsApiKey) {
      console.error('TTS: ElevenLabs API key not available')
      throw new Error('ElevenLabs API key not available')
    }

    const config = VOICE_CONFIGS[character]
    const processedText = this.addEmotionalPauses(text, character)
    
    console.log(`TTS: Calling ElevenLabs API for ${character}: "${text.substring(0, 50)}..."`)

    
    // Create cache key
    const cacheKey = `${character}:${text}`
    
    // Check cache first
    let audioUrl = this.audioCache.get(cacheKey)
    
    if (!audioUrl) {
      // Not in cache, fetch from API
      try {
        console.log(`TTS: Fetching from ElevenLabs API for ${character}`)
        const response = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${config.elevenLabsVoiceId}`,
          {
            method: 'POST',
            headers: {
              'Accept': 'audio/mpeg',
              'Content-Type': 'application/json',
              'xi-api-key': this.elevenLabsApiKey
            },
            body: JSON.stringify({
              text: processedText,
              model_id: 'eleven_monolingual_v1',
              voice_settings: {
                stability: config.stability,
                similarity_boost: config.similarityBoost,
                style: 0.5,
                use_speaker_boost: true
              }
            })
          }
        )

        if (!response.ok) {
          throw new Error(`ElevenLabs API error: ${response.status}`)
        }

        const audioBlob = await response.blob()
        audioUrl = URL.createObjectURL(audioBlob)
        
        // Cache the audio URL
        this.audioCache.set(cacheKey, audioUrl)
        console.log(`TTS: Cached audio for ${character} (cache size: ${this.audioCache.size})`)
      } catch (error) {
        console.error('ElevenLabs TTS error:', error)
        throw error
      }
    } else {
      console.log(`TTS: Using cached audio for ${character}`)
    }
    
    // Play the audio (cached or fresh)
    return new Promise((resolve, reject) => {
      const audio = new Audio(audioUrl)
      this.currentAudio = audio

      audio.onended = () => {
        this.currentAudio = null
        resolve()
      }

      audio.onerror = (error) => {
        this.currentAudio = null
        reject(error)
      }

      audio.play().catch(reject)
    })
  }

  private async speakWithBrowserTTS(text: string, character: GhostVoice): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth) {
        resolve()
        return
      }

      const config = VOICE_CONFIGS[character]
      const processedText = this.addEmotionalPauses(text, character)
      const utterance = new SpeechSynthesisUtterance(processedText)

      // Apply voice configuration
      utterance.pitch = config.pitch
      utterance.rate = config.rate
      utterance.volume = config.volume

      // Try to select appropriate voice
      if (this.voices.length > 0) {
        const femaleChars: GhostVoice[] = ['elara', 'mira', 'selene']
        const isFemale = femaleChars.includes(character)
        
        const preferredVoice = this.voices.find(voice => 
          isFemale 
            ? voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('woman')
            : voice.name.toLowerCase().includes('male') || voice.name.toLowerCase().includes('man')
        )

        if (preferredVoice) {
          utterance.voice = preferredVoice
        } else if (this.voices[0]) {
          utterance.voice = this.voices[0]
        }
      }

      utterance.onend = () => {
        this.currentUtterance = null
        resolve()
      }

      utterance.onerror = (error) => {
        console.error('Browser TTS error:', error)
        this.currentUtterance = null
        resolve()
      }

      this.currentUtterance = utterance
      this.synth.speak(utterance)
    })
  }

  private async processQueue(): Promise<void> {
    if (this.isSpeaking || this.speechQueue.length === 0) {
      return
    }

    this.isSpeaking = true
    const { text, character, resolve } = this.speechQueue.shift()!

    try {
      // Try ElevenLabs first if available
      if (this.useElevenLabs && this.elevenLabsApiKey) {
        await this.speakWithElevenLabs(text, character)
      } else {
        // Fallback to browser TTS
        await this.speakWithBrowserTTS(text, character)
      }
    } catch (error) {
      console.error('TTS error, falling back to browser TTS:', error)
      // Fallback to browser TTS on error
      if (this.useElevenLabs) {
        await this.speakWithBrowserTTS(text, character)
      }
    } finally {
      resolve()
      this.isSpeaking = false
      // Process next item in queue
      this.processQueue()
    }
  }

  async speak(text: string, character: GhostVoice = 'narrator'): Promise<void> {
    if (!this.enabled) {
      return
    }

    // Add to queue and process
    return new Promise((resolve) => {
      this.speechQueue.push({ text, character, resolve })
      this.processQueue()
    })
  }

  stop() {
    // Clear the queue
    this.speechQueue = []
    this.isSpeaking = false

    // Stop browser TTS
    if (this.synth) {
      this.synth.cancel()
      this.currentUtterance = null
    }

    // Stop ElevenLabs audio
    if (this.currentAudio) {
      this.currentAudio.pause()
      this.currentAudio = null
    }
  }

  toggle() {
    this.enabled = !this.enabled
    if (!this.enabled) {
      this.stop()
    }
    return this.enabled
  }

  isEnabled() {
    return this.enabled
  }

  isSupported() {
    return this.synth !== null || this.elevenLabsApiKey !== null
  }

  setUseElevenLabs(use: boolean) {
    this.useElevenLabs = use && this.elevenLabsApiKey !== null
  }
}

// Singleton instance
export const speechService = new SpeechService()

// Helper hook for React components
export function useSpeech() {
  const speak = (text: string, character: GhostVoice = 'narrator') => {
    return speechService.speak(text, character)
  }

  const stop = () => {
    speechService.stop()
  }

  const toggle = () => {
    return speechService.toggle()
  }

  const isEnabled = () => {
    return speechService.isEnabled()
  }

  return { speak, stop, toggle, isEnabled }
}
