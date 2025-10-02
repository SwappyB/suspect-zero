'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMultiplayerGame } from '@/context/MultiplayerGameContext';
import { blackwoodMystery } from '@/data/mystery';

export default function RevealPage() {
  const router = useRouter();
  const { gameState, resetGame } = useMultiplayerGame();

  const killer = blackwoodMystery.suspects.find(
    s => s.name === blackwoodMystery.solution.killer
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-amber-500 mb-4">The Solution Revealed</h1>
          <p className="text-xl text-gray-400">The Truth Behind the Blackwood Estate Murder</p>
          <div className="mt-6 h-1 w-32 bg-amber-600 mx-auto"></div>
        </div>

        {/* The Killer */}
        <div className="bg-gradient-to-r from-red-900 to-red-800 border-4 border-red-600 rounded-lg p-8 mb-8 shadow-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-200 mb-4">THE KILLER</h2>
            <div className="text-7xl mb-4">⚖️</div>
            <h3 className="text-4xl font-bold text-white mb-2">{killer?.name}</h3>
            <p className="text-xl text-red-200">{killer?.occupation}</p>
          </div>
        </div>

        {/* Solution Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 border-2 border-amber-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-amber-400 mb-3">🎯 MOTIVE</h3>
            <p className="text-gray-200">{blackwoodMystery.solution.motive}</p>
          </div>
          <div className="bg-gray-800 border-2 border-amber-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-amber-400 mb-3">🔪 METHOD</h3>
            <p className="text-gray-200">{blackwoodMystery.solution.method}</p>
          </div>
          <div className="bg-gray-800 border-2 border-amber-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-amber-400 mb-3">⏰ OPPORTUNITY</h3>
            <p className="text-gray-200">10:30 PM when delivering champagne to the gallery</p>
          </div>
        </div>

        {/* Detailed Explanation */}
        <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-amber-400 mb-6">Complete Explanation</h2>
          <div className="prose prose-invert max-w-none">
            <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">
              {blackwoodMystery.solution.explanation}
            </div>
          </div>
        </div>

        {/* Key Evidence */}
        <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-amber-400 mb-6">Critical Evidence</h2>
          <div className="space-y-4">
            <div className="bg-gray-900 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-400 mb-2">✓ Edmund's Journal (Evidence #6)</h4>
              <p className="text-gray-300 text-sm">
                His journal clearly shows desperation and contemplation of murder. The entry on October 15th
                reveals he had decided "what he must do" and mentions the old darkroom.
              </p>
            </div>

            <div className="bg-gray-900 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-400 mb-2">✓ Darkroom Chemicals (Evidence #14)</h4>
              <p className="text-gray-300 text-sm">
                The cyanide bottle shows recent disturbance. Edmund had keys to all rooms and access to this poison.
                Approximately 50 grams were missing - a lethal dose.
              </p>
            </div>

            <div className="bg-gray-900 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-400 mb-2">✓ Champagne Delivery (Evidence #7)</h4>
              <p className="text-gray-300 text-sm">
                Edmund delivered the champagne at Victor's request at 10:30 PM. He had the perfect opportunity
                to poison the glass before Victor poured his drink.
              </p>
            </div>

            <div className="bg-gray-900 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-400 mb-2">✓ Security System Sabotage (Evidence #13)</h4>
              <p className="text-gray-300 text-sm">
                Fiber evidence from Edmund's uniform was found on the breaker switch. He disabled the cameras
                at 10:49 PM to create confusion and suggest someone else used the blackout to commit murder.
              </p>
            </div>

            <div className="bg-gray-900 border-l-4 border-green-500 p-4 rounded">
              <h4 className="font-semibold text-green-400 mb-2">✓ Financial Desperation (Evidence #19)</h4>
              <p className="text-gray-300 text-sm">
                $47,000 in gambling debts and threats from creditors. Edmund had been stealing wine to pay debts,
                and Victor's discovery meant prison time for a 67-year-old man.
              </p>
            </div>
          </div>
        </div>

        {/* Red Herrings */}
        <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-amber-400 mb-6">Red Herrings Explained</h2>
          <div className="space-y-4">
            <div className="bg-gray-900 border-l-4 border-yellow-600 p-4 rounded">
              <h4 className="font-semibold text-yellow-400 mb-2">Margaret's Mysterious Texts</h4>
              <p className="text-gray-300 text-sm">
                Margaret was planning something but couldn't go through with it. Her "It's done" text and the
                burner phone messages suggest she may have hired someone to kill Victor, but that person
                acted independently (Edmund). Margaret is guilty of conspiracy but not murder.
              </p>
            </div>

            <div className="bg-gray-900 border-l-4 border-yellow-600 p-4 rounded">
              <h4 className="font-semibold text-yellow-400 mb-2">Sophia's Gallery Visit</h4>
              <p className="text-gray-300 text-sm">
                Sophia did visit the gallery at 10:42 PM as planned, but her father wasn't there yet (he entered
                at 10:35 PM per logs, but may have stepped out). She left at 10:46 PM, before the murder occurred.
                Her art restoration chemicals could theoretically produce cyanide, but she didn't use them.
              </p>
            </div>

            <div className="bg-gray-900 border-l-4 border-yellow-600 p-4 rounded">
              <h4 className="font-semibold text-yellow-400 mb-2">Isabella's Poisoned Wine</h4>
              <p className="text-gray-300 text-sm">
                Isabella did bring poisoned wine containing aconite, intending to kill Victor slowly over days.
                However, it was never opened. This was a separate murder plot that never came to fruition.
              </p>
            </div>

            <div className="bg-gray-900 border-l-4 border-yellow-600 p-4 rounded">
              <h4 className="font-semibold text-yellow-400 mb-2">James Thornton's Missing Time</h4>
              <p className="text-gray-300 text-sm">
                The corrupted security footage during James's claimed terrace time is suspicious, and he does
                have cyanide in his car. However, he had no access to Victor's champagne glass. The camera
                blackout was Edmund's doing, not James's.
              </p>
            </div>
          </div>
        </div>

        {/* Game Stats */}
        {gameState.gameSolved && (
          <div className="bg-gradient-to-r from-green-900 to-green-800 border-2 border-green-700 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-green-400 mb-4 text-center">
              Investigation Complete!
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-sm text-green-300 mb-1">Evidence Examined</p>
                <p className="text-3xl font-bold text-white">
                  {gameState.examinedEvidence.length}/{blackwoodMystery.evidence.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-green-300 mb-1">Suspects Interviewed</p>
                <p className="text-3xl font-bold text-white">
                  {gameState.examinedSuspects.length}/{blackwoodMystery.suspects.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-green-300 mb-1">Hints Used</p>
                <p className="text-3xl font-bold text-white">
                  {gameState.hintsUsed}/{gameState.maxHints}
                </p>
              </div>
            </div>
            <p className="text-center text-green-200 mt-6">
              Detectives {gameState.playerNames[0]} & {gameState.playerNames[1]} - Case Closed
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 justify-center mb-8">
          <Link
            href="/game"
            className="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Return to Hub
          </Link>
          <Link
            href="/"
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Main Menu
          </Link>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to start a new investigation? All progress will be lost.')) {
                resetGame();
                router.push('/');
              }
            }}
            className="bg-red-700 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            New Investigation
          </button>
        </div>

        {/* Credits */}
        <div className="text-center text-gray-500 text-sm">
          <p className="mb-2">Thank you for playing The Blackwood Estate Murder</p>
          <p>More mysteries coming soon...</p>
        </div>
      </div>
    </div>
  );
}
