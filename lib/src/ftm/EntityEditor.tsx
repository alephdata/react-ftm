import * as React from 'react'
import { Callout } from '@blueprintjs/core'
import {Entity, Property} from "@alephdata/followthemoney";
import {SelectProperty} from "./property/SelectProperty";
import {PropertyEditor} from "./property/PropertyEditor";

interface IEntityEditorProps {
  entity: Entity,
  onEntityChanged:(entity:Entity) => void
}

interface IEntityEditorState {
  propsToEdit: Set<Property>
}

export class EntityEditor extends React.PureComponent<IEntityEditorProps, IEntityEditorState> {
  private schemaProperties: Property[];


  constructor(props: IEntityEditorProps) {
    super(props);
    this.schemaProperties = Array.from(props.entity.schema.getProperties().values());

    this.state = {
      propsToEdit: this.getEditableProperties(props)
    }

  }

  getEditableProperties(props = this.props) {
    const {entity} = props;
    const propsToEdit = new Set();
    entity.schema.getFeaturedProperties()
      .forEach(propsToEdit.add, propsToEdit)
    // then the ones which has a value
    entity.getProperties()
      .forEach(propsToEdit.add, propsToEdit)
    return propsToEdit;
  }

  componentWillReceiveProps(nextProps: Readonly<IEntityEditorProps>, nextContext: any): void {
    if (this.props.entity !== nextProps.entity) {
      this.schemaProperties = Array.from(nextProps.entity.schema.getProperties().values());
      this.setState({
        propsToEdit: this.getEditableProperties(nextProps)
      })
    }
  }

  render() {
    const {entity} = this.props;
    const label = entity.getCaption() || <i>{entity.schema.name}</i>;
    // first gets a list of featured properties so these are at the top
    const {propsToEdit} = this.state;

    return <div>
      <h2>{label}</h2>
      {Array.from(propsToEdit.values()).map(property => <PropertyEditor
        key={property.name}
        onEntityChanged={this.props.onEntityChanged}
        entity={entity}
        property={property}
      />)}
      <Callout>
        <SelectProperty
          properties={this.schemaProperties.filter(p => !propsToEdit.has(p))}
          onSelected={p => {
            this.setState(({propsToEdit}) => ({
              propsToEdit: new Set(propsToEdit.add(p))
            }))
          }}
        />
      </Callout>
    </div>
  }
}
