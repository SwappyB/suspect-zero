'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useMultiplayerGame } from '@/context/MultiplayerGameContext';
import { blackwoodMystery } from '@/data/mystery';

export default function NotesPage() {
  const { gameState, addNote, deleteNote } = useMultiplayerGame();
  const [noteContent, setNoteContent] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<'player1' | 'player2'>('player1');
  const [selectedLinks, setSelectedLinks] = useState<string[]>([]);
  const [showLinkSelector, setShowLinkSelector] = useState(false);

  const handleAddNote = () => {
    if (noteContent.trim()) {
      addNote(noteContent.trim(), selectedLinks, selectedPlayer);
      setNoteContent('');
      setSelectedLinks([]);
      setShowLinkSelector(false);
    }
  };

  const toggleLink = (id: string) => {
    setSelectedLinks(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const allLinkableItems = [
    ...blackwoodMystery.suspects.map(s => ({ id: s.id, name: s.name, type: 'suspect' as const })),
    ...blackwoodMystery.evidence.map(e => ({ id: e.id, name: e.title, type: 'evidence' as const })),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-amber-500 mb-2">Investigation Notes</h1>
            <p className="text-gray-400">
              Collaborate with your partner - {gameState.notes.length} notes recorded
            </p>
          </div>
          <Link
            href="/game"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors"
          >
            ← Back to Hub
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Add Note Section */}
          <div className="bg-gray-800 border-2 border-amber-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-amber-400 mb-4">Add New Note</h2>

            {/* Player Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Created by:
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedPlayer('player1')}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    selectedPlayer === 'player1'
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-gray-900 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {gameState.playerNames[0]}
                </button>
                <button
                  onClick={() => setSelectedPlayer('player2')}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    selectedPlayer === 'player2'
                      ? 'bg-purple-600 border-purple-500 text-white'
                      : 'bg-gray-900 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {gameState.playerNames[1]}
                </button>
              </div>
            </div>

            {/* Note Content */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Note Content
              </label>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Record your deductions, theories, or connections..."
                rows={6}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-amber-500 text-white resize-none"
              />
            </div>

            {/* Link to Evidence/Suspects */}
            <div className="mb-4">
              <button
                onClick={() => setShowLinkSelector(!showLinkSelector)}
                className="w-full px-4 py-2 bg-gray-900 hover:bg-gray-800 rounded-lg border border-gray-700 transition-colors flex items-center justify-between"
              >
                <span className="text-sm text-gray-300">
                  Link to Evidence/Suspects ({selectedLinks.length})
                </span>
                <span>{showLinkSelector ? '−' : '+'}</span>
              </button>

              {showLinkSelector && (
                <div className="mt-2 bg-gray-900 rounded-lg border border-gray-700 p-4 max-h-60 overflow-y-auto">
                  <div className="space-y-2">
                    {allLinkableItems.map(item => (
                      <label
                        key={item.id}
                        className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedLinks.includes(item.id)}
                          onChange={() => toggleLink(item.id)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">
                          {item.type === 'suspect' ? '👤' : '📋'} {item.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleAddNote}
              disabled={!noteContent.trim()}
              className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Add Note
            </button>
          </div>

          {/* Notes List */}
          <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-amber-400 mb-4">All Notes</h2>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {gameState.notes.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-5xl mb-3">📝</div>
                  <p>No notes yet. Start recording your deductions!</p>
                </div>
              ) : (
                gameState.notes
                  .sort((a, b) => b.timestamp - a.timestamp)
                  .map((note) => {
                    const playerName = gameState.playerNames[note.createdBy === 'player1' ? 0 : 1];
                    const playerColor = note.createdBy === 'player1' ? 'blue' : 'purple';

                    return (
                      <div
                        key={note.id}
                        className={`bg-gray-900 border-l-4 border-${playerColor}-500 rounded-lg p-4`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-semibold px-2 py-1 rounded bg-${playerColor}-900 text-${playerColor}-200`}>
                              {playerName}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(note.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <button
                            onClick={() => deleteNote(note.id)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            ✕
                          </button>
                        </div>

                        <p className="text-gray-200 mb-3 whitespace-pre-wrap">
                          {note.content}
                        </p>

                        {note.linkedItems.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {note.linkedItems.map(itemId => {
                              const item = allLinkableItems.find(i => i.id === itemId);
                              if (!item) return null;
                              return (
                                <span
                                  key={itemId}
                                  className={`text-xs px-2 py-1 rounded ${
                                    item.type === 'suspect'
                                      ? 'bg-red-900/50 text-red-200'
                                      : 'bg-blue-900/50 text-blue-200'
                                  }`}
                                >
                                  {item.type === 'suspect' ? '👤' : '📋'} {item.name}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-gray-800 border border-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-amber-400 mb-2">💡 Collaboration Tips</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Use notes to share theories and deductions with your partner</li>
            <li>• Link notes to specific evidence or suspects for easy reference</li>
            <li>• Compare timelines and look for contradictions in suspect statements</li>
            <li>• Each player can maintain their own theories while building on shared observations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
