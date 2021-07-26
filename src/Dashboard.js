import React, {useState, useEffect} from 'react'
import Card from './components/Card'
import axios from 'axios'

const Dashboard = () => {
    const [codes, setCodes] = useState([])
    const [infos, setInfos] = useState([])
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
        console.log(response2.data)
        console.log(c)
        setCodes(c)
        setInfos(response2.data)
    }, [])


    return (
        <div>
            <h1>The Cryptocurrency Energy Consumption Index</h1>

            <p>
                {infos.map((info, i) => {
                    function isCorrect(myapi) {
                        return myapi.code === info.coin
                    }
                    let myCode = codes.find(isCorrect)
                    if (!myCode.time) {
                        return (
                            <span></span>
                        )
                    }
                    if (info.algorithm.toLowerCase().substring(0,3) !== myCode.algo.toLowerCase().substring(0,3)) {
                        console.log(info.algorithm)
                        console.log(codes.find(isCorrect).algo)
                        return (
                            <span></span>
                        )
                    }
                    
                    return (
                        <Card key={i} code={info.coin} info={info}/>
                    )
                })}
            </p>
        </div>
    )
}

export default Dashboard