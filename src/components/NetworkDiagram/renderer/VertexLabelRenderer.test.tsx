import React from 'react';
import { shallow, mount } from 'enzyme';
import { VertexLabelRenderer } from './VertexLabelRenderer';
import { Point } from '../layout/Point';

describe('<VertexLabelRenderer />', () => {
  it('renders text labels', () => {
    const component = shallow(
      <VertexLabelRenderer
        type="text"
        label="Lorem ipsum dolor sit amet."
        center={new Point(0, 0)}
      />
    );

    const label = component.find('text').first().text();
    expect(label).toEqual('Lorem ipsum dolor sit amet.');
  });

  it('truncates long labels', () => {
    const component = shallow(
      <VertexLabelRenderer
        type="text"
        label="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
        center={new Point(0, 0)}
      />
    );

    const label = component.find('text').first().text();
    expect(label).toEqual('Lorem ipsum dolor sit amet, co…');
  });

  it('display untruncated label when selected', () => {
    const component = mount(
      <svg>
        <VertexLabelRenderer
          type="text"
          label="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa."
          center={new Point(0, 0)}
          selected={true}
        />
      </svg>
    );

    const lines = component.find('tspan').map(tspan => tspan.text());
    const verticalLineDelta = component.find('tspan').map(tspan => tspan.prop('dy'));

    expect(lines).toEqual([
      'Lorem ipsum dolor sit amet,',
      'consectetuer adipiscing elit.',
      'Aenean commodo ligula eget',
      'dolor. Aenean massa.',
    ]);

    expect(verticalLineDelta).toEqual([0, 5.5, 5.5, 5.5]);
  });
});
