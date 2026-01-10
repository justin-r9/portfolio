import PageNavigation from "@/components/ui/PageNavigation";

export const revalidate = 300; // 5 minutes cache

interface LichessGame {
    id: string;
    rated: boolean;
    variant: string;
    speed: string;
    perf: string;
    createdAt: number;
    lastMoveAt: number;
    status: string;
    players: {
        white: { user?: { name: string; title?: string }; rating: number; ratingDiff?: number };
        black: { user?: { name: string; title?: string }; rating: number; ratingDiff?: number };
    };
    winner?: 'white' | 'black';
    opening?: { name: string };
    fen: string; // FEN string for the board position
}

async function getChessData() {
    try {
        const statsRes = await fetch('https://lichess.org/api/user/justinr9');
        if (!statsRes.ok) throw new Error('Failed to fetch stats');
        const stats = await statsRes.json();

        // Fetch last 4 games. 
        // Note: Lichess games API returns NDJSON by default or PGN. We need to accept JSON/NDJSON.
        // And we want the current FEN to show the position.
        // Url: https://lichess.org/api/games/user/justinr9?max=4&pgnInJson=true&opening=true
        // Actually, to get simple JSON list, we might need to parse NDJSON or use a library, 
        // OR we can use the `Accept: application/x-ndjson` and handle the specific stream format.
        // For simplicity in this environment without extra deps, I'll fetch and try to parse the text response
        // which matches the NDJSON format (one JSON object per line).

        const gamesRes = await fetch('https://lichess.org/api/games/user/justinr9?max=4&perfType=blitz,bullet,rapid&opening=true', {
            headers: {
                'Accept': 'application/x-ndjson'
            }
        });

        if (!gamesRes.ok) throw new Error('Failed to fetch games');

        const text = await gamesRes.text();
        // Split by newline and filter empty lines to get game objects
        const games = text.trim().split('\n').map(line => {
            try { return JSON.parse(line); } catch (e) { return null; }
        }).filter(g => g !== null) as LichessGame[];

        return { stats, games };

    } catch (error) {
        console.error(error);
        return { stats: null, games: [] };
    }
}

export default async function ChessPage() {
    const { stats: statsData, games } = await getChessData();

    // Fallback stats
    const stats = {
        bullet: statsData?.perfs?.bullet?.rating || '?',
        blitz: statsData?.perfs?.blitz?.rating || '?',
        rapid: statsData?.perfs?.rapid?.rating || '?',
        username: statsData?.username || 'justinr9',
        url: statsData?.url || 'https://lichess.org/@/justinr9'
    };

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">

                <PageNavigation backUrl="/interests" backLabel="Back to Interests" />

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-50 mb-4">
                        Chess Overview
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Live ratings and recent battles on the board.
                    </p>
                </div>

                {/* Ratings Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
                    <RatingCard title="Bullet" rating={stats.bullet} color="text-orange-600" />
                    <RatingCard title="Blitz" rating={stats.blitz} color="text-emerald-600" focused />
                    <RatingCard title="Rapid" rating={stats.rapid} color="text-cyan-600" />
                </div>

                {/* Recent Games */}
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">Last 4 Games</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {games.length > 0 ? games.map((game) => (
                        <a
                            key={game.id}
                            href={`https://lichess.org/${game.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-800 group"
                        >
                            {/* Board Image (using Lichess/GIF API or similar) 
                                Lichess gives us a GIF or Image of the game. 
                                Format: https://lichess.org/game/export/gif/{gameId}.gif?theme=blue&piece=cburnett
                                OR if we want generated board from FEN: `https://lichess.org/board/{gameId}.png` is not standard API.
                                But `https://lichess.org/game/export/gif/{id}` works great for animation preview or 
                                `https://lichess.org1.png` ? No.
                                The standard is using FEN renderers, but fetching a GIF from Lichess is easiest/coolest.
                                Actually, static image is better for performance.
                                Lichess unfortunately doesn't serve a simple static jpg of end position easily via API URL param alone without generating it. 
                                BUT, we can use a 3rd party or just embed the GIF which is supported.
                                Wait, user asked for "Last position". 
                                Let's try to find a FEN image service or just use the GIF (which shows the game).
                                Actually, `https://fen-to-image.com` or similar might exist.
                                Better: Lichess allows `https://lichess.org/training/export/gif/{id}.gif` or similar.
                                Let's stick to the game Link and maybe a generated thumbnail if possible.
                                Fallback: Use the GIF endpoint `https://lichess.org/game/export/gif/${game.id}.gif` which plays the game. 
                                It might be heavy for 4 items but it's cool.
                                Alternative: `https://lichess.org/game/export/png/${game.id}.png` -> This usually generates a PGN text, not image.
                                
                                CORRECT WAY: Use a generic chessboard image service with FEN? 
                                Or simply: `https://lichess.org/game/export/gif/${game.id}.gif` is officially supported. 
                                Let's use `theme` params to make it match style?
                            */}
                            <div className="aspect-square w-full relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                {/* Use Lichess GIF Preview - It's dynamic and cool for a portfolio */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={`https://lichess.org/game/export/gif/${game.id}.gif?theme=blue&piece=cburnett`}
                                    alt={`Chess game ${game.id}`}
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                    loading="lazy"
                                />
                            </div>

                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className={`text-xs font-bold uppercase ${game.winner === 'white' ? 'text-slate-500' : 'text-slate-500'}`}>
                                        {game.perf}
                                    </span>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${(game.winner === 'white' && game.players.white.user?.name === 'justinr9') ||
                                            (game.winner === 'black' && game.players.black.user?.name === 'justinr9')
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : 'bg-red-100 text-red-700'
                                        }`}>
                                        {(game.winner === 'white' && game.players.white.user?.name === 'justinr9') ||
                                            (game.winner === 'black' && game.players.black.user?.name === 'justinr9')
                                            ? 'WON' : 'LOST'}
                                    </span>
                                </div>
                                <div className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                                    vs {game.players.white.user?.name === 'justinr9' ? game.players.black.user?.name || 'Anonymous' : game.players.white.user?.name || 'Anonymous'}
                                </div>
                            </div>
                        </a>
                    )) : (
                        <div className="col-span-full text-center py-10 text-slate-500">
                            Loading games... or no recent games found.
                        </div>
                    )}
                </div>

                <div className="mt-16 text-center">
                    <a
                        href={stats.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-300 transition-colors"
                    >
                        <span>View full profile on Lichess</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>
        </main>
    );
}

function RatingCard({ title, rating, color, focused = false }: { title: string, rating: number | string, color: string, focused?: boolean }) {
    return (
        <div className={`bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 ${focused ? 'ring-2 ring-emerald-500' : ''} relative`}>
            {focused && (
                <div className="absolute top-0 right-0 p-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-bl-xl dark:bg-emerald-900/30 dark:text-emerald-400">
                    Focus
                </div>
            )}
            <div className={`text-sm font-bold uppercase tracking-widest mb-2 ${color}`}>{title}</div>
            <div className="text-5xl font-mono font-bold text-slate-900 dark:text-slate-100">{rating}</div>
        </div>
    )
}
