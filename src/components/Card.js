import React, {useState, useEffect} from 'react'
import Timeline from './Timeline'
import Consumption from './Consumption'
import DisplayPools from './DisplayPools'
import DisplayMiners from './DisplayMiners'
import '../styles/Card.css'
import axios from 'axios'

const Card = ({code, info, electricity}) => {
    const [coin, setCoin]= useState([])
    const [pools, setPools] = useState([])
    const [miners, setMiners] = useState([])
    const [expandPool, setExpandPool] = useState(false)
    const [expandMiner, setExpandMiner] = useState(false)

    useEffect(async ()=> {
        const url = 'https://crypto-energy-api.herokuapp.com/coins/' + code
        const response = await axios.get(url);
        setCoin(response.data.info)
        setPools(response.data.pools)
        setMiners(response.data.miners)
    }, [code])

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }   

    const handlePoolClick = e => {
        e.preventDefault()
        setExpandPool(() => {
            return !expandPool
        })
    }

    const handleMinerClick = e => {
        e.preventDefault()
        setExpandMiner(() => {
            return !expandMiner
        })
    }

    return (
        <div className="container card">
            <h2><b>{coin.name} ({info.coin}):</b></h2>
            <h3>
                Algorithm: {info.algorithm}<br/>
                Hashrate: {info.network_hashrate === -1 ? `${coin.network_hashrate}` : `${info.network_hashrate} H/s`} <br/>
                Block Time: {coin.time}<br/>
                Block Reward: {coin.reward} {info.coin}
            </h3>
            <h3>
                Price: ${info.price === -1 ? coin.price : info.price}
            </h3>
            <Consumption
                hashrate={(info.network_hashrate !== -1) ? info.network_hashrate : coin.network_hashrate}
                time={coin.time}
                reward={coin.reward}
                price={info.price}
                electricity={electricity}
                miner={miners[0]}
            />
            <p>
                <span><b>Pools: </b></span>
                <DisplayPools pools={pools} showAll={expandPool}/>
                <button onClick={handlePoolClick} class="btn">{expandPool ? 'show less' : 'show more'}</button>
            </p>
            <p>
                <span><b>Miners: </b></span>
                <DisplayMiners miners={miners} showAll={expandMiner}/>
                <button onClick={handleMinerClick} class="btn">{expandMiner ? 'show less' : 'show more'}</button>
            </p>
            
        </div>
    )
}

export default Card