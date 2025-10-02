'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGame } from '@/context/GameContext';
import { blackwoodMystery } from '@/data/mystery';

export default function Home() {
  const router = useRouter();
  const { setPlayerNames, startGame, gameState } = useGame();
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);

  const handleStart = () => {
    if (player1.trim() && player2.trim()) {
      setPlayerNames(player1.trim(), player2.trim());
      startGame();
      router.push('/game');
    }
  };

  const handleContinue = () => {
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
            <div className="text-3xl mb-3">💡</div>
            <h3 className="font-semibold text-lg mb-2 text-amber-400">3 Hints Available</h3>
            <p className="text-sm text-gray-400">Use wisely to crack the case</p>
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
                <h4 className="font-semibold text-amber-400 mb-2">🔎 Investigation</h4>
                <p className="text-gray-300">Access all evidence from the start. Cross-reference clues, take notes, and collaborate with your partner to piece together the truth.</p>
              </div>
              <div>
                <h4 className="font-semibold text-amber-400 mb-2">📝 Collaboration</h4>
                <p className="text-gray-300">Share insights using the built-in note system. Each player can track their deductions and link evidence together.</p>
              </div>
              <div>
                <h4 className="font-semibold text-amber-400 mb-2">⚠️ Difficulty</h4>
                <p className="text-gray-300">Moderate challenge with red herrings and multiple suspects. Pay attention to timelines, motives, and opportunities.</p>
              </div>
              <div>
                <h4 className="font-semibold text-amber-400 mb-2">✅ Solution</h4>
                <p className="text-gray-300">When ready, submit your solution identifying the killer, motive, and method. You can view the full explanation after submitting.</p>
              </div>
            </div>
          )}
        </div>

        {/* Player Setup or Continue */}
        {gameState.gameStarted ? (
          <div className="bg-gradient-to-r from-green-900 to-green-800 p-8 rounded-lg shadow-2xl text-center border-2 border-green-700">
            <h3 className="text-2xl font-semibold mb-4">Investigation in Progress</h3>
            <p className="text-gray-300 mb-2">Players: {gameState.playerNames[0]} & {gameState.playerNames[1]}</p>
            <p className="text-sm text-gray-400 mb-6">
              Evidence examined: {gameState.examinedEvidence.length}/20 |
              Hints used: {gameState.hintsUsed}/{gameState.maxHints}
            </p>
            <button
              onClick={handleContinue}
              className="bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Continue Investigation
            </button>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-amber-900 to-amber-800 p-8 rounded-lg shadow-2xl border-2 border-amber-700">
            <h3 className="text-2xl font-semibold mb-6 text-center">Begin Your Investigation</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Detective 1 Name
                </label>
                <input
                  type="text"
                  value={player1}
                  onChange={(e) => setPlayer1(e.target.value)}
                  placeholder="Enter first detective's name"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Detective 2 Name
                </label>
                <input
                  type="text"
                  value={player2}
                  onChange={(e) => setPlayer2(e.target.value)}
                  placeholder="Enter second detective's name"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-500 text-white"
                />
              </div>
            </div>
            <button
              onClick={handleStart}
              disabled={!player1.trim() || !player2.trim()}
              className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
            >
              Start Investigation
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>A collaborative murder mystery experience</p>
          <p className="mt-2">Estimated play time: 60-90 minutes</p>
        </div>
      </div>
    </div>
  );
}
