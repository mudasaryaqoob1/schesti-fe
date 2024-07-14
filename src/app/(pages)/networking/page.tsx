'use client';
import React from 'react'
import SearchFilters from './components/SearchFilters';
import Network from './components/Nework';

const Networking = () => {

    return (
        <section className="my-4 grid grid-cols-5 mx-8 px-4 gap-6">
            <SearchFilters />
            <Network />
        </section>

    )
}

export default Networking