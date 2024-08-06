'use client';

import React from 'react'
import CreatePost from './components/post/CreatePost'
import Posts from './components/post'

const SocialMedia = () => {
    return (
        <section className="my-4 mx-8 px-4 gap-6">
            <h6 className='text-lg font-semibold text-graphiteGray'>Social Media</h6>
            <CreatePost />
            <Posts />
        </section>
    )
}

export default SocialMedia