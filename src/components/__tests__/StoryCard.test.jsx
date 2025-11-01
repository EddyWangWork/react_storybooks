import React from 'react'
import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)
import { MemoryRouter } from 'react-router-dom'
import StoryCard from '../StoryCard'

const sample = {
    id: 'test',
    title: '测试故事',
    location: '某年',
    excerpt: '这是一段摘要',
    characters: ['甲', '乙']
}

test('renders StoryCard with title and excerpt', () => {
    render(
        <MemoryRouter>
            <StoryCard story={sample} />
        </MemoryRouter>
    )
    expect(screen.getByText('测试故事')).toBeInTheDocument()
    expect(screen.getByText('这是一段摘要')).toBeInTheDocument()
})
