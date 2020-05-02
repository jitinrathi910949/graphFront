import * as React from "react";
import Box from '../../components/Box'
import useChartConfig from './useChartConfig'
import makeChartConfig from './makeChartConfig';
// var Chart = require('chart.js');
import { Chart } from 'react-charts'

export default function Graph(props) {
  // const { data, randomizeData } = useChartConfig({
  //   series: 1
  // })
  const {csvData=[]} = props;
  const data= React.useMemo(
    () => makeChartConfig(csvData), [csvData]
  )
  const series = React.useMemo(
    () => ({
      showPoints: false,
    }),
    []
  )

  const getLabel = React.useCallback(series => {console.log('sereives', series); return series.specialLabel}, [])
  // const data = makeChartConfig(csvData);
  const getSeriesStyle = React.useCallback(
    series => ({
      strokeWidth: 1,
      show: true
    }),
    []
  )

  const axes = React.useMemo(
    () => [
      {
        primary: true,
        position: 'bottom',
        type: 'linear',
        ticks: {
          autoSkip: true,
        maxTicksLimit: 20
        },
        // show: true,
        min:0,
        format: d => {
          var a = d;
          a=a.replace(/\,/g,'');
          a=parseInt(a,10);
          const tempDate = new Date(a);
          console.log('date format is',d, `${( "0"+tempDate.getMonth()+1).slice(-2)}-${tempDate.getFullYear()}`); return(`${("0"+tempDate.getMonth()).slice(-2)}-${tempDate.getFullYear()}`);}
      },
      { position: 'left',
       type: 'linear',
        // show: true ,
        min:0,
        format: d => `${d}%`
      }
    ], [csvData]
   
  )

    return(
      
       
        <Box>
        <Chart
         data={data} 
         axes={axes}
          series={series}
          getSeriesStyle={getSeriesStyle}
          getLabel={getLabel} 
          
           tooltip 
          //  primaryCursor
          //  secondaryCursor
           />
        </Box>
        
  
        
    );
}