import React, {useEffect} from 'react'
import axios from 'axios'

const Timeline = ({coin, algorithm}) => {
    useEffect(async ()=> {
        const url = 'https://api.minerstat.com/v2/coins-history?time=21627252200&coin=' + coin + '&algo=' + algorithm
        const response = await axios.get(url);
    }, [])
    return (
        <div>
            {coin}<br/>
            {algorithm}
        </div>
    )
}

export default Timeline