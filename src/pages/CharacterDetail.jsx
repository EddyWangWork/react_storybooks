import React from 'react'
import { useParams, Link } from 'react-router-dom'
import characters from '../data/characters'

export default function CharacterDetail() {
    const { id } = useParams()
    const c = characters.find((x) => x.id === id)

    if (!c) {
        return (
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">未找到人物</h2>
                <Link to="/characters" className="text-orange-600">返回人物索引</Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6">
            <Link to="/characters" className="text-sm text-gray-500">← 返回人物索引</Link>
            <div className="flex flex-col md:flex-row gap-6 mt-4">
                <img src={c.image} alt={c.name} className="w-48 h-48 object-cover rounded" />
                <div>
                    <h1 className="text-3xl font-bold">{c.name}</h1>
                    <p className="text-sm text-gray-600">{c.title}</p>
                    <p className="mt-4 text-gray-800">{c.bio}</p>
                </div>
            </div>
        </div>
    )
}
