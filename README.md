# The Blackwood Estate Murder

A collaborative **online multiplayer** murder mystery game for two players built with Next.js.

## About the Game

Step into the role of a detective investigating the murder of Victor Blackwood, a wealthy art collector found dead in his private gallery during a dinner party. Work together with your partner **from anywhere in the world** to examine evidence, interview suspects, and solve the mystery in real-time!

### Features

- **🌐 Online Multiplayer**: Play with a friend from anywhere using room codes
- **🔄 Real-time Synchronization**: All actions sync instantly between players
- **📖 Engaging Storyline**: Rich narrative with twists, turns, and red herrings
- **🔍 20 Evidence Items**: Documents, forensic reports, journals, and physical evidence
- **👥 5 Suspects**: Each with detailed backstories, motives, and alibis
- **📝 Collaborative Note-Taking**: Shared investigation notes with evidence linking
- **🎯 Non-linear Exploration**: Access all evidence from the start
- **💡 3 Limited Hints**: Get help if you're stuck
- **⚖️ Moderate Difficulty**: Perfect balance of challenge and solvability

## Getting Started

### Prerequisites

- Node.js 18+ installed on your machine
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Deployment on Vercel

This project is optimized for Vercel deployment:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project to Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## How to Play

### Multiplayer Setup
1. **Player 1**: Click "Create Room" and enter your detective name
2. **Player 1**: Share the 6-character room code with your partner
3. **Player 2**: Click "Join Room" and enter the room code and your name
4. **Both**: Start investigating together in real-time!

### Investigation
1. **Examine Evidence**: Review forensic reports, documents, and physical clues
2. **Interview Suspects**: Read transcripts and analyze alibis
3. **Collaborate**: Use the notes feature to share theories and link evidence
4. **Use Timeline**: Piece together the sequence of events
5. **Submit Solution**: Identify the killer, motive, and method
6. **View Explanation**: See the complete solution after submitting

All actions are synchronized in real-time between both players!

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Real-time Sync**: Pusher (WebSocket-based, optional)
- **API**: Next.js Serverless Functions
- **Storage**: In-memory (production: use Vercel KV, Redis, or PostgreSQL)

## Project Structure

```
mystery/
├── app/                      # Next.js app directory
│   ├── game/                # Game pages
│   │   ├── evidence/        # Evidence vault
│   │   ├── suspects/        # Suspect profiles
│   │   ├── notes/          # Collaborative notes
│   │   ├── hints/          # Hint system
│   │   ├── timeline/       # Event timeline
│   │   ├── solution/       # Solution submission
│   │   └── reveal/         # Full solution reveal
│   ├── layout.tsx          # Root layout with GameProvider
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/              # Reusable components (future)
├── context/                 # React context
│   └── GameContext.tsx     # Game state management
├── data/                    # Game data
│   ├── types.ts            # TypeScript interfaces
│   └── mystery.ts          # Complete mystery data
└── public/                  # Static assets
```

## Multiplayer Configuration

### Basic Setup (No Configuration Required)
The game works out of the box with in-memory storage. Players can create and join rooms, and the game state is synchronized via API calls.

### Optional: Real-time Updates with Pusher (Recommended for Production)

For instant real-time synchronization, you can optionally configure Pusher:

1. Sign up for free at [pusher.com](https://pusher.com)
2. Create a new app and get your credentials
3. Copy `.env.local.example` to `.env.local`
4. Add your Pusher credentials:

```bash
PUSHER_APP_ID=your_app_id
PUSHER_SECRET=your_secret_key
NEXT_PUBLIC_PUSHER_KEY=your_public_key
NEXT_PUBLIC_PUSHER_CLUSTER=us2  # or your cluster
```

Without Pusher, the app still works but uses polling-based sync (slight delay).

### Production Storage (Recommended)

For production deployments, replace the in-memory storage with a persistent database:

- **Vercel KV** (Redis): Easiest for Vercel deployments
- **Upstash Redis**: Free tier available
- **PostgreSQL**: For permanent storage

Update the API routes in `app/api/room/*` to use your chosen database.

## Game Data Structure

The mystery is completely data-driven. To add new stories in the future, create a new mystery object following the structure in `data/mystery.ts`:

- **Mystery metadata**: Title, setting, victim info
- **Suspects**: Array of 5 suspects with profiles, motives, alibis, interviews
- **Evidence**: Array of 20 clues with categories, descriptions, and links
- **Solution**: The correct answer with full explanation
- **Hints**: 3 progressive hints to guide players

## Features Breakdown

### Evidence Vault
- Filter by category (forensic, document, personal, physical, digital)
- Detailed examination of each item
- Linked suspects and related evidence
- Importance ratings

### Suspect Profiles
- Complete background information
- Interview transcripts
- Alibi details
- Hidden secrets (spoiler-protected)

### Notes System
- Collaborative note-taking
- Link notes to specific evidence/suspects
- Player attribution (Player 1 vs Player 2)
- Persistent across sessions

### Timeline
- Chronological event listing
- Critical moments highlighted
- Suspect movement tracking
- Time-of-death window analysis

### Hints System
- Limited to 3 hints
- Progressive revelation
- Usage tracking
- Blur effect on unrevealed hints

### Solution Submission
- Select killer from suspect list
- Write motive explanation
- Describe method and opportunity
- Instant feedback on correctness
- Access to full solution after submission

## Adding New Mysteries (Future Enhancement)

To add more stories:

1. Create a new mystery object in `data/` folder
2. Follow the same structure as `blackwoodMystery`
3. Update the game to allow mystery selection
4. Consider adding a mystery selection menu on the landing page

## License

This project is created for educational and entertainment purposes.

## Credits

Developed with Claude Code - A murder mystery experience for detective enthusiasts.

---

**Enjoy solving the mystery!** 🔍
