'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMultiplayerGame } from '@/context/MultiplayerGameContext';
import { blackwoodMystery } from '@/data/mystery';
import Link from 'next/link';

export default function GameHub() {
  const router = useRouter();
  const { gameState, roomId, isConnected } = useMultiplayerGame();

  useEffect(() => {
    if (!gameState.gameStarted) {
      router.push('/');
    }
  }, [gameState.gameStarted, router]);

  if (!gameState.gameStarted) {
    return null;
  }

  const evidenceProgress = (gameState.examinedEvidence.length / blackwoodMystery.evidence.length) * 100;
  const suspectProgress = (gameState.examinedSuspects.length / blackwoodMystery.suspects.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-amber-500 mb-2">Investigation Hub</h1>
              <p className="text-gray-400">
                Detectives: {gameState.playerNames[0]} & {gameState.playerNames[1]}
              </p>
              {roomId && (
                <p className="text-sm text-green-400 mt-1">
                  🌐 Online • Room: {roomId}
                </p>
              )}
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors"
            >
              ← Back to Menu
            </Link>
          </div>

          {/* Progress Overview */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Evidence Examined</span>
                <span className="text-amber-400 font-semibold">
                  {gameState.examinedEvidence.length}/{blackwoodMystery.evidence.length}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full transition-all"
                  style={{ width: `${evidenceProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Suspects Interviewed</span>
                <span className="text-amber-400 font-semibold">
                  {gameState.examinedSuspects.length}/{blackwoodMystery.suspects.length}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full transition-all"
                  style={{ width: `${suspectProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Hints Remaining</span>
                <span className="text-amber-400 font-semibold">
                  {gameState.maxHints - gameState.hintsUsed}/{gameState.maxHints}
                </span>
              </div>
              <div className="flex gap-1 mt-2">
                {Array.from({ length: gameState.maxHints }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded ${
                      i < gameState.maxHints - gameState.hintsUsed
                        ? 'bg-amber-500'
                        : 'bg-gray-700'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Case Summary */}
        <div className="bg-gray-800 border-2 border-amber-700 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-amber-400">Case Summary</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-300">The Victim</h3>
              <p className="text-amber-300 font-semibold">{blackwoodMystery.victim.name}</p>
              <p className="text-sm text-gray-400 mb-2">{blackwoodMystery.victim.occupation}</p>
              <p className="text-sm text-gray-300">{blackwoodMystery.victim.background}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-300">The Crime</h3>
              <p className="text-sm text-gray-400 mb-1">
                <span className="text-amber-400">Time:</span> {blackwoodMystery.timeOfDeath}
              </p>
              <p className="text-sm text-gray-400 mb-1">
                <span className="text-amber-400">Cause:</span> {blackwoodMystery.causeOfDeath}
              </p>
              <p className="text-sm text-gray-400">
                <span className="text-amber-400">Location:</span> {blackwoodMystery.setting}
              </p>
            </div>
          </div>
        </div>

        {/* Main Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Evidence Vault */}
          <Link href="/game/evidence">
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-blue-700 hover:border-blue-500 h-full">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">Evidence Vault</h3>
              <p className="text-blue-200 mb-4">
                Examine forensic reports, documents, and physical evidence
              </p>
              <div className="text-sm text-blue-300">
                {gameState.examinedEvidence.length} of {blackwoodMystery.evidence.length} items examined
              </div>
            </div>
          </Link>

          {/* Suspect Interviews */}
          <Link href="/game/suspects">
            <div className="bg-gradient-to-br from-red-900 to-red-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-red-700 hover:border-red-500 h-full">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-2xl font-bold mb-2">Suspects</h3>
              <p className="text-red-200 mb-4">
                Review profiles, alibis, and interview transcripts
              </p>
              <div className="text-sm text-red-300">
                {gameState.examinedSuspects.length} of {blackwoodMystery.suspects.length} suspects interviewed
              </div>
            </div>
          </Link>

          {/* Investigation Notes */}
          <Link href="/game/notes">
            <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-purple-700 hover:border-purple-500 h-full">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-2xl font-bold mb-2">Investigation Notes</h3>
              <p className="text-purple-200 mb-4">
                Collaborate and cross-reference clues with your partner
              </p>
              <div className="text-sm text-purple-300">
                {gameState.notes.length} notes recorded
              </div>
            </div>
          </Link>

          {/* Hints */}
          <Link href="/game/hints">
            <div className="bg-gradient-to-br from-yellow-900 to-yellow-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-yellow-700 hover:border-yellow-500 h-full">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-2xl font-bold mb-2">Hints</h3>
              <p className="text-yellow-200 mb-4">
                Need help? Use one of your limited hints
              </p>
              <div className="text-sm text-yellow-300">
                {gameState.maxHints - gameState.hintsUsed} hints remaining
              </div>
            </div>
          </Link>

          {/* Timeline */}
          <Link href="/game/timeline">
            <div className="bg-gradient-to-br from-green-900 to-green-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-green-700 hover:border-green-500 h-full">
              <div className="text-5xl mb-4">⏰</div>
              <h3 className="text-2xl font-bold mb-2">Timeline</h3>
              <p className="text-green-200 mb-4">
                Piece together the sequence of events
              </p>
              <div className="text-sm text-green-300">
                Chronological evidence analysis
              </div>
            </div>
          </Link>

          {/* Submit Solution */}
          <Link href="/game/solution">
            <div className="bg-gradient-to-br from-amber-900 to-amber-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-amber-700 hover:border-amber-500 h-full">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="text-2xl font-bold mb-2">Submit Solution</h3>
              <p className="text-amber-200 mb-4">
                Ready to name the killer? Submit your conclusion
              </p>
              <div className="text-sm text-amber-300">
                {gameState.gameSolved ? 'Case solved!' : 'Solve the mystery'}
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Tips */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-amber-400">💡 Detective Tips</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Pay close attention to timelines and who was where when</li>
            <li>• Not all evidence is equally important - some are red herrings</li>
            <li>• Cross-reference suspect statements with physical evidence</li>
            <li>• Use the notes feature to collaborate and track connections</li>
            <li>• Consider motive, means, and opportunity for each suspect</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
