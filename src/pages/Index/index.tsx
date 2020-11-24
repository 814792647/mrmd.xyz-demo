import React, { useEffect, useRef } from 'react';
import './index.scss';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts';
import 'echarts/lib/chart/line';
import Axios from 'axios';
import moment from 'moment';

let rain1h = new Array(24); //降雨量
let pressure = new Array(24) //气压
let humidity = new Array(24); //湿度
let temperature = new Array(24); //温度
let windSpeed = new Array(24); //风速
let delay = new Array(24).fill(0); //延迟航班个数
let all = new Array(24).fill(0); //全部航班个数

const option = {
  title: {
    text: `${new Date()} 航班状态`
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['降水', '温度', '相对湿度', '气压', '风速', '航班延迟数量', '全部航班'],
    top: "bottom"
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']

  },
  yAxis: [
    {
      type: 'value'
    }, {
      type: 'value',
      max:(value:any) => {
        return value.max + 30;
      },
      min:1000
    }
  ],
  series: [
    {
      name: '降水',
      type: 'line',
      data: rain1h,
      color: "#2196f3"
    },
    {
      name: '温度',
      type: 'line',
      data: temperature,
      color: "#ffd600"
    },
    {
      name: '相对湿度',
      type: 'line',
      data: humidity,
      color: "#1de9b6"
    },
    {
      name: '气压',
      type: 'line',
      data: pressure,
      color: "#33691e",
      yAxisIndex: 1,
    },
    {
      name: '风速',
      type: 'line',
      data: windSpeed,
      color: "#9c27b0"
    },
    {
      name: '航班延迟数量',
      type: 'line',
      data: delay,
      color: "#b71c1c"
    },
    {
      name: '全部航班',
      type: 'bar',
      data: all,
      color: "#263238"
    }
  ]
}

const Index = () => {

  const echartsRef = useRef<any>();

  useEffect(() => {
    document.title = `航班状态 - ${new Date().getTime()}`
    async function Init() {
      let weather = (await Axios.get(`https://mrmd.xyz/rest/weather?stationid=54511&_=${new Date().getTime()}`)).data.data.passedchart;
      let flight = (await Axios.post("https://m.ctrip.com/restapi/soa2/14566/FlightVarListQuery?_fxpcqlniredt=09031114112629084057", {
        token: null,
        dCode: "BJS",
        aCode: "SZX",
        queryType: 2,
        srchDate: moment().format('YYYY-MM-DD'),
        extparam: "",
        head: {
          cid: "09031114112629084057",
          ctok: "",
          cver: "1.0",
          lang: "01",
          sid: "8888",
          syscode: "09",
          auth: "",
          xsid: "",
          extension: []
        }
      })).data.flst
      weather.map((item: any) => {
        if (new Date(item.time).getDate() === new Date().getDate()) {
          let index = new Date(item.time).getHours();
          rain1h[index] = item.rain1h;
          pressure[index] = item.pressure;
          humidity[index] = item.humidity / 10;
          temperature[index] = item.temperature;
          windSpeed[index] = item.windSpeed;
        }
      });

      flight.map((item: any) => {
        let index = new Date(item.dTime).getHours();
        all[index] = ++all[index];
        if (new Date(item.edTime).getTime() - new Date(item.dTime).getTime() > 0) {
          delay[index] = ++delay[index]
        }
      })
      echartsRef.current.getEchartsInstance().setOption(option);
      console.log(option)
    }
    Init();
  }, [])


  return (
    <div className="main">
      <ReactEchartsCore
        style={{ background: '#fff', height: "95vh", width: "100%" }}
        echarts={echarts}
        option={option as any}
        ref={(e: any) => { echartsRef.current = e }}
      />
    </div>
  )
}

export default Index
