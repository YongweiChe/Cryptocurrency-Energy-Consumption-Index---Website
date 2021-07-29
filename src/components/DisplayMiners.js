import React from 'react'

const DisplayMiners = ({miners, showAll}) => {
    
    const renderPools = (expand) => {
        return (
            miners.map((miner, i) => {
                 if (!expand && i >= 10) {
                    return <span></span>
                }
                return (
                    <span>{miner.name}: {miner.hashrate} {miner.power} | </span>
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

export default DisplayMiners