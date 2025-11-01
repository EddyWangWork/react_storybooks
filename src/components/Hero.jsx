import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero({ featured } = {}) {
    return (
        <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold">三国演义 — StoryBooks</h1>
            <p className="mt-3 max-w-2xl text-lg opacity-90">
                一个以《三国演义》故事为主题的示例前端，包含经典桥段、人物卡片与故事摘录。
            </p>

            {featured ? (
                <div className="mt-6 p-4 bg-white/10 rounded-lg hero-animate">
                    <div className="text-sm text-orange-300">{featured.label}</div>
                    <h2 className="text-2xl font-semibold mt-1">{featured.title}</h2>
                    <p className="mt-2 text-sm opacity-90">{featured.subtitle}</p>
                    {featured.link ? (
                        <Link to={featured.link} className="inline-block mt-3 px-4 py-2 bg-orange-500 text-white rounded btn-shine">前往</Link>
                    ) : null}
                </div>
            ) : null}
        </div>
    )
}
