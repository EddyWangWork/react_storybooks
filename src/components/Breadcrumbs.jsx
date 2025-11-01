import React from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items = [] }) {
    if (!items.length) return null
    return (
        <nav className="text-sm text-gray-500 mb-2" aria-label="Breadcrumb">
            {items.map((it, i) => (
                <span key={i}>
                    {it.to && !it.current ? (
                        <Link to={it.to} className="text-gray-500 hover:text-orange-600">{it.label}</Link>
                    ) : (
                        <span className={it.current ? 'text-gray-800 dark:text-gray-200' : ''}>{it.label}</span>
                    )}
                    {i < items.length - 1 && <span className="px-2">/</span>}
                </span>
            ))}
        </nav>
    )
}
