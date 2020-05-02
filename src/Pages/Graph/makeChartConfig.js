import React from 'react'

// export default function makeChartConfig(props=[]) {
    
//     let datums = [];
//     props.map(point => {
//         datums.push({x: new Date(point.date).getTime(), y: point.dropDown})
//     })
//     return (
//         [{specialLabel : "Special Label",
//         datums}]
//         )
// }
export default function makeChartConfig(props=[]) {
    
    let datums = [];
    props.map(point => {
        let tempDate = new Date(point.date);
        const name = `${tempDate.getMonth()+1}-${tempDate.getFullYear()}`;
        const yName = `${point.dropDown}%`
        datums.push({name, x: tempDate.getTime(), y: point.dropDown, yName})
    })
    return (datums)
}