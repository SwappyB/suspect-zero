'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useMultiplayerGame } from '@/context/MultiplayerGameContext';
import { blackwoodMystery } from '@/data/mystery';
import { Evidence } from '@/data/types';

export default function EvidencePage() {
  const { gameState, markEvidenceExamined } = useMultiplayerGame();
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [filter, setFilter] = useState<'all' | 'document' | 'forensic' | 'personal' | 'physical' | 'digital'>('all');

  const filteredEvidence = filter === 'all'
    ? blackwoodMystery.evidence
    : blackwoodMystery.evidence.filter(e => e.category === filter);

  const handleEvidenceClick = (evidence: Evidence) => {
    setSelectedEvidence(evidence);
    markEvidenceExamined(evidence.id);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      forensic: 'border-red-700 bg-red-900/20',
      document: 'border-blue-700 bg-blue-900/20',
      personal: 'border-purple-700 bg-purple-900/20',
      physical: 'border-green-700 bg-green-900/20',
      digital: 'border-cyan-700 bg-cyan-900/20',
    };
    return colors[category as keyof typeof colors] || 'border-gray-700 bg-gray-900/20';
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      forensic: '🔬',
      document: '📄',
      personal: '✉️',
      physical: '🔍',
      digital: '💻',
    };
    return icons[category as keyof typeof icons] || '📋';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-amber-500 mb-2">Evidence Vault</h1>
            <p className="text-gray-400">
              {gameState.examinedEvidence.length} of {blackwoodMystery.evidence.length} items examined
            </p>
          </div>
          <Link
            href="/game"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors"
          >
            ← Back to Hub
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {['all', 'forensic', 'document', 'personal', 'physical', 'digital'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as typeof filter)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                filter === cat
                  ? 'bg-amber-600 border-amber-500 text-white'
                  : 'bg-gray-800 border-gray-700 hover:border-gray-600'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Evidence List */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="text-xl font-semibold text-amber-400 mb-4">Evidence Items</h2>
            <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
              {filteredEvidence.map((evidence) => {
                const isExamined = gameState.examinedEvidence.includes(evidence.id);
                return (
                  <button
                    key={evidence.id}
                    onClick={() => handleEvidenceClick(evidence)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedEvidence?.id === evidence.id
                        ? 'border-amber-500 bg-amber-900/30'
                        : getCategoryColor(evidence.category)
                    } hover:border-amber-600`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getCategoryIcon(evidence.category)}</span>
                        <div>
                          <h3 className="font-semibold text-sm">{evidence.title}</h3>
                          <p className="text-xs text-gray-400 capitalize">{evidence.category}</p>
                        </div>
                      </div>
                      {!isExamined && (
                        <span className="text-xs bg-amber-600 px-2 py-1 rounded">NEW</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2">{evidence.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Evidence Detail */}
          <div className="lg:col-span-2">
            {selectedEvidence ? (
              <div className="bg-gray-800 border-2 border-amber-700 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{getCategoryIcon(selectedEvidence.category)}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-amber-400">{selectedEvidence.title}</h2>
                      <p className="text-sm text-gray-400 capitalize">{selectedEvidence.category} Evidence</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded text-sm ${
                    selectedEvidence.importance === 'high'
                      ? 'bg-red-900 text-red-200'
                      : selectedEvidence.importance === 'medium'
                      ? 'bg-yellow-900 text-yellow-200'
                      : 'bg-gray-700 text-gray-300'
                  }`}>
                    {selectedEvidence.importance.toUpperCase()}
                  </div>
                </div>

                <div className="mb-4 pb-4 border-b border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">DESCRIPTION</h3>
                  <p className="text-gray-300">{selectedEvidence.description}</p>
                </div>

                <div className="mb-4 pb-4 border-b border-gray-700">
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">EVIDENCE DETAILS</h3>
                  <div className="bg-gray-900 p-4 rounded border border-gray-700">
                    <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                      {selectedEvidence.content}
                    </p>
                  </div>
                </div>

                {selectedEvidence.linkedTo.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">LINKED TO</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvidence.linkedTo.map((linkedId) => {
                        const linkedSuspect = blackwoodMystery.suspects.find(s => s.id === linkedId);
                        const linkedEvidence = blackwoodMystery.evidence.find(e => e.id === linkedId);
                        const linkedItem = linkedSuspect || linkedEvidence;

                        if (!linkedItem) return null;

                        return (
                          <span
                            key={linkedId}
                            className={`px-3 py-1 rounded text-sm ${
                              linkedSuspect
                                ? 'bg-red-900/50 border border-red-700 text-red-200'
                                : 'bg-blue-900/50 border border-blue-700 text-blue-200'
                            }`}
                          >
                            {linkedSuspect ? '👤' : '📋'} {linkedSuspect ? linkedSuspect.name : linkedEvidence?.title}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-500 italic">
                    💡 Tip: Cross-reference this evidence with suspect statements and other clues. Use the notes page to record your deductions.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">Select Evidence to Examine</h3>
                <p className="text-gray-500">
                  Click on any evidence item from the list to view full details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
