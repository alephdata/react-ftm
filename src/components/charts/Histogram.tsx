import * as React from 'react'
import { Colors } from "@blueprintjs/core";
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceArea, ResponsiveContainer,
} from 'recharts';

const dataFromEvent = (e: any) => (e?.activePayload[0]?.payload);

interface IHistogramDatum {
  id: string
  label: string
  count: number
}

interface IHistogramProps {
  data: Array<IHistogramDatum>
  onSelect: (selected: any | Array<any> ) => void
  containerProps?: any
}

interface IHistogramState {
  selectLeft?: IHistogramDatum
  selectRight?: IHistogramDatum
}

export class Histogram extends React.Component<IHistogramProps, IHistogramState> {
  constructor(props: Readonly<IHistogramProps>) {
    super(props);

    this.state = {};
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(e: any) {
    const { selectLeft, selectRight } = this.state;
    if (selectLeft && selectRight) {
      this.props.onSelect([selectLeft.id, selectRight.id]);
    } else {
      this.props.onSelect(dataFromEvent(e)?.id);
    }

    this.setState({ selectLeft: undefined, selectRight: undefined });
  }

  render() {
    const { containerProps, data } = this.props;
    const { selectLeft, selectRight } = this.state;

    return (
      <ResponsiveContainer width="100%" {...containerProps}>
        <BarChart
          data={data}
          onMouseDown={e => this.setState({ selectLeft: dataFromEvent(e) })}
          onMouseMove={e => selectLeft && this.setState({ selectRight: dataFromEvent(e) })}
          onMouseUp={this.onSelect}
        >
          <XAxis dataKey="label" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar dataKey="count" fill={Colors.BLUE2} />
          {selectLeft && selectRight && (
            <ReferenceArea x1={selectLeft.label} x2={selectRight.label} strokeOpacity={0.3} />
          )}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
