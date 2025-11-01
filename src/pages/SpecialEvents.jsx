import React from 'react'
import storiesData from '../data/stories'
import StoryCard from '../components/StoryCard'

const SPECIAL_IDS = ['red-cliffs', 'three-kingdoms-pledge', 'guan-yu-crossing']

export default function SpecialEvents({ stories = storiesData, favorites = [], toggleFavorite } = {}) {
    const items = (stories || storiesData).filter((s) => SPECIAL_IDS.includes(s.id))

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">特别事件 (Special Events)</h1>
            <p className="mb-4 text-gray-600">本页收录《三国演义》中若干具有代表性的桥段与事件。</p>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {items.map((s) => (
                    <StoryCard key={s.id} story={s} isFavorited={(favorites || []).includes(s.id)} onToggleFavorite={toggleFavorite} />
                ))}
            </div>
        </div>
    )
}
