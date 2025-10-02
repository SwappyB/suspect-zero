'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GameState, Note } from '@/data/types';
import { getPusherClient } from '@/lib/pusher';

interface MultiplayerGameContextType {
  gameState: GameState;
  roomId: string | null;
  isHost: boolean;
  isConnected: boolean;
  markEvidenceExamined: (evidenceId: string) => void;
  markSuspectExamined: (suspectId: string) => void;
  addNote: (content: string, linkedItems: string[], createdBy: 'player1' | 'player2') => void;
  deleteNote: (noteId: string) => void;
  useHint: () => boolean;
  setPlayerNames: (player1: string, player2: string) => void;
  startGame: () => void;
  solveGame: () => void;
  resetGame: () => void;
  createRoom: (playerName: string) => Promise<string>;
  joinRoom: (roomId: string, playerName: string) => Promise<boolean>;
  leaveRoom: () => void;
}

const MultiplayerGameContext = createContext<MultiplayerGameContextType | undefined>(undefined);

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

export function MultiplayerGameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isHost, setIsHost] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [pusherClient, setPusherClient] = useState<any>(null);

  // Initialize Pusher client on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const client = getPusherClient();
      if (client) {
        // Monitor connection state changes
        client.connection.bind('state_change', (states: any) => {
          console.log('Pusher state changed:', states.previous, '->', states.current);
        });

        client.connection.bind('connected', () => {
          console.log('✅ Pusher connected');
        });

        client.connection.bind('error', (err: any) => {
          console.error('❌ Pusher connection error:', err);
        });
      }
      setPusherClient(client);
    }
  }, []);

  // Subscribe to room updates when roomId changes
  useEffect(() => {
    if (!roomId) return;

    // Try to use Pusher if available
    if (pusherClient) {
      console.log(`📡 Subscribing to Pusher channel: room-${roomId}`);
      console.log('Pusher connection state:', pusherClient.connection.state);

      const channel = pusherClient.subscribe(`room-${roomId}`);

      // Log subscription success
      channel.bind('pusher:subscription_succeeded', () => {
        console.log('✅ Successfully subscribed to channel');
      });

      channel.bind('pusher:subscription_error', (error: any) => {
        console.error('❌ Subscription error:', error);
      });

      // Catch all events for debugging
      channel.bind_global((eventName: string, data: any) => {
        console.log('🔔 Event received:', eventName, data);
      });

      channel.bind('state-update', (data: { gameState: GameState }) => {
        console.log('🔄 State update received', data);
        setGameState(data.gameState);
      });

      channel.bind('player-joined', (data: { player2: string; gameState: GameState }) => {
        console.log('🎉 Player joined event received!', data);
        setGameState(data.gameState);
        setIsConnected(true);
      });

      setIsConnected(true);

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    } else {
      // Fallback: Poll for updates every 2 seconds if Pusher is not available
      const pollInterval = setInterval(async () => {
        try {
          const response = await fetch(`/api/room/sync?roomId=${roomId}`);
          if (response.ok) {
            const data = await response.json();
            setGameState(data.gameState);
            if (data.gameState.gameStarted && !isConnected) {
              setIsConnected(true);
            }
          }
        } catch (error) {
          console.error('Failed to poll for updates:', error);
        }
      }, 2000);

      return () => clearInterval(pollInterval);
    }
  }, [pusherClient, roomId]);

  // Sync state to server
  const syncState = async (newState: GameState) => {
    if (!roomId) {
      // Single player mode - use localStorage
      if (typeof window !== 'undefined' && newState.gameStarted) {
        localStorage.setItem('blackwood-mystery-state', JSON.stringify(newState));
      }
      return;
    }

    // Multiplayer mode - sync to server
    try {
      await fetch('/api/room/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, gameState: newState }),
      });
    } catch (error) {
      console.error('Failed to sync state:', error);
    }
  };

  const updateState = (updater: (prev: GameState) => GameState) => {
    setGameState(prev => {
      const newState = updater(prev);
      syncState(newState);
      return newState;
    });
  };

  const markEvidenceExamined = (evidenceId: string) => {
    updateState(prev => ({
      ...prev,
      examinedEvidence: prev.examinedEvidence.includes(evidenceId)
        ? prev.examinedEvidence
        : [...prev.examinedEvidence, evidenceId],
    }));
  };

  const markSuspectExamined = (suspectId: string) => {
    updateState(prev => ({
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
    updateState(prev => ({
      ...prev,
      notes: [...prev.notes, newNote],
    }));
  };

  const deleteNote = (noteId: string) => {
    updateState(prev => ({
      ...prev,
      notes: prev.notes.filter(note => note.id !== noteId),
    }));
  };

  const useHint = (): boolean => {
    if (gameState.hintsUsed >= gameState.maxHints) {
      return false;
    }
    updateState(prev => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1,
    }));
    return true;
  };

  const setPlayerNames = (player1: string, player2: string) => {
    updateState(prev => ({
      ...prev,
      playerNames: [player1, player2],
    }));
  };

  const startGame = () => {
    updateState(prev => ({
      ...prev,
      gameStarted: true,
    }));
  };

  const solveGame = () => {
    updateState(prev => ({
      ...prev,
      gameSolved: true,
    }));
  };

  const resetGame = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('blackwood-mystery-state');
    }
    setGameState(INITIAL_STATE);
    setRoomId(null);
    setIsHost(false);
    setIsConnected(false);
  };

  const createRoom = async (playerName: string): Promise<string> => {
    try {
      const response = await fetch('/api/room/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player1Name: playerName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setRoomId(data.roomId);
      setIsHost(true);
      setGameState(data.room.gameState);

      return data.roomId;
    } catch (error) {
      console.error('Failed to create room:', error);
      throw error;
    }
  };

  const joinRoom = async (roomCode: string, playerName: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/room/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId: roomCode, player2Name: playerName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setRoomId(roomCode);
      setIsHost(false);
      setGameState(data.room.gameState);
      setIsConnected(true);

      return true;
    } catch (error) {
      console.error('Failed to join room:', error);
      return false;
    }
  };

  const leaveRoom = () => {
    setRoomId(null);
    setIsHost(false);
    setIsConnected(false);
    setGameState(INITIAL_STATE);
  };

  return (
    <MultiplayerGameContext.Provider
      value={{
        gameState,
        roomId,
        isHost,
        isConnected,
        markEvidenceExamined,
        markSuspectExamined,
        addNote,
        deleteNote,
        useHint,
        setPlayerNames,
        startGame,
        solveGame,
        resetGame,
        createRoom,
        joinRoom,
        leaveRoom,
      }}
    >
      {children}
    </MultiplayerGameContext.Provider>
  );
}

export function useMultiplayerGame() {
  const context = useContext(MultiplayerGameContext);
  if (context === undefined) {
    throw new Error('useMultiplayerGame must be used within a MultiplayerGameProvider');
  }
  return context;
}
