import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Card from './Card'

const Single = ({code, electricity}) => {
    const [info, setInfo] = useState('');
    const [retrieved, setRetrieved] = useState(false);

    useEffect(async () => {
        console.log(code)
        const url = 'https://api.minerstat.com/v2/coins?list=' + code;
        const response = await axios.get(url);
        setInfo(response.data[0])
        setRetrieved(true)
    }, [code])

    const renderCard = () => {
        if (! retrieved) {
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