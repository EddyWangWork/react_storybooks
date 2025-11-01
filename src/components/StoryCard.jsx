import React from 'react'
import { Link } from 'react-router-dom'

export default function StoryCard({ story, isFavorited = false, onToggleFavorite = () => { } }) {
    return (
        <article className="card-shadow flex flex-col h-full transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
            <div className="mb-4">
                {story.image ? (
                    <img src={story.image} alt={story.title} className="w-full h-44 md:h-48 object-cover rounded-md mb-4" />
                ) : (
                    <div className="h-44 md:h-48 w-full bg-gradient-to-r from-orange-200 to-red-200 rounded-md mb-4"></div>
                )}
                <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg md:text-2xl font-semibold mb-1 truncate">{story.title}</h2>
                    <button
                        aria-label={isFavorited ? '移除收藏' : '添加收藏'}
                        onClick={() => onToggleFavorite(story.id)}
                        className="ml-2 text-xl"
                    >
                        {isFavorited ? '❤️' : '🤍'}
                    </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">{story.location}</p>
                <p className="text-gray-700 dark:text-gray-200 mb-4 line-clamp-4">{story.excerpt}</p>
            </div>

            <div className="mt-auto">
                <div className="mt-4">
                    <h3 className="text-sm font-semibold mb-2">登场人物</h3>
                    <div className="flex flex-wrap gap-2">
                        {(story.characters || []).map((c) => (
                            <span key={c} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">{c}</span>
                        ))}
                    </div>
                </div>

                <div className="mt-4 text-right">
                    <Link to={`/story/${story.id}`} className="inline-block px-3 py-2 bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600">阅读更多 →</Link>
                </div>
            </div>
        </article>
    )
}
