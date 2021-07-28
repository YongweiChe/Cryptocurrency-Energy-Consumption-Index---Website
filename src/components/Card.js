import React, {useState, useEffect} from 'react'
import Timeline from './Timeline'
import '../styles/Card.css'
import axios from 'axios'

const Card = ({code, info}) => {
    const [coin, setCoin]= useState([])
    const [pools, setPools] = useState([])
    const [miners, setMiners] = useState([])

    useEffect(async ()=> {
        const url = 'https://crypto-energy-api.herokuapp.com/coins/' + code
        const response = await axios.get(url);
        setCoin(response.data.info)
        setPools(response.data.pools)
        setMiners(response.data.miners)
    }, [])


    return (
        <div className="container card">
            <h2><b>{coin.name} ({info.coin}):</b></h2>
            <h3>
                Algorithm: {info.algorithm}<br/>
                Hashrate: {info.network_hashrate === -1 ? coin.network_hashrate : info.network_hashrate} H/S<br/>
                Block Time: {coin.time}<br/>
                Block Reward: {coin.reward}
            </h3>
            <h3>
                Price: ${info.price === -1 ? coin.price : info.price}
            </h3>
            <Timeline coin={info.coin} algorithm={info.algorithm}/>
            <p>
                <span><b>Pools: </b></span>
                {pools.map((pool, i) => {
                    return (
                        <span key={i}>{pool.url}: <em>{pool.hashrate}</em>, {pool.countries}     |      </span>
                    )
                })}
            </p>
            <p>
                <span><b>Miners: </b></span>
                {miners.map(miner => {
                    return (
                        <span>{miner.name}: {miner.hashrate} {miner.power} | </span>
                    )
                })}
            </p>
            
        </div>
    )
}

export default Card