import React from 'react'

const DisplayPools = ({pools, showAll}) => {
    
    const renderPools = (expand) => {
        return (
            pools.map((pool, i) => {
                if (!expand && i >= 10) {
                    return <span key={i}></span>
                }
                return (
                    <span key={i}>{pool.url}: <em>{pool.hashrate}</em>, {pool.countries}     |      </span>
                )
                })
        )
    }

    return (
        <span>
            {renderPools(showAll)}
        </span>
    )
}

export default DisplayPools