import React from 'react'
import { Link } from 'react-router-dom'
import NAV_ITEMS from '../config/nav'

export default function Header({ search, setSearch, isDark, toggleDark, characters, selectedCharacter, setSelectedCharacter }) {
    return (
        <div className="container mx-auto px-6 flex items-start md:items-center justify-between gap-6">
            <div className="flex-1 min-w-0">
                <Link to="/dashboard" className="block">
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">三国演义 StoryBooks</h2>
                    <p className="text-sm text-white/90">经典桥段与人物卡片</p>
                </Link>

                <nav className="mt-3 flex flex-wrap gap-2">
                    {NAV_ITEMS.map((item) => (
                        <Link key={item.to} to={item.to} className="text-sm px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white/95">{item.label}</Link>
                    ))}
                </nav>
            </div>

            <div className="flex-shrink-0 flex items-center gap-3">
                <div className="relative">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="搜索故事或人物..."
                        className="px-3 py-2 rounded-md text-sm w-56 bg-white/8 placeholder-white/70 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />
                </div>

                <select
                    value={selectedCharacter || ''}
                    onChange={(e) => setSelectedCharacter(e.target.value || null)}
                    className="px-3 py-2 rounded-md text-sm bg-white/8 text-white border border-white/10"
                >
                    <option value="">全部人物</option>
                    {characters?.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                </select>

                <Link to="/favorites" className="text-sm px-3 py-2 rounded-md bg-white/10 hover:bg-white/20">收藏</Link>

                <button
                    onClick={toggleDark}
                    aria-label="切换深色模式"
                    className="px-3 py-2 bg-white/20 rounded-md text-sm"
                >
                    {isDark ? '🌙 深色' : '☀️ 浅色'}
                </button>
            </div>
        </div>
    )
}
