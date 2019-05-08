import React, {PureComponent} from 'react';
import {PanelStack} from "@blueprintjs/core";

export class CreateEntityStack extends PureComponent {
  panels = [{}]

  render() {
    return <div><PanelStack
      initialPanel={{
        component: () => <div>asdasdas</div>,
        props: {enabled: true},
        title: 'sdd'
      }}
    /></div>
  }
}