'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useMultiplayerGame } from '@/context/MultiplayerGameContext';
import { blackwoodMystery } from '@/data/mystery';

export default function HintsPage() {
  const { gameState, useHint } = useMultiplayerGame();
  const [revealedHints, setRevealedHints] = useState<number[]>([]);

  const handleRevealHint = (index: number) => {
    if (useHint()) {
      setRevealedHints(prev => [...prev, index]);
    }
  };

  const availableHints = gameState.maxHints - gameState.hintsUsed;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-amber-500 mb-2">Investigative Hints</h1>
            <p className="text-gray-400">
              {availableHints} of {gameState.maxHints} hints remaining
            </p>
          </div>
          <Link
            href="/game"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors"
          >
            ← Back to Hub
          </Link>
        </div>

        {/* Warning */}
        <div className="bg-yellow-900/20 border-2 border-yellow-700 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-3xl">⚠️</div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">Use Hints Wisely</h3>
              <p className="text-gray-300 text-sm">
                You have a limited number of hints available. Each hint provides guidance to help you solve the mystery,
                but the real satisfaction comes from solving it yourself. Only use hints if you're truly stuck.
              </p>
            </div>
          </div>
        </div>

        {/* Hints Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Hints Used</span>
            <span className="text-sm text-amber-400 font-semibold">
              {gameState.hintsUsed} / {gameState.maxHints}
            </span>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: gameState.maxHints }).map((_, i) => (
              <div
                key={i}
                className={`h-3 flex-1 rounded ${
                  i < gameState.hintsUsed ? 'bg-gray-700' : 'bg-amber-500'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Hints List */}
        <div className="space-y-4">
          {blackwoodMystery.hints.map((hint, index) => {
            const isRevealed = revealedHints.includes(index);
            const canReveal = availableHints > 0 && !isRevealed;

            return (
              <div
                key={index}
                className={`border-2 rounded-lg p-6 ${
                  isRevealed
                    ? 'border-green-700 bg-green-900/20'
                    : 'border-gray-700 bg-gray-800'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-amber-400">
                    Hint #{index + 1}
                  </h3>
                  {isRevealed && (
                    <span className="text-xs bg-green-700 px-3 py-1 rounded text-green-200">
                      REVEALED
                    </span>
                  )}
                </div>

                {isRevealed ? (
                  <div className="bg-gray-900 p-4 rounded border border-gray-700">
                    <p className="text-gray-200 leading-relaxed">{hint}</p>
                  </div>
                ) : (
                  <div>
                    <div className="bg-gray-900 p-4 rounded border border-gray-700 mb-4">
                      <p className="text-gray-500 italic blur-sm select-none">
                        This hint contains important guidance that will help direct your investigation
                        toward the right path. Click below to reveal it.
                      </p>
                    </div>

                    {canReveal ? (
                      <button
                        onClick={() => handleRevealHint(index)}
                        className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                      >
                        Use a Hint to Reveal ({availableHints} remaining)
                      </button>
                    ) : (
                      <div className="w-full bg-gray-700 text-gray-400 font-semibold px-6 py-3 rounded-lg text-center cursor-not-allowed">
                        {availableHints === 0 ? 'No hints remaining' : 'Hint locked'}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* No Hints Remaining */}
        {availableHints === 0 && (
          <div className="mt-8 bg-red-900/20 border-2 border-red-700 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">🚫</div>
            <h3 className="text-lg font-semibold text-red-400 mb-2">All Hints Used</h3>
            <p className="text-gray-300 text-sm">
              You've used all available hints. Review the evidence carefully and trust your detective skills!
            </p>
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-amber-400 mb-3">💡 Before Using a Hint</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>• Have you examined all evidence items thoroughly?</li>
            <li>• Did you compare suspect alibis with the timeline?</li>
            <li>• Have you looked for contradictions in witness statements?</li>
            <li>• Did you cross-reference physical evidence with suspect backgrounds?</li>
            <li>• Have you discussed theories with your partner in the notes section?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
