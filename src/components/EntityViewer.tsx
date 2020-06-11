import * as React from 'react'
import {Classes, Divider, H2, UL} from '@blueprintjs/core'
import { Entity as FTMEntity, Property as FTMProperty, Schema as FTMSchema } from '@alephdata/followthemoney';
import { ColorPicker, PropertyEditor, PropertySelect, RadiusPicker } from '../editors';
import { Entity, Property, Schema } from '../types';
import { GraphLayout, Vertex } from '../layout'
import { matchText } from "../utils";

import c from 'classnames';


import './EntityViewer.scss';

interface IEntityViewerProps {
  entity: FTMEntity,
  vertexRef?: Vertex,
  onEntityChanged: (entity: FTMEntity) => void
  onVertexColorSelected: (vertex: Vertex, color: string) => void
  onVertexRadiusSelected: (vertex: Vertex, radius: number) => void
  writeable: boolean
  layout: GraphLayout
}

interface IEntityViewerState {
  visibleProps: FTMProperty[],
  currEditing: FTMProperty | null
}

export class EntityViewer extends React.PureComponent<IEntityViewerProps, IEntityViewerState> {
  private schemaProperties: FTMProperty[];

  constructor(props: IEntityViewerProps) {
    super(props);
    this.schemaProperties = props.entity.schema.getEditableProperties();

    this.state = {
      visibleProps: this.getVisibleProperties(props),
      currEditing: null
    }

    this.onNewPropertySelected = this.onNewPropertySelected.bind(this);
    this.fetchEntitySuggestions = this.fetchEntitySuggestions.bind(this);
    this.resolveEntityReference = this.resolveEntityReference.bind(this);
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

  fetchEntitySuggestions(query: string, schemata?: Array<FTMSchema>): Promise<FTMEntity[]> {
    const { layout } = this.props;

    const entities = layout.getEntities()
      .filter(e => {
        const schemaMatch = !schemata || e.schema.isAny(schemata);
        const textMatch = matchText(e.getCaption() || '', query);
        return schemaMatch && textMatch;
      })
      .sort((a, b) => a.getCaption().toLowerCase() > b.getCaption().toLowerCase() ? 1 : -1);

    return new Promise((resolve) => resolve(entities));
  }

  resolveEntityReference(entityId: string): FTMEntity | undefined {
    return this.props.layout.entities.get(entityId);
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

  onSubmit(entity: FTMEntity) {
    this.props.onEntityChanged(entity);

    this.setState({
      currEditing: null
    })
  }

  renderProperty(property:FTMProperty){
    const { entity, layout } = this.props;
    const { currEditing } = this.state;
    const isEditable = property?.name === currEditing?.name;

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
                onSubmit={this.onSubmit}
                entity={entity}
                property={property}
                fetchEntitySuggestions={this.fetchEntitySuggestions}
                resolveEntityReference={this.resolveEntityReference}
              />
            </div>
          )}
          {!isEditable && (
            <div>
              <Property.Values prop={property} values={entity.getProperty(property.name)} resolveEntityReference={this.resolveEntityReference} />
            </div>
          )}
        </div>
      </li>
    </React.Fragment>
  }

  render() {
    const { layout, entity, vertexRef, writeable } = this.props;
    const { visibleProps } = this.state;
    const availableProperties = this.schemaProperties.filter(p => visibleProps.indexOf(p) < 0);
    const hasCaption = entity.getCaption() !== entity.schema.label;

    console.log(entity.getCaption(), entity.schema.label);

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
              <Entity.Label entity={entity} icon={!hasCaption} />
            </h2>
          </div>
          {vertexRef &&
            <div className='EntityViewer__title__settings'>
              <ColorPicker
                currSelected={vertexRef.color}
                onSelect={(color: string) => this.props.onVertexColorSelected(vertexRef, color)}
              />
              <RadiusPicker
                radius={vertexRef.radius}
                onChange={(radius: number) => this.props.onVertexRadiusSelected(vertexRef, radius)}
                config={layout.config}
                schema={entity.schema}
              />
            </div>
          }
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
