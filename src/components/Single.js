import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Card from './Card'

const Single = ({code, electricity}) => {
    const [info, setInfo] = useState('');
    const [retrieved, setRetrieved] = useState(false);
    const [fail, setFail] = useState(false)
    useEffect(async () => {
        const url = 'https://api.minerstat.com/v2/coins?list=' + code;
        const response = await axios.get(url);
        if (response.data.length === 0) setFail(true)
        else {
            setInfo(response.data[0])
            setRetrieved(true)
        }
    }, [code])

    const renderCard = () => {
        if (fail) {
            return (
                <div>
                <h2>That coin is not in our database :(</h2>
                <br/>
                <h3>Remember to input the coin code and not the name! (e.g. enter <b>BTC</b> for Bitcoin)</h3>
                </div>
            )
        }
        else if (! retrieved) {
            return (
                <h2>Loading...</h2>
            )
        }
        else {
            return (
                <Card code={code} info={info} electricity={electricity}/>
            )
        }
    }

    return (
        <div>
            <br />
            {renderCard()}
        </div>
    )
}

export default Single