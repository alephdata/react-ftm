import React from 'react';
import {Schema} from '@alephdata/followthemoney';
import { Icon } from '@blueprintjs/core';

interface ISchemaIconProps {
  schema: Schema
}

export class SchemaIcon extends React.PureComponent<ISchemaIconProps> {
  render() {
    const { schema, ...rest } = this.props;
    return (
      <Icon
        className="entity-icon"
        iconSize={16}
        {...rest}
        // @ts-ignore
        icon={schema.name.toLowerCase()}
      />
    );
  }
}

interface ISchemaLabelProps {
  schema:Schema
  plural?:boolean
  icon?:boolean
}

export class SchemaLabel extends React.Component<ISchemaLabelProps> {
  render() {
    const { schema, plural = false, icon } = this.props;
    const label = plural ? schema.plural : schema.label;
    if (icon) {
      return (
        <span>
          <SchemaIcon schema={schema} />
          {label}
        </span>
      );
    }
    return label;
  }
}

interface ISchemaLinkProps {
  schema:Schema
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
