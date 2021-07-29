import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { AreaChart, XAxis, YAxis, Area, Tooltip} from 'recharts';

const Timeline = ({coin, algorithm, time, reward, electricity, miner}) => {
    const [resp, setResp] = useState([]);
    const [received, setReceived] = useState(false)
    const [rawData, setRawData] = useState([])

    useEffect(async ()=> {
        const url = 'https://api.minerstat.com/v2/coins-history?time=21627252200&coin=' + coin + '&algo=' + algorithm
        const response = await axios.get(url);
        setResp(response)
        setReceived(true)
    }, [])

    const calcUpper = (price) => {
        let timeSec = -1;
        let parsedRew = -1;
        if (time) timeSec = parseFloat(time.replace(',',''), 10)
        if (reward) parsedRew = parseFloat(reward.replace(',',''), 10)
        if (time && time.includes("minute")) {
            timeSec = timeSec * 60;
        }
        let profit = price *  parsedRew / timeSec;
        let upperEC = profit * 3.6 * 1000000 / electricity;
        return Math.round(upperEC)
    }


    const calcLower = (hashrate) => {
        if (miner) {
            let networkHR = hashrate
            if (typeof hashrate === "string") {
                networkHR = parseStringHashrate(hashrate)
            }
            const hr = parseInt(miner.hashrate) * unitConvert(miner.hashrate.charAt(miner.hashrate.length - 1))
            const pw = parseInt(miner.power)
            let lowerEC = networkHR / hr * pw
            return Math.round(lowerEC)
        }
        return -1
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }   

    const unitConvert = (c) => {
        if (c === 'K') return 1e3;
        else if (c === 'M') return 1e6;
        else if (c === 'G') return 1e9;
        else if (c === 'T') return 1e12;
        else if (c === 'P') return 1e15;
        else return -1
    }
    const parseStringHashrate = (str) => {
        return parseFloat(str) * unitConvert(str.charAt(str.length - 4))
    }
    function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year;
  return time;
}
    const getData = () => {
        const data = resp.data
        let count = Object.keys(data[coin]).length;
        let dataArr = []
        let delta = Math.floor(count / 20)
        let keys = Object.keys(data[coin])
        for (let i = delta; i < count; i += delta) {
            let key = keys[i]
            let lb = calcLower(data[coin][key][1]) * -1 / 1e3;
            let ub = calcUpper(data[coin][key][3]) / 1e3;
            let date = timeConverter(key)
            const point = {
                "date": date,
                "bounds": [
                    lb,
                    ub
                ],
                "hashrate": data[coin][key][1],
                "price": data[coin][key][3]
            }
            dataArr.push(point)
        }
        return dataArr
    }

    const renderData = () => {
        if (received) {
            let rawData = getData()
            console.log(rawData)
            return (
                <div>
                <AreaChart
                    width={1000}
                    height={250}
                    data={rawData}
                    margin={{
                        top: 20, right: 20, bottom: 20, left: 20,
                    }}
                    >
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Area dataKey="bounds" stroke="goldenrod" fill="gold" />
                    <Tooltip />
                </AreaChart>
                </div>
            )
        }
        else {
            return (
                <div>Loading...</div>
            )
        }
    }

    return (
        <div id="model" className="justify-content-center">
            {renderData()}
        </div>
    )
}

export default Timeline