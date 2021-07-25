import React, {useState, useEffect} from 'react'

import axios from 'axios'

const Card = (props) => {
    const [coin, setCoin]= useState([])
    const [pools, setPools] = useState([])
    const [miners, setMiners] = useState([])

    useEffect(async ()=> {
        const url = 'https://crypto-energy-api.herokuapp.com/coins/' + props.code
        const response = await axios.get(url);
        setCoin(response.data.info)
        console.log(response.data.info)
        setPools(response.data.pools)
        console.log(response.data.pools)
        setMiners(response.data.miners)
    }, [])


    return (
        <div className="card">
            <h2><b>{coin.name}:</b></h2>
            <h3>
                Hashrate: {coin.network_hashrate}
            </h3>
            <h3>
                Price: {coin.price}
            </h3>
            <p>
                <span><b>Pools: </b></span>
                {pools.map((pool, i) => {
                    return (
                        <span key={i}>{pool.url}: <em>{pool.hashrate}</em>      |      </span>
                    )
                })}
            </p>
            <p>
                <span><b>Miners: </b></span>
                {miners.map(miner => {
                    return (
                        <span>{miner.name}, </span>
                    )
                })}
            </p>
            
        </div>
    )
}

export default Card