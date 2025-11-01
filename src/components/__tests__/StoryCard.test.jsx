import React from 'react'
import { render, screen } from '@testing-library/react'
import StoryCard from '../StoryCard'

const sample = {
    id: 'test',
    title: '测试故事',
    location: '某年',
    excerpt: '这是一段摘要',
    characters: ['甲', '乙']
}

test('renders StoryCard with title and excerpt', () => {
    render(<StoryCard story={sample} />)
    expect(screen.getByText('测试故事')).toBeInTheDocument()
    expect(screen.getByText('这是一段摘要')).toBeInTheDocument()
})
