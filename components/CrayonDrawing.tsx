'use client'

import { motion } from 'framer-motion'

export default function CrayonDrawing({ variant = 1 }: { variant?: number }) {
  const drawings = [
    // Drawing 1: Family holding hands
    <svg key="1" viewBox="0 0 400 300" style={{ width: '100%', height: '100%' }}>
      {/* Sky */}
      <rect x="0" y="0" width="400" height="200" fill="#87CEEB" opacity="0.3"/>
      
      {/* Sun */}
      <circle cx="350" cy="50" r="30" fill="#FFD700" opacity="0.8"/>
      <line x1="350" y1="20" x2="350" y2="5" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
      <line x1="380" y1="50" x2="395" y2="50" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
      <line x1="370" y1="30" x2="382" y2="18" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
      
      {/* Ground */}
      <rect x="0" y="200" width="400" height="100" fill="#90EE90" opacity="0.4"/>
      
      {/* Dad (left) */}
      <circle cx="120" cy="140" r="25" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="3"/>
      <rect x="105" y="165" width="30" height="50" fill="#4169E1" stroke="#000080" strokeWidth="2" rx="5"/>
      <line x1="105" y1="180" x2="85" y2="200" stroke="#4169E1" strokeWidth="4" strokeLinecap="round"/>
      <line x1="135" y1="180" x2="155" y2="200" stroke="#4169E1" strokeWidth="4" strokeLinecap="round"/>
      <line x1="105" y1="215" x2="105" y2="240" stroke="#000080" strokeWidth="4" strokeLinecap="round"/>
      <line x1="135" y1="215" x2="135" y2="240" stroke="#000080" strokeWidth="4" strokeLinecap="round"/>
      
      {/* Child (middle) */}
      <circle cx="200" cy="160" r="20" fill="#FFE4B5" stroke="#FFA500" strokeWidth="3"/>
      <rect x="188" y="180" width="24" height="35" fill="#FF69B4" stroke="#FF1493" strokeWidth="2" rx="4"/>
      <line x1="188" y1="195" x2="170" y2="210" stroke="#FF69B4" strokeWidth="3" strokeLinecap="round"/>
      <line x1="212" y1="195" x2="230" y2="210" stroke="#FF69B4" strokeWidth="3" strokeLinecap="round"/>
      <line x1="188" y1="215" x2="188" y2="235" stroke="#FF1493" strokeWidth="3" strokeLinecap="round"/>
      <line x1="212" y1="215" x2="212" y2="235" stroke="#FF1493" strokeWidth="3" strokeLinecap="round"/>
      
      {/* Mom (right) */}
      <circle cx="280" cy="140" r="25" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="3"/>
      <rect x="265" y="165" width="30" height="50" fill="#9370DB" stroke="#8B008B" strokeWidth="2" rx="5"/>
      <line x1="265" y1="180" x2="245" y2="200" stroke="#9370DB" strokeWidth="4" strokeLinecap="round"/>
      <line x1="295" y1="180" x2="315" y2="200" stroke="#9370DB" strokeWidth="4" strokeLinecap="round"/>
      <line x1="265" y1="215" x2="265" y2="240" stroke="#8B008B" strokeWidth="4" strokeLinecap="round"/>
      <line x1="295" y1="215" x2="295" y2="240" stroke="#8B008B" strokeWidth="4" strokeLinecap="round"/>
      
      {/* Holding hands */}
      <line x1="155" y1="200" x2="170" y2="210" stroke="#000" strokeWidth="3" strokeLinecap="round"/>
      <line x1="230" y1="210" x2="245" y2="200" stroke="#000" strokeWidth="3" strokeLinecap="round"/>
      
      {/* Hearts */}
      <text x="200" y="100" fontSize="30" fill="#FF1493" textAnchor="middle">♥</text>
      <text x="150" y="120" fontSize="24" fill="#FF69B4" textAnchor="middle">♥</text>
      <text x="250" y="120" fontSize="24" fill="#FF69B4" textAnchor="middle">♥</text>
      
      {/* Text */}
      <text x="200" y="280" fontSize="20" fill="#663399" textAnchor="middle" fontFamily="Comic Sans MS, cursive" fontWeight="bold">
        My Family!
      </text>
    </svg>,
    
    // Drawing 2: Family picnic
    <svg key="2" viewBox="0 0 400 300" style={{ width: '100%', height: '100%' }}>
      {/* Sky */}
      <rect x="0" y="0" width="400" height="180" fill="#B0E0E6" opacity="0.4"/>
      
      {/* Clouds */}
      <ellipse cx="80" cy="40" rx="30" ry="15" fill="#FFF" opacity="0.7"/>
      <ellipse cx="320" cy="60" rx="35" ry="18" fill="#FFF" opacity="0.7"/>
      
      {/* Ground */}
      <rect x="0" y="180" width="400" height="120" fill="#98FB98" opacity="0.5"/>
      
      {/* Tree */}
      <rect x="320" y="120" width="20" height="60" fill="#8B4513"/>
      <circle cx="330" cy="100" r="40" fill="#228B22" opacity="0.7"/>
      <circle cx="310" cy="90" r="35" fill="#32CD32" opacity="0.6"/>
      <circle cx="350" cy="95" r="35" fill="#00FF00" opacity="0.6"/>
      
      {/* Picnic blanket */}
      <rect x="100" y="200" width="150" height="80" fill="#FF6347" opacity="0.6" rx="5"/>
      <line x1="100" y1="220" x2="250" y2="220" stroke="#FFF" strokeWidth="2"/>
      <line x1="100" y1="240" x2="250" y2="240" stroke="#FFF" strokeWidth="2"/>
      <line x1="100" y1="260" x2="250" y2="260" stroke="#FFF" strokeWidth="2"/>
      <line x1="130" y1="200" x2="130" y2="280" stroke="#FFF" strokeWidth="2"/>
      <line x1="170" y1="200" x2="170" y2="280" stroke="#FFF" strokeWidth="2"/>
      <line x1="210" y1="200" x2="210" y2="280" stroke="#FFF" strokeWidth="2"/>
      
      {/* Family members sitting */}
      <circle cx="130" cy="190" r="18" fill="#FFE4B5" stroke="#FFA500" strokeWidth="2"/>
      <circle cx="175" cy="195" r="15" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2"/>
      <circle cx="220" cy="190" r="18" fill="#FFE4B5" stroke="#FFA500" strokeWidth="2"/>
      
      {/* Food */}
      <circle cx="175" cy="230" r="8" fill="#FF0000"/>
      <rect x="150" y="245" width="15" height="10" fill="#FFD700" rx="2"/>
      <rect x="185" y="245" width="15" height="10" fill="#FFD700" rx="2"/>
      
      {/* Flowers */}
      <circle cx="50" cy="250" r="8" fill="#FF69B4"/>
      <circle cx="45" cy="255" r="6" fill="#FFB6C1"/>
      <circle cx="55" cy="255" r="6" fill="#FF1493"/>
      <line x1="50" y1="258" x2="50" y2="275" stroke="#228B22" strokeWidth="2"/>
      
      <text x="200" y="290" fontSize="18" fill="#663399" textAnchor="middle" fontFamily="Comic Sans MS, cursive" fontWeight="bold">
        Fun Picnic Day!
      </text>
    </svg>,
    
    // Drawing 3: Bedtime story
    <svg key="3" viewBox="0 0 400 300" style={{ width: '100%', height: '100%' }}>
      {/* Night sky */}
      <rect x="0" y="0" width="400" height="300" fill="#191970" opacity="0.3"/>
      
      {/* Stars */}
      <text x="50" y="40" fontSize="20" fill="#FFD700">★</text>
      <text x="150" y="30" fontSize="16" fill="#FFD700">★</text>
      <text x="250" y="50" fontSize="18" fill="#FFD700">★</text>
      <text x="350" y="35" fontSize="20" fill="#FFD700">★</text>
      <text x="100" y="70" fontSize="14" fill="#FFD700">★</text>
      <text x="300" y="80" fontSize="16" fill="#FFD700">★</text>
      
      {/* Moon */}
      <circle cx="350" cy="60" r="25" fill="#FFFACD" opacity="0.9"/>
      
      {/* Bed */}
      <rect x="150" y="180" width="100" height="80" fill="#8B4513" opacity="0.6" rx="5"/>
      <rect x="140" y="200" width="120" height="60" fill="#4169E1" opacity="0.7" rx="3"/>
      
      {/* Child in bed */}
      <circle cx="200" cy="220" r="15" fill="#FFE4B5" stroke="#FFA500" strokeWidth="2"/>
      <rect x="185" y="235" width="30" height="25" fill="#87CEEB" opacity="0.8"/>
      
      {/* Parents reading */}
      <circle cx="120" cy="200" r="18" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2"/>
      <circle cx="280" cy="200" r="18" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2"/>
      
      {/* Book */}
      <rect x="180" y="190" width="40" height="30" fill="#FFD700" stroke="#FFA500" strokeWidth="2" rx="2"/>
      <line x1="200" y1="190" x2="200" y2="220" stroke="#FFA500" strokeWidth="2"/>
      
      {/* Hearts */}
      <text x="200" y="150" fontSize="24" fill="#FF69B4">♥</text>
      <text x="160" y="170" fontSize="18" fill="#FFB6C1">♥</text>
      <text x="240" y="170" fontSize="18" fill="#FFB6C1">♥</text>
      
      <text x="200" y="285" fontSize="18" fill="#FFD700" textAnchor="middle" fontFamily="Comic Sans MS, cursive" fontWeight="bold">
        Bedtime Stories ★
      </text>
    </svg>,
    
    // Drawing 4: Playing together
    <svg key="4" viewBox="0 0 400 300" style={{ width: '100%', height: '100%' }}>
      {/* Sky */}
      <rect x="0" y="0" width="400" height="200" fill="#87CEEB" opacity="0.3"/>
      
      {/* Sun */}
      <circle cx="80" cy="60" r="35" fill="#FFA500" opacity="0.8"/>
      
      {/* Ground */}
      <rect x="0" y="200" width="400" height="100" fill="#90EE90" opacity="0.4"/>
      
      {/* Ball */}
      <circle cx="200" cy="120" r="25" fill="#FF0000" opacity="0.8" stroke="#8B0000" strokeWidth="3"/>
      <circle cx="200" cy="120" r="25" fill="none" stroke="#FFF" strokeWidth="2" strokeDasharray="5,5"/>
      
      {/* Dad jumping */}
      <circle cx="280" cy="160" r="22" fill="#FFE4B5" stroke="#FFA500" strokeWidth="2"/>
      <rect x="268" y="182" width="24" height="40" fill="#4169E1" stroke="#000080" strokeWidth="2" rx="4"/>
      <line x1="268" y1="195" x2="250" y2="180" stroke="#4169E1" strokeWidth="3" strokeLinecap="round"/>
      <line x1="292" y1="195" x2="310" y2="180" stroke="#4169E1" strokeWidth="3" strokeLinecap="round"/>
      
      {/* Child running */}
      <circle cx="120" cy="180" r="18" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="2"/>
      <rect x="108" y="198" width="24" height="35" fill="#FF69B4" stroke="#FF1493" strokeWidth="2" rx="4"/>
      <line x1="108" y1="210" x2="90" y2="225" stroke="#FF69B4" strokeWidth="3" strokeLinecap="round"/>
      <line x1="132" y1="210" x2="150" y2="195" stroke="#FF69B4" strokeWidth="3" strokeLinecap="round"/>
      
      {/* Mom cheering */}
      <circle cx="320" cy="200" r="20" fill="#FFE4B5" stroke="#FFA500" strokeWidth="2"/>
      <rect x="308" y="220" width="24" height="40" fill="#9370DB" stroke="#8B008B" strokeWidth="2" rx="4"/>
      <line x1="308" y1="230" x2="290" y2="215" stroke="#9370DB" strokeWidth="3" strokeLinecap="round"/>
      <line x1="332" y1="230" x2="350" y2="215" stroke="#9370DB" strokeWidth="3" strokeLinecap="round"/>
      
      {/* Flowers */}
      <circle cx="40" cy="240" r="6" fill="#FF1493"/>
      <circle cx="360" cy="245" r="6" fill="#FFD700"/>
      
      {/* Motion lines */}
      <line x1="170" y1="125" x2="150" y2="130" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      <line x1="230" y1="125" x2="250" y2="130" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      
      <text x="200" y="285" fontSize="18" fill="#663399" textAnchor="middle" fontFamily="Comic Sans MS, cursive" fontWeight="bold">
        Playing Ball!
      </text>
    </svg>,
    
    // Drawing 5: Group hug
    <svg key="5" viewBox="0 0 400 300" style={{ width: '100%', height: '100%' }}>
      {/* Background */}
      <rect x="0" y="0" width="400" height="300" fill="#FFE4E1" opacity="0.3"/>
      
      {/* Rainbow */}
      <path d="M 50 200 Q 200 50 350 200" fill="none" stroke="#FF0000" strokeWidth="8" opacity="0.6"/>
      <path d="M 60 200 Q 200 60 340 200" fill="none" stroke="#FFA500" strokeWidth="8" opacity="0.6"/>
      <path d="M 70 200 Q 200 70 330 200" fill="none" stroke="#FFD700" strokeWidth="8" opacity="0.6"/>
      <path d="M 80 200 Q 200 80 320 200" fill="none" stroke="#00FF00" strokeWidth="8" opacity="0.6"/>
      <path d="M 90 200 Q 200 90 310 200" fill="none" stroke="#0000FF" strokeWidth="8" opacity="0.6"/>
      <path d="M 100 200 Q 200 100 300 200" fill="none" stroke="#9370DB" strokeWidth="8" opacity="0.6"/>
      
      {/* Ground */}
      <rect x="0" y="220" width="400" height="80" fill="#90EE90" opacity="0.4"/>
      
      {/* Family group hug (overlapping) */}
      <circle cx="180" cy="180" r="25" fill="#FFE4B5" stroke="#FFA500" strokeWidth="3"/>
      <rect x="165" y="205" width="30" height="45" fill="#4169E1" stroke="#000080" strokeWidth="2" rx="5"/>
      
      <circle cx="220" cy="180" r="25" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="3"/>
      <rect x="205" y="205" width="30" height="45" fill="#9370DB" stroke="#8B008B" strokeWidth="2" rx="5"/>
      
      <circle cx="200" cy="200" r="20" fill="#FFE4B5" stroke="#FFA500" strokeWidth="3"/>
      <rect x="188" y="220" width="24" height="35" fill="#FF69B4" stroke="#FF1493" strokeWidth="2" rx="4"/>
      
      {/* Arms hugging */}
      <line x1="165" y1="220" x2="188" y2="230" stroke="#4169E1" strokeWidth="4" strokeLinecap="round"/>
      <line x1="235" y1="220" x2="212" y2="230" stroke="#9370DB" strokeWidth="4" strokeLinecap="round"/>
      
      {/* Hearts everywhere */}
      <text x="200" y="140" fontSize="32" fill="#FF1493">♥</text>
      <text x="150" y="160" fontSize="24" fill="#FF69B4">♥</text>
      <text x="250" y="160" fontSize="24" fill="#FF69B4">♥</text>
      <text x="170" y="120" fontSize="20" fill="#FFB6C1">♥</text>
      <text x="230" y="120" fontSize="20" fill="#FFB6C1">♥</text>
      <text x="120" y="180" fontSize="18" fill="#FF1493">♥</text>
      <text x="280" y="180" fontSize="18" fill="#FF1493">♥</text>
      
      {/* Flowers */}
      <circle cx="60" cy="260" r="8" fill="#FF69B4"/>
      <circle cx="340" cy="265" r="8" fill="#FFD700"/>
      <circle cx="100" cy="270" r="6" fill="#FF1493"/>
      <circle cx="300" cy="270" r="6" fill="#FFA500"/>
      
      <text x="200" y="290" fontSize="20" fill="#663399" textAnchor="middle" fontFamily="Comic Sans MS, cursive" fontWeight="bold">
        Family Love Forever! ♥
      </text>
    </svg>
  ];

  return (
    <motion.div
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', duration: 0.8 }}
      style={{
        width: '100%',
        height: '100%',
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        border: '5px solid #FFD700'
      }}
    >
      {drawings[variant - 1]}
    </motion.div>
  );
}
