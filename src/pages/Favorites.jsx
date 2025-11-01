import React from 'react'
import storiesData from '../data/stories'
import StoryCard from '../components/StoryCard'

export default function Favorites({ favorites = [], toggleFavorite }) {
    const favs = favorites || []
    const items = storiesData.filter((s) => favs.includes(s.id))

    if (!items.length) {
        return (
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">我的收藏</h1>
                <p>你还没有收藏任何故事。</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">我的收藏</h1>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {items.map((s) => (
                    <StoryCard key={s.id} story={s} isFavorited={favs.includes(s.id)} onToggleFavorite={toggleFavorite} />
                ))}
            </div>
        </div>
    )
}
