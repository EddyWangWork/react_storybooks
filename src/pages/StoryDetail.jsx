import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import stories from '../data/stories'
import ReactMarkdown from 'react-markdown'

function slugify(text) {
    return String(text)
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

function extractHeadings(md) {
    const lines = md.split(/\r?\n/)
    const headings = []
    for (const line of lines) {
        const m = line.match(/^(#{1,6})\s+(.*)/)
        if (m) {
            const level = m[1].length
            const text = m[2].trim()
            headings.push({ level, text, id: slugify(text) })
        }
    }
    return headings
}

export default function StoryDetail({ favorites = [], toggleFavorite, recordView } = {}) {
    const { id } = useParams()
    const story = stories.find((s) => s.id === id)

    if (!story) {
        return (
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">未找到故事</h2>
                <p className="mb-4">抱歉，未能在本地数据中找到对应的故事条目。</p>
                <Link to="/" className="text-orange-600">返回首页</Link>
            </div>
        )
    }

    const content = story.content || (`## 摘要\n\n${story.excerpt}`)
    const headings = extractHeadings(content)

    useEffect(() => {
        if (recordView && story) {
            recordView({ type: 'story', id: story.id, title: story.title })
        }
    }, [recordView, story])

    const components = {
        h1: ({ node, ...props }) => <h1 id={slugify(props.children)} {...props} />,
        h2: ({ node, ...props }) => <h2 id={slugify(props.children)} {...props} />,
        h3: ({ node, ...props }) => <h3 id={slugify(props.children)} {...props} />,
    }

    return (
        <div className="container mx-auto p-6">
            <Breadcrumbs items={[{ to: '/', label: '首页' }, { label: story.title, current: true }]} />

            <div className="flex items-center gap-4 mt-2 mb-2">
                <h1 className="text-3xl font-bold">{story.title}</h1>
                <button
                    onClick={() => toggleFavorite && toggleFavorite(story.id)}
                    className="text-xl"
                    aria-label={favorites?.includes(story.id) ? '移除收藏' : '添加收藏'}
                >
                    {favorites?.includes(story.id) ? '❤️' : '🤍'}
                </button>
                <button
                    onClick={() => {
                        const url = window.location.origin + `/story/${story.id}`
                        navigator.clipboard?.writeText(url)
                        alert('已复制链接到剪贴板')
                    }}
                    className="ml-2 text-sm px-3 py-1 bg-gray-100 rounded"
                >
                    分享
                </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">{story.location}</p>

            <div className="grid md:grid-cols-4 gap-6 items-start">
                <aside className="md:col-span-1 hidden md:block">
                    <div className="card-shadow sticky top-6">
                        <strong className="block mb-2">目录</strong>
                        <ul className="text-sm space-y-1">
                            {headings.map((h) => (
                                <li key={h.id} className={`ml-${(h.level - 1) * 2}`}>
                                    <a href={`#${h.id}`} className="text-orange-600">{h.text}</a>
                                </li>
                            ))}
                        </ul>

                        {story.chapters?.length ? (
                            <>
                                <hr className="my-3" />
                                <strong className="block mb-2">章回目录</strong>
                                <ol className="text-sm list-decimal ml-4">
                                    {story.chapters.map((c) => (
                                        <li key={c.id} className="mb-1">
                                            <Link to={`/story/${story.id}/chapter/${c.id}`} className="text-orange-600">{c.label}：{c.title}</Link>
                                        </li>
                                    ))}
                                </ol>
                            </>
                        ) : null}
                    </div>
                </aside>

                <article className="prose dark:prose-invert md:col-span-3">
                    <ReactMarkdown components={components}>{content}</ReactMarkdown>
                </article>
            </div>

            <div className="mt-6">
                <h3 className="font-semibold">登场人物</h3>
                <ul className="list-disc ml-6 mt-2">
                    {story.characters.map((c) => (
                        <li key={c}>{c}</li>
                    ))}
                </ul>
            </div>

            {story.notes?.length ? (
                <div className="mt-6">
                    <h3 className="font-semibold">注释</h3>
                    <ul className="list-disc ml-6 mt-2">
                        {story.notes.map((n) => (
                            <li key={n.id}>{n.text}</li>
                        ))}
                    </ul>
                </div>
            ) : null}

            {story.sources?.length ? (
                <div className="mt-6">
                    <h3 className="font-semibold">资料来源</h3>
                    <ul className="list-disc ml-6 mt-2">
                        {story.sources.map((s, i) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </div>
    )
}
