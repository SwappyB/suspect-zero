'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMultiplayerGame } from '@/context/MultiplayerGameContext';
import { blackwoodMystery } from '@/data/mystery';

export default function Home() {
  const router = useRouter();
  const { createRoom, joinRoom, gameState } = useMultiplayerGame();
  const [mode, setMode] = useState<'select' | 'create' | 'join'>('select');
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [generatedRoomCode, setGeneratedRoomCode] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateRoom = async () => {
    if (!playerName.trim()) return;

    setLoading(true);
    setError('');

    try {
      const roomId = await createRoom(playerName.trim());
      setGeneratedRoomCode(roomId);
    } catch (err) {
      setError('Failed to create room. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!playerName.trim() || !roomCode.trim()) return;

    setLoading(true);
    setError('');

    try {
      const success = await joinRoom(roomCode.trim().toUpperCase(), playerName.trim());
      if (success) {
        router.push('/game');
      } else {
        setError('Failed to join room. Please check the room code.');
      }
    } catch (err) {
      setError('Failed to join room. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartGame = () => {
    router.push('/game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 text-amber-500 tracking-wider">
            {blackwoodMystery.title}
          </h1>
          <p className="text-xl text-gray-400 italic">
            A Murder Mystery for Two Detectives
          </p>
          <div className="mt-6 h-1 w-32 bg-amber-600 mx-auto"></div>
        </div>

        {/* Story Preview */}
        <div className="bg-gray-800 border-2 border-amber-700 rounded-lg p-8 mb-8 shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4 text-amber-400">The Case</h2>
          <p className="text-gray-300 mb-4 leading-relaxed">
            {blackwoodMystery.synopsis}
          </p>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-900 p-4 rounded border border-amber-900">
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Victim</p>
              <p className="text-lg font-semibold text-amber-300">{blackwoodMystery.victim.name}</p>
              <p className="text-sm text-gray-400">{blackwoodMystery.victim.occupation}</p>
            </div>
            <div className="bg-gray-900 p-4 rounded border border-amber-900">
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">Time of Death</p>
              <p className="text-lg font-semibold text-amber-300">{blackwoodMystery.timeOfDeath}</p>
              <p className="text-sm text-gray-400">{blackwoodMystery.causeOfDeath}</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="font-semibold text-lg mb-2 text-amber-400">20 Evidence Items</h3>
            <p className="text-sm text-gray-400">Documents, forensic reports, and personal artifacts</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="font-semibold text-lg mb-2 text-amber-400">5 Suspects</h3>
            <p className="text-sm text-gray-400">Each with motives, alibis, and dark secrets</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="text-3xl mb-3">🌐</div>
            <h3 className="font-semibold text-lg mb-2 text-amber-400">Online Multiplayer</h3>
            <p className="text-sm text-gray-400">Play with a friend from anywhere</p>
          </div>
        </div>

        {/* Instructions Toggle */}
        <div className="mb-8">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="w-full bg-gray-800 hover:bg-gray-700 p-4 rounded-lg border border-gray-700 transition-colors flex items-center justify-between"
          >
            <span className="font-semibold text-amber-400">How to Play</span>
            <span className="text-2xl">{showInstructions ? '−' : '+'}</span>
          </button>
          {showInstructions && (
            <div className="mt-4 bg-gray-900 p-6 rounded-lg border border-gray-700 space-y-4">
              <div>
                <h4 className="font-semibold text-amber-400 mb-2">🎯 Objective</h4>
                <p className="text-gray-300">Work together to identify the killer, their motive, and method by examining all evidence and suspect interviews.</p>
              </div>
              <div>
                <h4 className="font-semibold text-amber-400 mb-2">🌐 Multiplayer</h4>
                <p className="text-gray-300">One player creates a room and shares the code with their partner. The second player joins using that code. Both players can investigate together in real-time!</p>
              </div>
              <div>
                <h4 className="font-semibold text-amber-400 mb-2">🔎 Investigation</h4>
                <p className="text-gray-300">Access all evidence from the start. Cross-reference clues, take notes, and collaborate with your partner to piece together the truth.</p>
              </div>
            </div>
          )}
        </div>

        {/* Mode Selection / Room Management */}
        {mode === 'select' && (
          <div className="bg-gradient-to-r from-amber-900 to-amber-800 p-8 rounded-lg shadow-2xl border-2 border-amber-700">
            <h3 className="text-2xl font-semibold mb-6 text-center">Begin Your Investigation</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setMode('create')}
                className="bg-green-700 hover:bg-green-600 text-white font-semibold px-8 py-6 rounded-lg transition-colors"
              >
                <div className="text-4xl mb-2">🎮</div>
                <div className="text-lg">Create Room</div>
                <div className="text-sm opacity-80 mt-1">Start a new game</div>
              </button>
              <button
                onClick={() => setMode('join')}
                className="bg-blue-700 hover:bg-blue-600 text-white font-semibold px-8 py-6 rounded-lg transition-colors"
              >
                <div className="text-4xl mb-2">🚪</div>
                <div className="text-lg">Join Room</div>
                <div className="text-sm opacity-80 mt-1">Enter room code</div>
              </button>
            </div>
          </div>
        )}

        {/* Create Room */}
        {mode === 'create' && !generatedRoomCode && (
          <div className="bg-gradient-to-r from-green-900 to-green-800 p-8 rounded-lg shadow-2xl border-2 border-green-700">
            <h3 className="text-2xl font-semibold mb-6 text-center">Create Investigation Room</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Your Detective Name
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 text-white"
                />
              </div>
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded text-red-200 text-sm">
                {error}
              </div>
            )}
            <div className="flex gap-4">
              <button
                onClick={() => setMode('select')}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleCreateRoom}
                disabled={!playerName.trim() || loading}
                className="flex-1 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                {loading ? 'Creating...' : 'Create Room'}
              </button>
            </div>
          </div>
        )}

        {/* Waiting Room */}
        {mode === 'create' && generatedRoomCode && (
          <div className="bg-gradient-to-r from-green-900 to-green-800 p-8 rounded-lg shadow-2xl border-2 border-green-700">
            <h3 className="text-2xl font-semibold mb-4 text-center">Room Created!</h3>
            <div className="bg-gray-900 p-6 rounded-lg border border-green-700 mb-6">
              <p className="text-sm text-gray-400 mb-2 text-center">Share this code with your partner:</p>
              <div className="text-4xl font-bold text-green-400 text-center tracking-widest mb-4">
                {generatedRoomCode}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(generatedRoomCode)}
                className="w-full bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
              >
                📋 Copy Code
              </button>
            </div>
            <div className="text-center mb-6">
              {gameState.gameStarted ? (
                <div>
                  <p className="text-green-400 font-semibold mb-4">
                    ✓ {gameState.playerNames[1]} has joined!
                  </p>
                  <button
                    onClick={handleStartGame}
                    className="bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                  >
                    Start Investigation
                  </button>
                </div>
              ) : (
                <p className="text-gray-300 animate-pulse">
                  Waiting for partner to join...
                </p>
              )}
            </div>
          </div>
        )}

        {/* Join Room */}
        {mode === 'join' && (
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-8 rounded-lg shadow-2xl border-2 border-blue-700">
            <h3 className="text-2xl font-semibold mb-6 text-center">Join Investigation Room</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Your Detective Name
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Room Code
                </label>
                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  placeholder="Enter 6-character code"
                  maxLength={6}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white text-center text-2xl tracking-widest"
                />
              </div>
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded text-red-200 text-sm">
                {error}
              </div>
            )}
            <div className="flex gap-4">
              <button
                onClick={() => setMode('select')}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleJoinRoom}
                disabled={!playerName.trim() || !roomCode.trim() || loading}
                className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                {loading ? 'Joining...' : 'Join Room'}
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>A collaborative online murder mystery experience</p>
          <p className="mt-2">Estimated play time: 60-90 minutes</p>
        </div>
      </div>
    </div>
  );
}
