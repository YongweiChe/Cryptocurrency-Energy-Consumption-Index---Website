import React from 'react'
import "../styles/Card.css"
const Consumption = (props) => {


    const calcUpper = () => {
        if (props.miner) console.log(props)
        let timeSec = -1;
        let parsedRew = -1;
        if (props.time) timeSec = parseFloat(props.time.replace(',',''), 10)
        if (props.reward) parsedRew = parseFloat(props.reward.replace(',',''), 10)
        console.log(parsedRew)
        if (props.time && props.time.includes("minute")) {
            console.log("here")
            timeSec = timeSec * 60;
        }
        let profit = props.price *  parsedRew / timeSec;
        let upperEC = profit * 3.6 * 1000000 / props.electricity;
        return numberWithCommas(Math.round(upperEC))
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

    const calcLower = () => {
        if (props.miner) {
            let networkHR = props.hashrate
            if (typeof props.hashrate === "string") {
                console.log("found")
                networkHR = parseStringHashrate(props.hashrate)
            }
            const hr = parseInt(props.miner.hashrate) * unitConvert(props.miner.hashrate.charAt(props.miner.hashrate.length - 1))
            const pw = parseInt(props.miner.power)
            let lowerEC = networkHR / hr * pw
            return numberWithCommas(Math.round(lowerEC))
        }
        return -1
    }

    const renderBound = (val) => {
        return (
            <span>
                {val} J/s
            </span>
        )
    }
    return (
        <div className="container">
            <br/>
            <h2 id="Estimation">
                Energy Consumption: <em>{renderBound(calcLower())} - {renderBound(calcUpper())}</em>
            </h2>
            <br/>
        </div>
    )
}

export default Consumption