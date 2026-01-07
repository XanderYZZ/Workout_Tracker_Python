import type { FC } from 'react'
import '../index.css'

const Home: FC = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur border-b border-white/10">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <span className="text-lg font-semibold tracking-tight">
                        Workout Tracker
                    </span>

                    <nav className="flex items-center gap-4">
                        <a className="text-sm text-slate-300 hover:text-white transition">
                            Log In
                        </a>
                        <a className="px-4 py-2 rounded-full bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition">
                            Sign Up
                        </a>
                    </nav>
                </div>
            </header>

            <main>
                {/* HERO */}
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-pink-600/20 blur-3xl" />

                    <div className="relative max-w-6xl mx-auto px-6 py-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight">
                                Train smarter.
                                <br />
                                <span className="text-indigo-400">Progress faster.</span>
                            </h1>

                            <p className="mt-8 text-lg text-slate-300 max-w-md">
                                Log workouts, visualize progress, and build consistency with a fast, no-nonsense tracking system.
                            </p>

                            <div className="mt-10 flex gap-4">
                                <a className="px-6 py-3 rounded-full bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition">
                                    Get started free
                                </a>
                                <a className="px-6 py-3 rounded-full border border-white/20 text-slate-200 hover:bg-white/10 transition">
                                    View demo
                                </a>
                            </div>
                        </div>

                        {/* VISUAL */}
                        <div className="relative">
                            <div className="rounded-2xl bg-slate-900/80 border border-white/10 shadow-2xl p-6">
                                <div className="h-56 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-lg font-semibold">
                                    Dashboard Preview
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FEATURES */}
                <section className="bg-slate-900 border-t border-white/10">
                    <div className="max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {[
                            ['Log workouts', 'Fast input for sets, reps, and weights.'],
                            ['See progress', 'Visualize strength gains over time.'],
                            ['Reuse routines', 'Templates that speed up training.'],
                        ].map(([title, desc]) => (
                            <div
                                key={title}
                                className="rounded-xl bg-slate-800/60 border border-white/10 p-6 hover:bg-slate-800 transition"
                            >
                                <h3 className="font-semibold text-white">{title}</h3>
                                <p className="mt-2 text-sm text-slate-400">{desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Home