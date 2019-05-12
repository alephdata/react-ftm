import * as React from 'react'
import {Model, Schema, IconRegistry} from '@alephdata/followthemoney';
import {Menu, MenuItem} from '@blueprintjs/core';


interface ISelectSchemaProps {
  disabled: boolean
  model: Model,
  subsequentOf: Schema,
  onSchemaSelect: (schema: Schema) => void
}

export class SelectSchema extends React.PureComponent<ISelectSchemaProps> {
  private schemataToShow: Schema[];

  constructor(props: ISelectSchemaProps) {
    super(props);
    this.schemataToShow = this.computeSchemaList(props.subsequentOf)
  }

  computeSchemaList(subsequentOf = this.props.subsequentOf) {
    return Object.values(this.props.model.schemata)
      .filter(schema => schema
        && (schema !== subsequentOf)
        && !schema.abstract
        && schema.isA(subsequentOf)

      ) as Schema[]
  }

  componentWillReceiveProps(nextProps: Readonly<ISelectSchemaProps>, nextContext: any): void {
    if (nextProps.subsequentOf !== this.props.subsequentOf) {
      this.schemataToShow = this.computeSchemaList(nextProps.subsequentOf);
    }
  }

  render() {
    return <Menu>
      {this.schemataToShow.map(schema => {
        const iconPaths = IconRegistry.getIcon(schema.name.toLowerCase());
        const icon = iconPaths && <svg viewBox={'0 0 24 24'} height={20} width={20}>{iconPaths
          .map(d => <path d={d}/>)
        }/></svg>;

        return <MenuItem
          icon={icon}
          onClick={() => this.props.onSchemaSelect(schema)}
          text={schema.label}
        />
      })}
    </Menu>;
  }
}
