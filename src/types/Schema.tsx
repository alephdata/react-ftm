import React from 'react';
import {Schema, IconRegistry} from '@alephdata/followthemoney';

import './Schema.scss';

interface ISchemaCommonProps {
  schema: Schema,
  size?: number
}

export class SchemaIcon extends React.Component<ISchemaCommonProps>{
  static get(schema: Schema, size: number = 16) {
    const iconPaths = IconRegistry.getSchemaIcon(schema);
    return (
      <svg className="SchemaIcon" viewBox={'0 0 24 24'} height={size} width={size}>
        {iconPaths.map((d, i) => <path key={i} d={d}/>)}/>
      </svg>
    );
  }
  render() {
    return SchemaIcon.get(this.props.schema, this.props.size)
  }
}

interface ISchemaLabelProps extends ISchemaCommonProps{
  plural?:boolean
  icon?:boolean
}

export class SchemaLabel extends React.Component<ISchemaLabelProps> {
  render() {
    const { schema, plural = false, icon } = this.props;
    const label = plural ? schema.plural : schema.label;
    if (icon) {
      return (
        <span className="SchemaLabel">
          <SchemaIcon schema={schema} />
          {label}
        </span>
      );
    }
    return label;
  }
}

interface ISchemaLinkProps extends ISchemaCommonProps{
  plural?:boolean
  url:string
}

export class SchemaLink extends React.Component<ISchemaLinkProps>{
  render() {
    const {schema, plural, url} = this.props;
    return (
      <React.Fragment>
        <SchemaIcon schema={schema}/>
        <a href={url}>
          <SchemaLabel schema={schema} icon={false} plural={plural}/>
        </a>
      </React.Fragment>
    );
  }
}
