import * as React from 'react'
import {Classes, Divider, H2, UL} from '@blueprintjs/core'
import {Entity, Property} from '@alephdata/followthemoney';
import {SelectProperty} from './SelectProperty';
import {PropertyEditor} from './PropertyEditor';
import {PropertyListItem} from './common';

interface IEntityViewerProps {
  entity: Entity,
  onEntityChanged: (entity: Entity) => void
}

interface IEntityViewerState {
  visibleProps: Map<Property, boolean>
}

export class EntityViewer extends React.PureComponent<IEntityViewerProps, IEntityViewerState> {
  private schemaProperties: Property[];

  constructor(props: IEntityViewerProps) {
    super(props);
    this.schemaProperties = Array.from(props.entity.schema.getProperties().values());

    this.state = {
      visibleProps: this.getVisibleProperties(props)
    }

    this.onNewPropertySelected = this.onNewPropertySelected.bind(this);
    this.renderProperty = this.renderProperty.bind(this);
  }

  getVisibleProperties(props = this.props) {
    const {entity} = props;
    return new Map(entity.getProperties()
      .map(property => [property, false])
    );
  }

  componentWillReceiveProps(nextProps: Readonly<IEntityViewerProps>): void {
    if (this.props.entity !== nextProps.entity) {
      this.schemaProperties = Array.from(nextProps.entity.schema.getProperties().values());
      this.setState({
        visibleProps: this.getVisibleProperties(nextProps)
      })
    }
  }

  onNewPropertySelected(p:Property){
    this.setState(({visibleProps}) => ({
      visibleProps: new Map(visibleProps.set(p, true))
    }))
  }

  renderProperty(property:Property){
    const { entity } = this.props;
    const isEditable = this.state.visibleProps.get(property);
    return isEditable ? <PropertyEditor
      key={property.name}
      onEntityChanged={this.props.onEntityChanged}
      entity={entity}
      property={property}
    /> : <>
      <PropertyListItem
        key={property.name}
        prop={property}
        values={entity.getProperty(property)}
      />
    <br/>
    </>
  }

  render() {
    const { entity } = this.props;
    const {visibleProps} = this.state;
    const availableProperties = this.schemaProperties.filter(p => !visibleProps.has(p));
    return <div>
      <H2>{entity.getCaption()}</H2>
      <table className={Classes.HTML_TABLE}>
        {Array.from(visibleProps.keys()).map(this.renderProperty)}
      </table>
      {!!availableProperties.length && (<>
        <Divider/>
        <SelectProperty
          properties={availableProperties}
          onSelected={this.onNewPropertySelected}
        />
      </>)}

    </div>
  }
}
