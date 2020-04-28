import React from 'react'

export default function makeChartConfig(props=[]) {
    
    let datums = [];
    props.map(point => {
        datums.push({x: new Date(point.date).getTime(), y: point.dropDown})
    })
    return (
        [{specialLabel : "Special Label",
        datums}]
        )
}