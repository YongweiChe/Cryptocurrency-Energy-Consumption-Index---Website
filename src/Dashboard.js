import React, {useState, useEffect} from 'react'
import Card from './components/Card'
import axios from 'axios'

const Dashboard = () => {
    const [codes, setCodes] = useState([])
    const [infos, setInfos] = useState([])
    const [retrieved, setRetrieved] = useState(false)
    useEffect(async () => {
        const url = 'https://crypto-energy-api.herokuapp.com/coins';
        const response = await axios.get(url);
        const c = response.data
        let list = c[0].code;
        for (let i = 1; i < c.length; i++) {
            list += ',' + c[i].code
        }
        const url2 = 'https://api.minerstat.com/v2/coins?list=' + list;
        const response2 = await axios.get(url2);
        setCodes(c)
        setInfos(response2.data)
        setRetrieved(true)
    }, [])

    const renderCards = () => {
        if (!retrieved) {
            return (
                <h2>Loading...</h2>
            )
        }
        else {
            return (
                infos.map((info, i) => {
                    function isCorrect(myapi) {
                        return myapi.code === info.coin
                    }
                    let myCode = codes.find(isCorrect)
                    if (!myCode.time || !myCode.reward) {
                        return (
                            <span></span>
                        )
                    }
                    if (info.algorithm.toLowerCase().substring(0,3) !== myCode.algo.toLowerCase().substring(0,3)) {
                        return (
                            <span></span>
                        )
                    }
                    return (
                        <div key={i}>
                            <Card code={info.coin} info={info} electricity={0.1} />
                            <br />
                            <br />
                        </div>
                    )
                })            )
        }

    }

    return (
        <div>
            <br/>
            <h1 className="text-center">The Cryptocurrency Energy Consumption Index</h1>
            <br/>
                {renderCards()}
        </div>
    )
}

export default Dashboard