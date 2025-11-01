import React from 'react'
import { Link } from 'react-router-dom'
import storiesData from '../data/stories'

const SPECIAL_IDS = ['red-cliffs', 'three-kingdoms-pledge', 'guan-yu-crossing']

export default function SpecialEventsBanner({ stories = storiesData, className = '' }) {
    const items = (stories || storiesData).filter((s) => SPECIAL_IDS.includes(s.id))

    if (!items.length) return null

    return (
        <section className={`special-banner my-6 ${className}`}>
            <h3 className="text-lg font-semibold text-orange-200 mb-3">特别事件精选</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
                {items.map((s) => (
                    <Link key={s.id} to={`/story/${s.id}`} className="min-w-[220px] flex-shrink-0 card-shadow bg-gradient-to-br from-white/5 to-white/2">
                        <div className="p-4">
                            <div className="text-sm text-orange-300">事件</div>
                            <h4 className="text-lg font-semibold mt-1">{s.title}</h4>
                            <p className="text-sm text-gray-300 mt-2 line-clamp-2">{s.excerpt}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
