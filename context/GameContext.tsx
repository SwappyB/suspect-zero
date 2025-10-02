'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GameState, Note } from '@/data/types';

interface GameContextType {
  gameState: GameState;
  markEvidenceExamined: (evidenceId: string) => void;
  markSuspectExamined: (suspectId: string) => void;
  addNote: (content: string, linkedItems: string[], createdBy: 'player1' | 'player2') => void;
  deleteNote: (noteId: string) => void;
  useHint: () => boolean;
  setPlayerNames: (player1: string, player2: string) => void;
  startGame: () => void;
  solveGame: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const INITIAL_STATE: GameState = {
  examinedEvidence: [],
  examinedSuspects: [],
  notes: [],
  hintsUsed: 0,
  maxHints: 3,
  playerNames: ['Player 1', 'Player 2'],
  gameStarted: false,
  gameSolved: false,
};

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);

  // Load game state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('blackwood-mystery-state');
      if (saved) {
        try {
          setGameState(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to load game state:', e);
        }
      }
    }
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && gameState.gameStarted) {
      localStorage.setItem('blackwood-mystery-state', JSON.stringify(gameState));
    }
  }, [gameState]);

  const markEvidenceExamined = (evidenceId: string) => {
    setGameState(prev => ({
      ...prev,
      examinedEvidence: prev.examinedEvidence.includes(evidenceId)
        ? prev.examinedEvidence
        : [...prev.examinedEvidence, evidenceId],
    }));
  };

  const markSuspectExamined = (suspectId: string) => {
    setGameState(prev => ({
      ...prev,
      examinedSuspects: prev.examinedSuspects.includes(suspectId)
        ? prev.examinedSuspects
        : [...prev.examinedSuspects, suspectId],
    }));
  };

  const addNote = (content: string, linkedItems: string[], createdBy: 'player1' | 'player2') => {
    const newNote: Note = {
      id: `note_${Date.now()}`,
      content,
      linkedItems,
      createdBy,
      timestamp: Date.now(),
    };
    setGameState(prev => ({
      ...prev,
      notes: [...prev.notes, newNote],
    }));
  };

  const deleteNote = (noteId: string) => {
    setGameState(prev => ({
      ...prev,
      notes: prev.notes.filter(note => note.id !== noteId),
    }));
  };

  const useHint = (): boolean => {
    if (gameState.hintsUsed >= gameState.maxHints) {
      return false;
    }
    setGameState(prev => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1,
    }));
    return true;
  };

  const setPlayerNames = (player1: string, player2: string) => {
    setGameState(prev => ({
      ...prev,
      playerNames: [player1, player2],
    }));
  };

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      gameStarted: true,
    }));
  };

  const solveGame = () => {
    setGameState(prev => ({
      ...prev,
      gameSolved: true,
    }));
  };

  const resetGame = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('blackwood-mystery-state');
    }
    setGameState(INITIAL_STATE);
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        markEvidenceExamined,
        markSuspectExamined,
        addNote,
        deleteNote,
        useHint,
        setPlayerNames,
        startGame,
        solveGame,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
