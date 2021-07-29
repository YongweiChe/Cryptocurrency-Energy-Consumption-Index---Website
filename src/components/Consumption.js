import React from 'react'
import "../styles/Card.css"
const Consumption = (props) => {


    const calcUpper = () => {
        let timeSec = -1;
        let parsedRew = -1;
        if (props.time) timeSec = parseFloat(props.time.replace(',',''), 10)
        if (props.reward) parsedRew = parseFloat(props.reward.replace(',',''), 10)
        if (props.time && props.time.includes("minute")) {
            timeSec = timeSec * 60;
        }
        let profit = props.price *  parsedRew / timeSec;
        let upperEC = profit * 3.6 * 1000000 / props.electricity;
        return Math.round(upperEC)
    }


    const calcLower = () => {
        if (props.miner) {
            let networkHR = props.hashrate
            if (typeof props.hashrate === "string") {
                networkHR = parseStringHashrate(props.hashrate)
            }
            const hr = parseInt(props.miner.hashrate) * unitConvert(props.miner.hashrate.charAt(props.miner.hashrate.length - 1))
            const pw = parseInt(props.miner.power)
            let lowerEC = networkHR / hr * pw
            return Math.round(lowerEC)
        }
        return -1
    }

    const Annualize = (energy) => {
        let Wh = energy * 24 * 365 / 1e12;
        return Wh;
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

    const renderBound = (val, unit) => {
        console.log(val)
        return (
            <span>
                {numberWithCommas(Math.round(val))} {unit}
            </span>
        )
    }

    const renderAnnualize = (val, unit) => {
        return (
            <span>
                {Math.round(val * 1000) / 1000} {unit}
            </span>
        )
    }
    return (
        <div className="container">
            <br/>
            <div id="Estimation">
                <h2>
                    Energy Consumption: <em>{renderBound(calcLower() / 1e3, 'kW')} - {renderBound(calcUpper() / 1e3, 'kW')}</em>
                </h2>
                <h3 id="annual">
                    Annualized: {renderAnnualize(Annualize(calcLower()), 'TWh')} - {renderAnnualize(Annualize(calcUpper()), 'TWh')}
                </h3>
            </div>

            <br/>
        </div>
    )
}

export default Consumption