'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMultiplayerGame } from '@/context/MultiplayerGameContext';
import { blackwoodMystery } from '@/data/mystery';

export default function SolutionPage() {
  const router = useRouter();
  const { gameState, solveGame } = useMultiplayerGame();
  const [selectedKiller, setSelectedKiller] = useState('');
  const [selectedMotive, setSelectedMotive] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    const killer = blackwoodMystery.suspects.find(s => s.id === selectedKiller);

    // Check if the solution is correct
    const killerCorrect = killer?.name === blackwoodMystery.solution.killer;
    const motiveCorrect = selectedMotive.toLowerCase().includes('wine theft') ||
                          selectedMotive.toLowerCase().includes('prison') ||
                          selectedMotive.toLowerCase().includes('stealing');
    const methodCorrect = selectedMethod.toLowerCase().includes('cyanide') &&
                          selectedMethod.toLowerCase().includes('glass');

    const correct = killerCorrect && motiveCorrect && methodCorrect;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      solveGame();
    }
  };

  const handleViewFullSolution = () => {
    router.push('/game/reveal');
  };

  const canSubmit = selectedKiller && selectedMotive.trim() && selectedMethod.trim();

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className={`border-4 rounded-lg p-8 ${
            isCorrect
              ? 'border-green-500 bg-green-900/20'
              : 'border-red-500 bg-red-900/20'
          }`}>
            <div className="text-center mb-6">
              <div className="text-8xl mb-4">{isCorrect ? '✓' : '✗'}</div>
              <h1 className={`text-4xl font-bold mb-4 ${
                isCorrect ? 'text-green-400' : 'text-red-400'
              }`}>
                {isCorrect ? 'Case Solved!' : 'Incorrect Solution'}
              </h1>
            </div>

            {isCorrect ? (
              <div className="space-y-4 mb-8">
                <p className="text-xl text-center text-gray-200">
                  Congratulations, Detectives {gameState.playerNames[0]} and {gameState.playerNames[1]}!
                </p>
                <p className="text-center text-gray-300">
                  You've successfully identified the killer and solved the mystery of the Blackwood Estate Murder.
                  Your keen detective work has brought justice to Victor Blackwood.
                </p>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold text-amber-400 mb-3">Your Solution:</h3>
                  <div className="space-y-2 text-gray-200">
                    <p><span className="text-gray-400">Killer:</span> {blackwoodMystery.suspects.find(s => s.id === selectedKiller)?.name}</p>
                    <p><span className="text-gray-400">Motive:</span> {selectedMotive}</p>
                    <p><span className="text-gray-400">Method:</span> {selectedMethod}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 mb-8">
                <p className="text-xl text-center text-gray-200">
                  Not quite right, detectives.
                </p>
                <p className="text-center text-gray-300">
                  Your solution doesn't match all the facts. Review the evidence more carefully and try again.
                  Pay special attention to who had means, motive, and opportunity.
                </p>
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold text-amber-400 mb-3">Your Answer:</h3>
                  <div className="space-y-2 text-gray-200">
                    <p><span className="text-gray-400">Killer:</span> {blackwoodMystery.suspects.find(s => s.id === selectedKiller)?.name}</p>
                    <p><span className="text-gray-400">Motive:</span> {selectedMotive}</p>
                    <p><span className="text-gray-400">Method:</span> {selectedMethod}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleViewFullSolution}
                className="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                View Complete Solution
              </button>
              {!isCorrect && (
                <button
                  onClick={() => setShowResult(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              )}
              <Link
                href="/game"
                className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors border border-gray-700"
              >
                Back to Hub
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-amber-500 mb-2">Submit Your Solution</h1>
            <p className="text-gray-400">Present your findings and solve the case</p>
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
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">Ready to Solve?</h3>
              <p className="text-gray-300 text-sm">
                Make sure you've reviewed all evidence and suspect interviews carefully. You can view the full
                solution explanation after submitting, regardless of whether your answer is correct.
              </p>
            </div>
          </div>
        </div>

        {/* Investigation Progress */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-amber-400 mb-4">Investigation Progress</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Evidence Examined</p>
              <p className="text-2xl font-semibold text-amber-300">
                {gameState.examinedEvidence.length}/{blackwoodMystery.evidence.length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Suspects Interviewed</p>
              <p className="text-2xl font-semibold text-amber-300">
                {gameState.examinedSuspects.length}/{blackwoodMystery.suspects.length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Notes Recorded</p>
              <p className="text-2xl font-semibold text-amber-300">
                {gameState.notes.length}
              </p>
            </div>
          </div>
        </div>

        {/* Solution Form */}
        <div className="bg-gray-800 border-2 border-amber-700 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-amber-400 mb-6">Your Conclusion</h2>

          {/* Select Killer */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-3 text-gray-200">
              1. Who is the killer?
            </label>
            <div className="space-y-2">
              {blackwoodMystery.suspects.map(suspect => (
                <label
                  key={suspect.id}
                  className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedKiller === suspect.id
                      ? 'border-amber-500 bg-amber-900/30'
                      : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="killer"
                    value={suspect.id}
                    checked={selectedKiller === suspect.id}
                    onChange={(e) => setSelectedKiller(e.target.value)}
                    className="w-5 h-5 mr-3"
                  />
                  <div>
                    <p className="font-semibold text-gray-200">{suspect.name}</p>
                    <p className="text-sm text-gray-400">{suspect.occupation}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Motive */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-3 text-gray-200">
              2. What was their motive?
            </label>
            <textarea
              value={selectedMotive}
              onChange={(e) => setSelectedMotive(e.target.value)}
              placeholder="Explain why the killer wanted Victor dead..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-amber-500 text-white resize-none"
            />
          </div>

          {/* Method */}
          <div className="mb-8">
            <label className="block text-lg font-medium mb-3 text-gray-200">
              3. How did they do it? (Method and opportunity)
            </label>
            <textarea
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value)}
              placeholder="Describe how the killer poisoned Victor and when they had the opportunity..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-lg focus:outline-none focus:border-amber-500 text-white resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            Submit Solution
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            You can view the complete solution explanation after submitting
          </p>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-amber-400 mb-3">💡 Final Checklist</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>• Have you identified who had access to the cyanide?</li>
            <li>• Did you verify who could poison the champagne glass?</li>
            <li>• Have you cross-referenced all alibis with the timeline?</li>
            <li>• Did you consider who disabled the security cameras and why?</li>
            <li>• Have you identified the strongest motive among all suspects?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
