import * as React from 'react'
import { Classes, Divider, UL } from '@blueprintjs/core'
import { IEntityDatum, Property as FTMProperty } from '@alephdata/followthemoney';
import { ColorPicker, PropertyEditor, PropertySelect, RadiusPicker } from 'editors';
import { Entity, FTMEntityExtended as FTMEntity, Property, Schema } from 'types';

import { IEntityContext } from 'contexts';
import { Vertex } from 'NetworkDiagram/layout'
import { GraphContext } from 'NetworkDiagram/GraphContext';
import c from 'classnames';

import './EntityViewer.scss';

interface IEntityViewerProps {
  entity: FTMEntity,
  entityContext: IEntityContext
  vertexRef?: Vertex,
  onEntityChanged: (entity: FTMEntity, previousData: IEntityDatum) => void
  onVertexColorSelected: (vertex: Vertex, color: string) => void
  onVertexRadiusSelected: (vertex: Vertex, radius: number) => void
}

interface IEntityViewerState {
  visibleProps: FTMProperty[],
  currEditing: FTMProperty | null
}


export class EntityViewer extends React.Component<IEntityViewerProps, IEntityViewerState> {
  static contextType = GraphContext;
  private schemaProperties: FTMProperty[];

  constructor(props: IEntityViewerProps) {
    super(props);
    this.schemaProperties = props.entity.schema.getEditableProperties()
      .sort((a, b) => a.label.localeCompare(b.label));

    this.state = {
      visibleProps: this.getVisibleProperties(props),
      currEditing: null
    }

    this.onNewPropertySelected = this.onNewPropertySelected.bind(this);
    this.renderProperty = this.renderProperty.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getVisibleProperties(props = this.props) {
    const {entity} = props;

    return Array.from(new Set([...entity.schema.getFeaturedProperties(), ...entity.getProperties()]))
  }

  componentWillReceiveProps(nextProps: Readonly<IEntityViewerProps>): void {
    if (this.props.entity !== nextProps.entity) {
      this.schemaProperties = nextProps.entity.schema.getEditableProperties();
      this.setState({
        visibleProps: this.getVisibleProperties(nextProps)
      })
    }
  }

  onNewPropertySelected(p:FTMProperty){
    this.setState(({visibleProps}) => ({
      visibleProps: [...visibleProps, ...[p]],
      currEditing: null
    }))
  }

  onEditPropertyClick(e:React.MouseEvent, property:FTMProperty){
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      currEditing: property
    })
  }

  onSubmit(entity: FTMEntity, previousData: IEntityDatum) {
    this.props.onEntityChanged(entity, previousData);

    this.setState({
      currEditing: null
    })
  }

  renderProperty(property:FTMProperty){
    const { entity, entityContext } = this.props;
    const { currEditing } = this.state;
    const isEditable = property?.name === currEditing?.name;
    const entityData = entity.toJSON();

    return <React.Fragment key={property.name}>
      <li
        className={c('EntityViewer__property-list-item', {'active': isEditable})}
        onClick={(e) => !isEditable && this.onEditPropertyClick(e, property)}
      >
        <div className='EntityViewer__property-list-item__label'>
          <span>
            <Property.Name prop={property}/>
          </span>
        </div>
        <div className='EntityViewer__property-list-item__value'>
          {isEditable && (
            <div>
              <PropertyEditor
                key={property.name}
                onSubmit={(entity: FTMEntity) => this.onSubmit(entity, entityData)}
                entity={entity}
                property={property}
                entityContext={entityContext}
              />
            </div>
          )}
          {!isEditable && (
            <div>
              <Property.Values prop={property} values={entity.getProperty(property.name)} translitLookup={entity.latinized} />
            </div>
          )}
        </div>
      </li>
    </React.Fragment>
  }

  render() {
    const { writeable } = this.context;
    const { entity, vertexRef } = this.props;
    const { visibleProps } = this.state;
    const availableProperties = this.schemaProperties.filter(p => visibleProps.indexOf(p) < 0);
    const hasCaption = entity.getCaption() !== entity.schema.label;

    return (
      <div className={c('EntityViewer', { writeable: writeable })}>
        <div className='EntityViewer__title'>
          <div className='EntityViewer__title__text'>
            {hasCaption && (
              <p className='EntityViewer__title__text__secondary'>
                <Schema.Label schema={entity.schema} icon />
              </p>
            )}
            <h2 className='EntityViewer__title__text__main'>
              <Entity.Label entity={entity} icon={!hasCaption} iconSize={25} />
            </h2>
          </div>
          {vertexRef && writeable && (
            <div className='EntityViewer__title__settings'>
              <ColorPicker
                currSelected={vertexRef.color}
                onSelect={(color: string) => this.props.onVertexColorSelected(vertexRef, color)}
              />
              <RadiusPicker
                radius={vertexRef.radius}
                onChange={(radius: number) => this.props.onVertexRadiusSelected(vertexRef, radius)}
                schema={entity.schema}
              />
            </div>
          )}
        </div>
        <UL className={c('EntityViewer__property-list', Classes.LIST_UNSTYLED)}>
          {visibleProps.map(this.renderProperty)}
        </UL>
        {writeable && !!availableProperties.length && (<>
          <Divider/>
          <PropertySelect
            properties={availableProperties}
            onSelected={this.onNewPropertySelected}
          />
        </>)}
      </div>
    )
  }
}
