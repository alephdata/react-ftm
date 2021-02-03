import React from 'react'
import { Histogram } from  'components/Histogram';

export default class HistogramWrapper extends React.Component {
  render() {
    const sampleData = [
      {id: "1000", label: "1000", count: 2},
      {id: "1001", label: "1001", count: 21},
      {id: "1002", label: "1002", count: 0},
      {id: "1003", label: "1003", count: 0},
      {id: "1004", label: "1004", count: 1},
      {id: "1005", label: "1005", count: 0},
      {id: "1006", label: "1006", count: 1},
      {id: "1007", label: "1007", count: 0},
      {id: "1008", label: "1008", count: 0},
      {id: "1009", label: "1009", count: 0},
    ];

    return (
      <Histogram
        data={sampleData}
        onSelect={(selected: any) => console.log(selected)}
        dataPropName="count"
        containerProps={{ height: 200 }}
      />
    )
  }
}
