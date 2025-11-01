import React, { useEffect, useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Hero from './components/Hero'
import Header from './components/Header'
import StoryCard from './components/StoryCard'
import storiesData from './data/stories'
import SpecialEvents from './pages/SpecialEvents'
import SpecialEventsBanner from './components/SpecialEventsBanner'
import charactersData from './data/characters'
import StoryDetail from './pages/StoryDetail'
import MainStory from './pages/MainStory.jsx'
import CharacterList from './pages/CharacterList'
import CharacterDetail from './pages/CharacterDetail'
import Favorites from './pages/Favorites'
import ChapterDetail from './pages/ChapterDetail'
import Dashboard from './pages/Dashboard'

function Home({ stories, favorites, toggleFavorite }) {
    return (
        <div>
            <main id="main-content" className="container mx-auto px-6 -mt-10">
                <SpecialEventsBanner stories={stories} />

                <section className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {stories.map((s) => (
                        <StoryCard key={s.id} story={s} isFavorited={(favorites || []).includes(s.id)} onToggleFavorite={toggleFavorite} />
                    ))}
                </section>

                <footer className="text-center text-sm text-gray-500 my-12">
                    <p>© 三国演义 StoryBooks — sample project. Content for educational/demo purposes.</p>
                </footer>
            </main>
        </div>
    )
}

function HeaderArea({ marqueeChar, search, setSearch, isDark, toggleDark, charactersData, selectedCharacter, setSelectedCharacter }) {
    const location = useLocation()
    // const hideMarquee = location && (location.pathname === '/' || location.pathname.startsWith('/dashboard'))

    return (
        <header className="header-gradient text-white py-6">
            <Header
                search={search}
                setSearch={setSearch}
                isDark={isDark}
                toggleDark={toggleDark}
                characters={charactersData}
                selectedCharacter={selectedCharacter}
                setSelectedCharacter={setSelectedCharacter}
            />
            <div className="container mx-auto px-6 mt-6">
                {/* <Hero featured={{ label: '欢迎', title: '探索三国的世界', subtitle: '浏览特别事件、人物索引与章回 — 从仪表盘开始你的旅程', link: '/dashboard' }} /> */}
                {/* <Hero featured={{ label: '欢迎', title: '探索三国的世界', subtitle: '浏览特别事件、人物索引与章回 — 从仪表盘开始你的旅程', link: '/dashboard' }} /> */}

                {/* header marquee + small character intro (hidden on dashboard) */}
                {<div className="mt-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="flex-1">
                        <div className="marquee bg-white/10 rounded-md p-3">
                            <span className="marquee-inner text-white/90">
                                {marqueeChar ? `✨ ${marqueeChar.name} — ${marqueeChar.title} — ${marqueeChar.bio}` : ''}
                            </span>
                        </div>
                    </div>

                    <div className="w-full md:w-56 bg-white/10 rounded-md p-3 flex gap-3 items-start">
                        <img src={marqueeChar?.image} alt={marqueeChar?.name} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                        <div>
                            <div className="text-sm font-semibold text-white">{marqueeChar?.name}</div>
                            <div className="text-xs text-white/80">{marqueeChar?.title}</div>
                        </div>
                    </div>
                </div>}
            </div>
        </header>
    )
}

export default function App() {
    const SPECIAL_IDS = ['red-cliffs', 'three-kingdoms-pledge', 'guan-yu-crossing']
    const [search, setSearch] = useState('')
    const [isDark, setIsDark] = useState(() => !!localStorage.getItem('sb-dark'))
    const [stories, setStories] = useState(storiesData)
    const [selectedCharacter, setSelectedCharacter] = useState(null)
    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('sb-favs') || '[]')
        } catch (e) {
            return []
        }
    })
    const [recentlyViewed, setRecentlyViewed] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('sb-recent') || '[]')
        } catch (e) {
            return []
        }
    })
    const [pinned, setPinned] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('sb-pinned') || '[]')
        } catch (e) {
            return []
        }
    })

    const recordView = useCallback((item) => {
        // item: { type: 'story'|'chapter', id, chapId?, title }
        setRecentlyViewed((prev) => {
            const key = item.type === 'chapter' ? `${item.id}::${item.chapId}` : `${item.id}`
            const filtered = (prev || []).filter((p) => {
                const pkey = p.type === 'chapter' ? `${p.id}::${p.chapId}` : `${p.id}`
                return pkey !== key
            })
            const next = [{ ...item, ts: Date.now() }, ...filtered].slice(0, 12)
            localStorage.setItem('sb-recent', JSON.stringify(next))
            return next
        })
    }, [])

    function clearRecent() {
        setRecentlyViewed([])
        localStorage.removeItem('sb-recent')
    }

    function removeRecent(itemKey) {
        setRecentlyViewed((prev) => {
            const next = prev.filter((p) => {
                const pkey = p.type === 'chapter' ? `${p.id}::${p.chapId}` : `${p.id}`
                return pkey !== itemKey
            })
            localStorage.setItem('sb-recent', JSON.stringify(next))
            return next
        })
    }

    function clearFavorites() {
        setFavorites([])
    }

    function removeFavorite(id) {
        setFavorites((prev) => prev.filter((x) => x !== id))
    }

    function togglePin(itemKey) {
        setPinned((prev) => {
            const cur = prev || []
            const exists = cur.includes(itemKey)
            const next = exists ? cur.filter((p) => p !== itemKey) : [itemKey, ...cur]
            localStorage.setItem('sb-pinned', JSON.stringify(next))
            return next
        })
    }

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark)
        if (isDark) localStorage.setItem('sb-dark', '1')
        else localStorage.removeItem('sb-dark')
    }, [isDark])

    useEffect(() => {
        const q = search.toLowerCase()
        // normalize selectedCharacter: allow either id or name
        const selCharName = (() => {
            if (!selectedCharacter) return null
            const byId = charactersData.find((c) => c.id === selectedCharacter)
            if (byId) return byId.name
            return selectedCharacter
        })()

        setStories(
            storiesData.filter((s) => {
                const chars = s.characters || []
                const matchesSearch = !q || s.title.toLowerCase().includes(q) || (s.excerpt || '').toLowerCase().includes(q) || chars.join(' ').toLowerCase().includes(q)
                const matchesCharacter = !selCharName || chars.includes(selCharName)
                return matchesSearch && matchesCharacter
            })
        )
    }, [search, selectedCharacter])

    const toggleDark = () => setIsDark((v) => !v)

    useEffect(() => {
        localStorage.setItem('sb-favs', JSON.stringify(favorites))
    }, [favorites])

    function toggleFavorite(id) {
        setFavorites((prev) => {
            const cur = prev || []
            if (cur.includes(id)) return cur.filter((x) => x !== id)
            return [...cur, id]
        })
    }

    // marquee character for header (rotate every 8s)
    const [marqueeChar, setMarqueeChar] = useState(() => charactersData[Math.floor(Math.random() * charactersData.length)])
    useEffect(() => {
        const id = setInterval(() => setMarqueeChar(charactersData[Math.floor(Math.random() * charactersData.length)]), 8000)
        return () => clearInterval(id)
    }, [])

    return (
        <BrowserRouter>
            <div className="min-h-screen">
                <HeaderArea
                    marqueeChar={marqueeChar}
                    search={search}
                    setSearch={setSearch}
                    isDark={isDark}
                    toggleDark={toggleDark}
                    charactersData={charactersData}
                    selectedCharacter={selectedCharacter}
                    setSelectedCharacter={setSelectedCharacter}
                />

                <Routes>
                    <Route path="/" element={<Dashboard stories={stories} favorites={favorites} recentlyViewed={recentlyViewed} clearRecent={clearRecent} removeRecent={removeRecent} clearFavorites={clearFavorites} removeFavorite={removeFavorite} pinned={pinned} togglePin={togglePin} />} />
                    <Route path="/home" element={<Home stories={stories} favorites={favorites} toggleFavorite={toggleFavorite} />} />
                    <Route path="/main-story" element={<MainStory recordView={recordView} />} />
                    <Route path="/dashboard" element={<Dashboard stories={stories} favorites={favorites} recentlyViewed={recentlyViewed} clearRecent={clearRecent} removeRecent={removeRecent} clearFavorites={clearFavorites} removeFavorite={removeFavorite} pinned={pinned} togglePin={togglePin} />} />
                    <Route path="/story/:id" element={<StoryDetail favorites={favorites} toggleFavorite={toggleFavorite} recordView={recordView} />} />
                    <Route path="/story/:id/chapter/:chapId" element={<ChapterDetail recordView={recordView} />} />
                    <Route path="/favorites" element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />} />
                    <Route path="/special-events" element={<SpecialEvents stories={stories} favorites={favorites} toggleFavorite={toggleFavorite} />} />
                    <Route path="/characters" element={<CharacterList />} />
                    <Route path="/character/:id" element={<CharacterDetail />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
