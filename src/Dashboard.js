import React, {useState, useEffect} from 'react'
import Card from './components/Card'
import axios from 'axios'

const Dashboard = () => {
    const [codes, setCodes] = useState([])
    useEffect(async () => {
        const url = 'https://crypto-energy-api.herokuapp.com/coins'
        const response = await axios.get(url);
        setCodes(response.data)
    }, [])


    return (
        <div>
            <h1>The Cryptocurrency Energy Consumption Index</h1>

            <p>
                {codes.map(info => {
                    return (
                        <Card code={info.code} />
                    )
                })}
            </p>
        </div>
    )
}

export default Dashboard