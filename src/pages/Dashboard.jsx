import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import storiesData from '../data/stories'
import NAV_ITEMS from '../config/nav'
import charactersData from '../data/characters'

export default function Dashboard({ stories = [], favorites = [], recentlyViewed = [], clearRecent, removeRecent, clearFavorites, removeFavorite, pinned = [], togglePin } = {}) {
    const [toast, setToast] = useState(null)
    const [marqueeChar, setMarqueeChar] = useState(() => charactersData[Math.floor(Math.random() * charactersData.length)])

    useEffect(() => {
        if (!toast) return
        const id = setTimeout(() => setToast(null), 2000)
        return () => clearTimeout(id)
    }, [toast])

    // rotate marquee character every 8 seconds
    useEffect(() => {
        const id = setInterval(() => {
            setMarqueeChar(charactersData[Math.floor(Math.random() * charactersData.length)])
        }, 8000)
        return () => clearInterval(id)
    }, [])
    const total = stories.length || storiesData.length
    const favCount = (favorites || []).length
    const specialIds = ['red-cliffs', 'three-kingdoms-pledge', 'guan-yu-crossing']
    const special = (stories || storiesData).filter((s) => specialIds.includes(s.id))

    // compute most viewed from recentlyViewed
    const counts = {}
        ; (recentlyViewed || []).forEach((r) => {
            const key = r.type === 'chapter' ? `${r.id}::${r.chapId}` : `${r.id}`
            counts[key] = (counts[key] || 0) + 1
        })
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5)

    function titleForKey(key) {
        const [id, chap] = key.split('::')
        const story = storiesData.find((s) => s.id === id)
        if (!story) return key
        if (chap) {
            const ch = story.chapters?.find((c) => c.id === chap)
            return `${story.title} — ${ch ? `${ch.label} ${ch.title}` : chap}`
        }
        return story.title
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold mb-4">仪表盘 (Dashboard)</h1>
                <div className="flex gap-2">
                    <button onClick={() => {
                        if (window.confirm('确定要清除最近浏览记录吗？')) { clearRecent(); setToast('最近浏览已清除') }
                    }} className="px-3 py-1 bg-gray-200 rounded text-sm">清除最近浏览</button>
                    <button onClick={() => {
                        if (window.confirm('确定要清除所有收藏吗？')) { clearFavorites(); setToast('收藏已清除') }
                    }} className="px-3 py-1 bg-gray-200 rounded text-sm">清除收藏</button>
                    <button onClick={() => {
                        const data = JSON.stringify(recentlyViewed || [], null, 2)
                        const blob = new Blob([data], { type: 'application/json' })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.href = url
                        a.download = 'recently-viewed.json'
                        a.click()
                        URL.revokeObjectURL(url)
                        setToast('已导出最近记录')
                    }} className="px-3 py-1 bg-gray-200 rounded text-sm">导出最近记录</button>
                </div>
            </div>

            {/* marquee + character intro */}
            {/* <div className="mt-4 mb-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-1">
                    <div className="marquee bg-white/5 rounded-md p-3">
                        <span className="marquee-inner text-white/90">
                            {marqueeChar ? `✨ ${marqueeChar.name} — ${marqueeChar.title} — ${marqueeChar.bio}` : ''}
                        </span>
                    </div>
                </div>

                <div className="w-full md:w-56 bg-white/5 rounded-md p-3 flex gap-3 items-start">
                    <img src={marqueeChar?.image} alt={marqueeChar?.name} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                    <div>
                        <div className="text-sm font-semibold">{marqueeChar?.name}</div>
                        <div className="text-xs text-gray-300">{marqueeChar?.title}</div>
                        <div className="text-xs text-gray-400 mt-2 line-clamp-3">{marqueeChar?.bio}</div>
                    </div>
                </div>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Link to="/main-story" className="p-6 bg-white/5 rounded-xl block hover:shadow-lg transition">
                    <div className="text-sm text-gray-400">故事总数</div>
                    <div className="text-3xl font-extrabold">{total}</div>
                </Link>
                <div className="p-6 bg-white/5 rounded-xl">
                    <div className="text-sm text-gray-400">收藏</div>
                    <div className="text-3xl font-extrabold">{favCount}</div>
                    <Link to="/favorites" className="text-sm text-orange-500 mt-2 inline-block">查看收藏 →</Link>
                </div>
                <div className="p-6 bg-white/5 rounded-xl">
                    <div className="text-sm text-gray-400">{NAV_ITEMS.find(n => n.to === '/special-events')?.label || '特别事件'}</div>
                    <div className="text-3xl font-extrabold">{special.length}</div>
                    <Link to="/special-events" className="text-sm text-orange-500 mt-2 inline-block">{NAV_ITEMS.find(n => n.to === '/special-events')?.label || '特别事件'}</Link>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">已置顶</h2>
                {pinned?.length ? (
                    <ol className="space-y-2">
                        {pinned.map((key) => {
                            const [id, chap] = key.split('::')
                            return (
                                <li key={key} className="flex items-center gap-3 bg-white/6 p-3 rounded-md">
                                    <div className="flex-1">
                                        {chap ? (
                                            <Link to={`/story/${id}/chapter/${chap}`} className="text-orange-500 font-medium">{titleForKey(key)}</Link>
                                        ) : (
                                            <Link to={`/story/${id}`} className="text-orange-500 font-medium">{titleForKey(key)}</Link>
                                        )}
                                    </div>
                                    <button onClick={() => { togglePin(key); setToast(pinned?.includes(key) ? '已取消置顶' : '已置顶') }} className="px-3 py-1 text-sm bg-white/10 rounded">取消</button>
                                </li>
                            )
                        })}
                    </ol>
                ) : (
                    <p className="text-sm text-gray-500">暂无置顶项。</p>
                )}

                <h2 className="text-xl font-semibold mb-2 mt-4">最近浏览</h2>
                {recentlyViewed?.length ? (
                    <ol className="space-y-2">
                        {recentlyViewed.map((r) => {
                            const key = `${r.type === 'chapter' ? `${r.id}::${r.chapId}` : `${r.id}`}`
                            const isPinned = pinned?.includes(key)
                            return (
                                <li key={key} className="flex items-center gap-3 bg-white/6 p-3 rounded-md">
                                    <div className="flex-1">
                                        <Link to={r.type === 'chapter' ? `/story/${r.id}/chapter/${r.chapId}` : `/story/${r.id}`} className="text-orange-500 font-medium">{titleForKey(key)}</Link>
                                        <div className="text-xs text-gray-400">{r.ts ? new Date(r.ts).toLocaleString() : ''}</div>
                                    </div>
                                    <button onClick={() => { togglePin(key); setToast(isPinned ? '已取消置顶' : '已置顶') }} className="px-3 py-1 text-sm bg-white/10 rounded">{isPinned ? '取消' : '置顶'}</button>
                                    <button onClick={() => { if (window.confirm('确定要移除此记录吗？')) { removeRecent(key); setToast('已移除') } }} className="px-3 py-1 text-sm bg-red-600 text-white rounded">移除</button>
                                </li>
                            )
                        })}
                    </ol>
                ) : (
                    <p className="text-sm text-gray-500">暂无记录。浏览故事或章节以在此处显示。</p>
                )}
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">最常浏览</h2>
                {top.length ? (
                    <ol className="list-decimal ml-6 space-y-2">
                        {top.map(([k, cnt]) => {
                            return (
                                <li key={k}>
                                    <Link to={k.includes('::') ? `/story/${k.split('::')[0]}/chapter/${k.split('::')[1]}` : `/story/${k}`} className="text-orange-600">{cnt} 次 — {titleForKey(k)}</Link>
                                </li>
                            )
                        })}
                    </ol>
                ) : (
                    <p className="text-sm text-gray-500">暂无统计。</p>
                )}
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">快速操作</h2>
                <div className="flex gap-3">
                    <Link to={`/story/${(stories && stories.length ? stories : storiesData)[Math.floor(Math.random() * (stories && stories.length ? stories.length : storiesData.length))].id}`} className="px-4 py-2 bg-orange-500 text-white rounded">随机故事</Link>
                    <Link to="/" className="px-4 py-2 bg-gray-200 rounded">回到首页</Link>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">收藏列表</h2>
                {favorites?.length ? (
                    <ul className="list-disc ml-6">
                        {favorites.map((id) => {
                            const story = storiesData.find((s) => s.id === id)
                            return (
                                <li key={id} className="flex items-center gap-3">
                                    <Link to={`/story/${id}`} className="text-orange-600">{story ? story.title : id}</Link>
                                    <button onClick={() => { if (window.confirm('确定要移除此收藏吗？')) { removeFavorite && removeFavorite(id); setToast('收藏已移除') } }} className="px-2 py-1 text-sm text-gray-600">移除收藏</button>
                                </li>
                            )
                        })}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500">暂无收藏。</p>
                )}
            </div>
            {toast ? (
                <div role="status" aria-live="polite" className="fixed right-6 bottom-6 bg-black/80 text-white px-4 py-2 rounded">{toast}</div>
            ) : null}
        </div>
    )
}
