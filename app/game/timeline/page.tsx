'use client';

import Link from 'next/link';
import { blackwoodMystery } from '@/data/mystery';

const timelineEvents = [
  { time: '8:30 PM', event: 'Cocktails served - All guests arrive', location: 'Drawing Room', source: 'Edmund Price (Butler)' },
  { time: '9:00 PM', event: 'Dinner begins', location: 'Dining Hall', source: 'Multiple witnesses' },
  { time: '9:15 PM', event: 'Victor Blackwood enters gallery', location: 'Private Gallery', source: 'Security Log' },
  { time: '9:45 PM', event: 'Dinner ends, guests disperse', location: 'Various', source: 'Timeline compilation' },
  { time: '9:45 PM', event: 'Margaret Chen calls law office', location: 'Library', source: 'Phone records' },
  { time: '9:47 PM', event: 'Victor Blackwood exits gallery', location: 'Private Gallery', source: 'Security Log' },
  { time: '10:00 PM', event: 'Edmund brings tea to Sophia', location: 'Conservatory', source: 'Edmund & Sophia statements' },
  { time: '10:15 PM', event: 'Isabella goes to smoking room', location: 'Smoking Room', source: 'Isabella statement' },
  { time: '10:15 PM', event: 'James goes to terrace', location: 'Terrace', source: 'James statement' },
  { time: '10:15 PM', event: 'Margaret attempts call to Tokyo (failed)', location: 'Library', source: 'Phone records' },
  { time: '10:20 PM', event: 'Edmund serves brandy to James', location: 'Terrace', source: 'Edmund & James statements' },
  { time: '10:25 PM', event: 'Victor requests champagne for gallery', location: 'Gallery request to Edmund', source: 'Edmund statement' },
  { time: '10:30 PM', event: 'Edmund delivers champagne to gallery', location: 'Private Gallery', source: 'Edmund statement, forensics' },
  { time: '10:35 PM', event: 'Victor enters gallery', location: 'Private Gallery', source: 'Security Log' },
  { time: '10:42 PM', event: 'Sophia enters gallery', location: 'Private Gallery', source: 'Security Log' },
  { time: '10:46 PM', event: 'Sophia exits gallery; Isabella WiFi disconnects', location: 'Gallery/Smoking Room', source: 'Security Log, WiFi logs' },
  { time: '10:47 PM', event: 'Margaret sends mysterious text: "It\'s done"', location: 'Library (phone was there)', source: 'Phone records' },
  { time: '10:49 PM', event: 'Security cameras disabled', location: 'Gallery corridor', source: 'Technical analysis' },
  { time: '10:51 PM', event: 'CORRUPTED DATA - Camera blackout begins', location: 'Gallery area', source: 'Security Log', critical: true },
  { time: '11:00 PM', event: 'James claims to have left terrace', location: 'Moving from Terrace', source: 'James statement' },
  { time: '11:15 PM', event: 'Estimated latest time of death', location: 'Private Gallery', source: 'Forensic analysis', critical: true },
  { time: '11:35 PM', event: 'Security cameras reactivated', location: 'Gallery corridor', source: 'Technical analysis' },
  { time: '11:47 PM', event: 'Edmund discovers Victor\'s body', location: 'Private Gallery', source: 'Edmund statement, Security Log', critical: true },
];

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-amber-500 mb-2">Timeline of Events</h1>
            <p className="text-gray-400">October 15th, 2024 - Blackwood Estate</p>
          </div>
          <Link
            href="/game"
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors"
          >
            ← Back to Hub
          </Link>
        </div>

        {/* Key Information */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-red-900/20 border-2 border-red-700 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-red-400 mb-1">Time of Death</h3>
            <p className="text-lg text-red-200">{blackwoodMystery.timeOfDeath}</p>
          </div>
          <div className="bg-blue-900/20 border-2 border-blue-700 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-400 mb-1">Cause of Death</h3>
            <p className="text-lg text-blue-200">{blackwoodMystery.causeOfDeath}</p>
          </div>
          <div className="bg-amber-900/20 border-2 border-amber-700 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-amber-400 mb-1">Critical Window</h3>
            <p className="text-lg text-amber-200">10:30 PM - 11:15 PM</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-gray-800 border-2 border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-amber-400 mb-6">Chronological Events</h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-20 top-0 bottom-0 w-0.5 bg-amber-600"></div>

            <div className="space-y-6">
              {timelineEvents.map((event, index) => (
                <div key={index} className="relative flex gap-6">
                  {/* Time */}
                  <div className="w-20 flex-shrink-0 text-right">
                    <span className="text-sm font-semibold text-amber-400">
                      {event.time}
                    </span>
                  </div>

                  {/* Timeline dot */}
                  <div className="relative flex items-center justify-center flex-shrink-0">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      event.critical
                        ? 'bg-red-500 border-red-400 shadow-lg shadow-red-500/50'
                        : 'bg-amber-500 border-amber-400'
                    } z-10`}></div>
                  </div>

                  {/* Event details */}
                  <div className={`flex-1 pb-4 ${
                    event.critical ? 'bg-red-900/20 border-2 border-red-700' : 'bg-gray-900 border border-gray-700'
                  } rounded-lg p-4`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`font-semibold ${
                        event.critical ? 'text-red-300' : 'text-gray-200'
                      }`}>
                        {event.event}
                      </h3>
                      {event.critical && (
                        <span className="text-xs bg-red-700 px-2 py-1 rounded text-red-200">
                          CRITICAL
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="text-gray-400">
                        📍 {event.location}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400">
                        📋 {event.source}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analysis Tips */}
        <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-amber-400 mb-4">🔍 Timeline Analysis</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <h4 className="font-semibold text-amber-300 mb-2">Key Observations:</h4>
              <ul className="space-y-1 text-gray-400">
                <li>• Victor requested champagne at 10:25 PM</li>
                <li>• Edmund delivered it at 10:30 PM</li>
                <li>• Sophia visited the gallery (10:42-10:46 PM)</li>
                <li>• Camera blackout: 10:49-11:35 PM (suspicious timing)</li>
                <li>• Death occurred before 11:15 PM</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-amber-300 mb-2">Questions to Consider:</h4>
              <ul className="space-y-1 text-gray-400">
                <li>• Who had opportunity during the critical window?</li>
                <li>• Why were cameras disabled after Sophia left?</li>
                <li>• What was Margaret's "It's done" text about?</li>
                <li>• Can all alibis be verified for 10:30-11:15?</li>
                <li>• Who had access to the champagne?</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Suspect Movements Summary */}
        <div className="mt-6 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-amber-400 mb-4">👥 Suspect Movements During Critical Period</h3>
          <div className="space-y-3">
            {blackwoodMystery.suspects.map(suspect => (
              <div key={suspect.id} className="bg-gray-900 border border-gray-700 rounded p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-200">{suspect.name}</h4>
                    <p className="text-sm text-gray-400 mt-1">{suspect.alibi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
