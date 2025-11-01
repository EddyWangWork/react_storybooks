import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import stories from '../data/stories'
import ReactMarkdown from 'react-markdown'

// This page surfaces the main opening chapter as a standalone page.
export default function MainStory({ recordView } = {}) {
    const story = stories.find((s) => s.id === 'three-kingdoms-pledge')
    if (!story) {
        return (
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">未找到故事</h2>
                <Link to="/" className="text-orange-600">返回首页</Link>
            </div>
        )
    }

    const chapter = story.chapters?.find((c) => c.id === 'peach-1')
    if (!chapter) {
        return (
            <div className="container mx-auto p-6">
                <h2 className="text-2xl font-bold mb-4">未找到章节</h2>
                <Link to={`/story/${story.id}`} className="text-orange-600">返回故事</Link>
            </div>
        )
    }

    useEffect(() => {
        if (recordView) recordView({ type: 'chapter', id: story.id, chapId: chapter.id, title: chapter.title })
    }, [recordView, story, chapter])

    return (
        <div className="container mx-auto p-6">
            <Breadcrumbs items={[{ to: '/', label: '首页' }, { to: `/story/${story.id}`, label: story.title }, { label: chapter.label + ' · ' + chapter.title, current: true }]} />

            <h1 className="text-2xl font-bold mb-3">{chapter.label} · {chapter.title}</h1>
            <p className="text-sm text-gray-600 mb-4">{story.location}</p>

            <article className="prose dark:prose-invert">
                <ReactMarkdown>{chapter.content}</ReactMarkdown>
            </article>
        </div>
    )
}
