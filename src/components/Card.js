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
    const [showTimeline, setShowTimeline] = useState(false)

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

    const twoSigFig = (num) => {
        return (Math.round(num * 100) / 100)
    }
    const getPrefix = (num) => {
        const a = num.toString().indexOf('.')

        let len = num.toString().length;
        if (a !== -1) len = num.toString().substring(0, a).length;
        if (len > 21) {
            return (
                <span>
                    {twoSigFig(num / 1e21)} ZH/s
                </span>
            )
        }
        else if (len > 18) {
            return (
                <span>
                    {twoSigFig(num / 1e18)} EH/s
                </span>
            )
        }
        else if (len > 15) {
            return (
                <span>
                    {twoSigFig(num / 1e15)} PH/s
                </span>
            )
        }
        else if (len > 12) {
            return (
                <span>
                    {twoSigFig(num / 1e12)} TH/s
                </span>
            )
        }
        else if (len > 9) {
            return (
                <span>
                    {twoSigFig(num / 1e9)} GH/s
                </span>
            )
        }
        else if (len > 6) {
            return (
                <span>
                    {twoSigFig(num / 1e6)} MH/s
                </span>
            )
        }
        else if (len > 3) {
            return (
                <span>
                    {twoSigFig(num / 1e3)} kH/s
                </span>
            )
        }
        else {
            return (
                <span>
                    {twoSigFig(num)} H/s
                </span>
            )
        }
    }

    const renderTimeline = () => {
        if (showTimeline) {
            return <Timeline/>
        }
        else {
            return <span></span>
        }
    }

    return (
        <div className="container card">
            <h2><b>{coin.name} ({info.coin}):</b></h2>
            <h3>
                Algorithm: {info.algorithm}<br/>
                Hashrate: {info.network_hashrate === -1 ? `${coin.network_hashrate}` : getPrefix(info.network_hashrate)} <br/>
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
                <button onClick={handlePoolClick} className="btn btn-sm btn-outline-info">{expandPool ? 'show less' : 'show more'}</button>
            </p>
            <p>
                <span><b>Miners: </b></span>
                <DisplayMiners miners={miners} showAll={expandMiner}/>
                <button onClick={handleMinerClick} className="btn btn-sm btn-outline-info">{expandMiner ? 'show less' : 'show more'}</button>
            </p>
            
        </div>
    )
}

export default Card