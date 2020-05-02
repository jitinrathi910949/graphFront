import * as React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import makeChartConfig from './makeChartConfig';



export default function GraphRecharts(props) {
    const { csvData = [], classes } = props;
    const data = React.useMemo(
        () => makeChartConfig(csvData), [csvData]
    )

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload) {
            const payoadObj = payload[0].payload
            console.log("custom tooltip", payoadObj, label);
            const date = new Date(parseInt(payoadObj.x, 10));
            const display = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + date.getFullYear();
            // const display = 'abcd'  
            return (
                // <div className="custom-tooltip">
                //   <p className="label">{`${label} : ${payload[0].value}`}</p>
                //   {/* <p className="intro">{getIntroOfPage(label)}</p> */}
                //   <p className="desc">Anything you want can be displayed here.</p>
                // </div>
                <div className={classes.toolTipStyle}>
                    <span className={classes.toolTipLabel}>{display} :</span>
                    <span>{' '}{parseFloat(payoadObj.y).toPrecision(2)}%</span>
                </div>
            );
        }

        return null;
    };


    return (
        <ResponsiveContainer width="100%" height={500} >
            <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="x" minTickGap={10} orientation="top" tickFormatter={(label) => {

                    const tempDate = new Date(parseInt(label, 10));
                    console.log('temp date is', tempDate);
                    return (`${("0" + (tempDate.getMonth() + 1)).slice(-2)}-${tempDate.getFullYear()}`)
                }} />
                <YAxis tickFormatter={(label) => `${label}%`} />
                <Tooltip content={<CustomTooltip />} />
            </LineChart>
        </ResponsiveContainer>
    )

}


