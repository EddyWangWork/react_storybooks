import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import stories from '../data/stories'
import ReactMarkdown from 'react-markdown'

export default function ChapterDetail({ recordView } = {}) {
    const { id, chapId } = useParams()
    const story = stories.find((s) => s.id === id)
    if (!story) {
        return (
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">未找到故事</h2>
                <Link to="/" className="text-orange-600">返回首页</Link>
            </div>
        )
    }

    const chapter = story.chapters?.find((c) => c.id === chapId)
    if (!chapter) {
        return (
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">未找到章节</h2>
                <Link to={`/story/${id}`} className="text-orange-600">返回故事</Link>
            </div>
        )
    }

    const navigate = useNavigate()

    useEffect(() => {
        if (recordView && chapter) {
            recordView({ type: 'chapter', id, chapId: chapter.id, title: chapter.title })
        }

        function onKey(e) {
            if (e.key === 'ArrowLeft') {
                const idx = story.chapters.findIndex((c) => c.id === chapter.id)
                const prev = idx > 0 ? story.chapters[idx - 1] : null
                if (prev) navigate(`/story/${id}/chapter/${prev.id}`)
            }
            if (e.key === 'ArrowRight') {
                const idx = story.chapters.findIndex((c) => c.id === chapter.id)
                const next = idx < story.chapters.length - 1 ? story.chapters[idx + 1] : null
                if (next) navigate(`/story/${id}/chapter/${next.id}`)
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [chapter, id, navigate, story.chapters])

    return (
        <div className="container mx-auto p-6">
            <Breadcrumbs items={[{ to: '/', label: '首页' }, { to: `/story/${id}`, label: story.title }, { label: chapter.label, current: true }]} />

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold mt-0">{chapter.label} · {chapter.title}</h1>
                <div className="flex gap-2">
                    {/* Prev / Next buttons */}
                    {(() => {
                        const idx = story.chapters.findIndex((c) => c.id === chapter.id)
                        const prev = idx > 0 ? story.chapters[idx - 1] : null
                        const next = idx < story.chapters.length - 1 ? story.chapters[idx + 1] : null
                        return (
                            <>
                                {prev ? (
                                    <Link to={`/story/${id}/chapter/${prev.id}`} className="px-3 py-1 bg-gray-200 rounded">上一回</Link>
                                ) : (
                                    <button className="px-3 py-1 bg-gray-100 rounded text-gray-400" disabled>上一回</button>
                                )}
                                {next ? (
                                    <Link to={`/story/${id}/chapter/${next.id}`} className="px-3 py-1 bg-orange-500 text-white rounded">下一回</Link>
                                ) : (
                                    <button className="px-3 py-1 bg-gray-100 rounded text-gray-400" disabled>下一回</button>
                                )}
                            </>
                        )
                    })()}
                </div>
            </div>

            <div className="mt-4 md:flex gap-6">
                <aside className="md:w-64 hidden md:block">
                    <div className="card-shadow sticky top-6">
                        <strong className="block mb-2">章回目录</strong>
                        <ol className="list-decimal ml-5">
                            {story.chapters.map((c) => (
                                <li key={c.id} className={`mb-1 ${c.id === chapter.id ? 'font-semibold text-orange-500' : ''}`}>
                                    <Link to={`/story/${id}/chapter/${c.id}`}>{c.label} {c.title}</Link>
                                </li>
                            ))}
                        </ol>
                    </div>
                </aside>

                <article className="prose dark:prose-invert md:flex-1">
                    <ReactMarkdown>{chapter.content}</ReactMarkdown>
                </article>
            </div>
        </div>
    )
}
