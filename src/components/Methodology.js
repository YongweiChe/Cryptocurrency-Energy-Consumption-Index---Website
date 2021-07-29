import React from 'react';

const Methodology = () => {
    return (
        <div>
            <br/>
            <h2 style={{textAlign: "center"}}>Methodology</h2>
            <p>
                <b>Top-Down Estimation: </b>
The top-down approach for estimating a cryptocurrency’s energy consumption looks at the economic viability of mining a cryptocurrency using electricity prices and coin market prices. Since every PoW cryptocurrency creates new coins as a method to reward miners, we can calculate the rate of profit generation using the market price of the coin, how much of the coin is rewarded when mined (block reward), and the average time between each mined block (block time). For each

   
 coin, the market price, block rewards, and block times are gathered from <em>miningpoolstats.stream</em> <em>and minerstat.com</em>. We can approximate the rate of profit generation to be
<br/><br/>
<div classNmae="text-center"><em>profit ($/s) = Market Price ($) x Reward (coins) / Block Time (s)</em></div>
<br/>
 To estimate the upper bound for energy consumption, we assume that cryptocurrency miners only break even and use all of their profits to pay their energy bills. We will use the industrial price of electricity in the US of $0.10/kWh as an estimation of the electricity price of cryptocurrency miners4. Thus, using the price and the price of electricity we can estimate the rate of energy consumption to be
<br/><br/>
<div className="text-center"><em>Energy Consumption (J/s) = profit ($/s) × (1𝑘𝑊h / price of electricity ($)) × (3.6×10<sup>6</sup>J / 1𝑘𝑊h)</em></div><br/>
This energy consumption calculation should give us an estimate on the energy consumption upper-bound because it assumes the sole cost associated with mining is electricity costs.<br/><br/> 
<hr></hr><br/>
<b>Bottom-Up Estimation:</b>
The bottom-up approach takes a more technical look at the hash rate of the coins and their mining hardware4. By examining the algorithm and difficulty of each cryptocurrency, the hash rate of each coin can be estimated. We will use the hash-rate from minerstat.com for our calculations. The next step is to locate the most efficient hardware for mining each cryptocurrency and find the hash rate and energy efficiency of those specific machines. An updated list of the most efficient mining hardware can be found under the ranking section of the f2pool mining pool, which is one of the top crypto mining pools. If we assume that every miner is using the most efficient hardware possible, we can determine how many machines are mining by dividing the machine’s hash rate by the network hash rate. Then, using the machine’s power consumption data we can estimate energy consumption using this formula
<br/><br/>
<div className="text-center">
    <em>Energy Consumption (J/s) = market hashrate (H/s) × Power Consumption (J/s) / hardware hashrate (H/s)</em>
</div><br/>
This constitutes a lower bound because it assumes each miner is mining with maximum efficiency.
            </p>
        </div>
    )
}

export default Methodology