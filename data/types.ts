export interface Suspect {
  id: string;
  name: string;
  age: number;
  occupation: string;
  relationship: string;
  description: string;
  motive: string;
  alibi: string;
  imageUrl: string;
  interview: {
    question: string;
    answer: string;
  }[];
  secrets: string[];
}

export interface Evidence {
  id: string;
  title: string;
  category: 'document' | 'forensic' | 'personal' | 'physical' | 'digital';
  description: string;
  content: string;
  imageUrl?: string;
  linkedTo: string[]; // IDs of suspects or other evidence
  importance: 'high' | 'medium' | 'low';
  redHerring: boolean;
}

export interface Mystery {
  title: string;
  setting: string;
  victim: {
    name: string;
    age: number;
    occupation: string;
    background: string;
  };
  synopsis: string;
  timeOfDeath: string;
  causeOfDeath: string;
  suspects: Suspect[];
  evidence: Evidence[];
  solution: {
    killer: string;
    motive: string;
    method: string;
    explanation: string;
  };
  hints: string[];
}

export interface GameState {
  examinedEvidence: string[];
  examinedSuspects: string[];
  notes: Note[];
  hintsUsed: number;
  maxHints: number;
  playerNames: [string, string];
  gameStarted: boolean;
  gameSolved: boolean;
}

export interface Note {
  id: string;
  content: string;
  linkedItems: string[];
  createdBy: 'player1' | 'player2';
  timestamp: number;
}
