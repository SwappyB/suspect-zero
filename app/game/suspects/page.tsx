'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useMultiplayerGame } from '@/context/MultiplayerGameContext';
import { blackwoodMystery } from '@/data/mystery';
import { Suspect } from '@/data/types';

export default function SuspectsPage() {
  const { gameState, markSuspectExamined } = useMultiplayerGame();
  const [selectedSuspect, setSelectedSuspect] = useState<Suspect | null>(null);
  const [showSecrets, setShowSecrets] = useState(false);

  const handleSuspectClick = (suspect: Suspect) => {
    setSelectedSuspect(suspect);
    setShowSecrets(false);
    markSuspectExamined(suspect.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-amber-500 mb-2">Suspect Profiles</h1>
            <p className="text-gray-400">
              {gameState.examinedSuspects.length} of {blackwoodMystery.suspects.length} suspects interviewed
            </p>
          </div>
          <Link
            href="/game"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors"
          >
            ← Back to Hub
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Suspects List */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-xl font-semibold text-amber-400 mb-4">Persons of Interest</h2>
            <div className="space-y-3">
              {blackwoodMystery.suspects.map((suspect) => {
                const isExamined = gameState.examinedSuspects.includes(suspect.id);
                return (
                  <button
                    key={suspect.id}
                    onClick={() => handleSuspectClick(suspect)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedSuspect?.id === suspect.id
                        ? 'border-amber-500 bg-amber-900/30'
                        : 'border-red-700 bg-red-900/20'
                    } hover:border-amber-600`}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={suspect.imageUrl}
                        alt={suspect.name}
                        className="w-16 h-16 rounded-lg object-cover border-2 border-gray-700"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h3 className="font-bold text-lg">{suspect.name}</h3>
                            <p className="text-sm text-gray-400">{suspect.occupation}</p>
                            <p className="text-xs text-gray-500 mt-1">{suspect.relationship}</p>
                          </div>
                          {!isExamined && (
                            <span className="text-xs bg-amber-600 px-2 py-1 rounded">NEW</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Suspect Detail */}
          <div className="lg:col-span-2">
            {selectedSuspect ? (
              <div className="bg-gray-800 border-2 border-amber-700 rounded-lg p-6">
                <div className="mb-6 pb-6 border-b border-gray-700">
                  <div className="flex items-start gap-6 mb-4">
                    <img
                      src={selectedSuspect.imageUrl}
                      alt={selectedSuspect.name}
                      className="w-32 h-32 rounded-xl object-cover border-4 border-amber-700 shadow-lg"
                    />
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-amber-400 mb-1">{selectedSuspect.name}</h2>
                      <p className="text-lg text-gray-300">{selectedSuspect.occupation}</p>
                      <p className="text-sm text-gray-500">{selectedSuspect.age} years old</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-900 p-3 rounded border border-gray-700">
                      <p className="text-xs text-gray-500 uppercase mb-1">Relationship to Victim</p>
                      <p className="text-sm text-gray-300">{selectedSuspect.relationship}</p>
                    </div>
                    <div className="bg-gray-900 p-3 rounded border border-gray-700">
                      <p className="text-xs text-gray-500 uppercase mb-1">Background</p>
                      <p className="text-sm text-gray-300">{selectedSuspect.description}</p>
                    </div>
                  </div>
                </div>

                {/* Alibi */}
                <div className="mb-6 pb-6 border-b border-gray-700">
                  <h3 className="text-sm font-semibold text-amber-400 mb-3">⏰ ALIBI</h3>
                  <div className="bg-gray-900 p-4 rounded border border-gray-700">
                    <p className="text-gray-200">{selectedSuspect.alibi}</p>
                  </div>
                </div>

                {/* Motive */}
                <div className="mb-6 pb-6 border-b border-gray-700">
                  <h3 className="text-sm font-semibold text-amber-400 mb-3">🎯 SUSPECTED MOTIVE</h3>
                  <div className="bg-red-900/20 p-4 rounded border border-red-800">
                    <p className="text-gray-200">{selectedSuspect.motive}</p>
                  </div>
                </div>

                {/* Interview Transcript */}
                <div className="mb-6 pb-6 border-b border-gray-700">
                  <h3 className="text-sm font-semibold text-amber-400 mb-3">🎙️ INTERVIEW TRANSCRIPT</h3>
                  <div className="space-y-4">
                    {selectedSuspect.interview.map((qa, index) => (
                      <div key={index} className="bg-gray-900 p-4 rounded border border-gray-700">
                        <p className="text-sm text-amber-300 font-semibold mb-2">
                          Q: {qa.question}
                        </p>
                        <p className="text-gray-200 italic">
                          A: "{qa.answer}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secrets (Spoiler) */}
                <div>
                  <h3 className="text-sm font-semibold text-amber-400 mb-3">🔒 INVESTIGATOR NOTES (CONTAINS SPOILERS)</h3>
                  {!showSecrets ? (
                    <button
                      onClick={() => setShowSecrets(true)}
                      className="w-full bg-gray-900 hover:bg-gray-800 p-4 rounded border border-yellow-700 transition-colors"
                    >
                      <p className="text-yellow-400 font-semibold">⚠️ Click to Reveal Hidden Information</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Warning: This contains investigative findings that may spoil your deduction process
                      </p>
                    </button>
                  ) : (
                    <div className="space-y-2">
                      {selectedSuspect.secrets.map((secret, index) => (
                        <div
                          key={index}
                          className="bg-yellow-900/20 p-4 rounded border border-yellow-800"
                        >
                          <p className="text-gray-200">• {secret}</p>
                        </div>
                      ))}
                      <button
                        onClick={() => setShowSecrets(false)}
                        className="text-sm text-gray-500 hover:text-gray-400 mt-2"
                      >
                        Hide secrets
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-500 italic">
                    💡 Tip: Compare alibis with the timeline and cross-check statements with physical evidence. Look for inconsistencies.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-12 text-center">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">Select a Suspect to Interview</h3>
                <p className="text-gray-500">
                  Click on any suspect from the list to view their profile and interview
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
