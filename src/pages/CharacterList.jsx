import React from 'react'
import { Link } from 'react-router-dom'
import characters from '../data/characters'

export default function CharacterList() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">人物索引</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {characters.map((c) => (
                    <article key={c.id} className="card-shadow">
                        <img src={c.image} alt={c.name} className="w-full h-40 object-cover rounded mb-4" />
                        <h2 className="text-xl font-semibold">{c.name}</h2>
                        <p className="text-sm text-gray-600">{c.title}</p>
                        <p className="mt-2 text-sm text-gray-800 line-clamp-3">{c.bio}</p>
                        <div className="mt-4 text-right">
                            <Link to={`/character/${c.id}`} className="text-orange-600">查看详情 →</Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}
