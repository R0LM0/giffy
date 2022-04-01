import React from 'react'
import { Link } from 'wouter'
import './Gif.css'


export default function Gif({ title, url, id }) {
    return (
        <div className='Gif'>
            <Link to={`/gif/${id}`} className='Gif-link'>
                <h4>{title}</h4>
                <img loading='lazy' src={url} alt={title} />
            </Link>
        </div>
    )
}