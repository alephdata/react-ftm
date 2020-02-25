import * as React from 'react'
import {Classes, Divider, H2, UL} from '@blueprintjs/core'
import {Entity, Property} from '@alephdata/followthemoney';
import {SelectProperty} from './SelectProperty';
import {PropertyEditor} from './PropertyEditor';
import { PropertyName, PropertyValues} from '../types';
import { SchemaIcon } from '../types';
import { Vertex } from '../layout'
import {ColorPicker} from './ColorPicker'
import {VertexRadiusPicker} from './VertexRadiusPicker'
import { GraphConfig } from '../GraphConfig';

import c from 'classnames';


import './EntityViewer.scss';

interface IEntityViewerProps {
  entity: Entity,
  vertexRef?: Vertex,
  onEntityChanged: (entity: Entity) => void
  onVertexColorSelected: (vertex: Vertex, color: string) => void
  onVertexRadiusSelected: (vertex: Vertex, radius: number) => void
  writeable: boolean
  config: GraphConfig
}

interface IEntityViewerState {
  visibleProps: Property[],
  currEditing: Property | null
}

export class EntityViewer extends React.PureComponent<IEntityViewerProps, IEntityViewerState> {
  private schemaProperties: Property[];

  constructor(props: IEntityViewerProps) {
    super(props);
    this.schemaProperties = props.entity.schema.getEditableProperties();

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

  onNewPropertySelected(p:Property){
    this.setState(({visibleProps}) => ({
      visibleProps: [...visibleProps, ...[p]],
      currEditing: p
    }))
  }

  onEditPropertyClick(e:React.MouseEvent, property:Property){
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      currEditing: property
    })
  }

  onSubmit(entity: Entity) {
    this.props.onEntityChanged(entity);

    this.setState({
      currEditing: null
    })
  }

  renderProperty(property:Property){
    const { entity } = this.props;
    const { currEditing } = this.state;
    const isEditable = property?.name === currEditing?.name;

    return <React.Fragment key={property.name}>
      <li
        className={c('EntityViewer__property-list-item', {'active': isEditable})}
        onClick={(e) => !isEditable && this.onEditPropertyClick(e, property)}
      >
        <div className='EntityViewer__property-list-item__label'>
          <span>
            <PropertyName prop={property}/>
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
              />
            </div>
          )}
          {!isEditable && (
            <div>
              <PropertyValues prop={property} values={entity.getProperty(property)}/>
            </div>
          )}
        </div>
      </li>
    </React.Fragment>
  }

  render() {
    const { config, entity, vertexRef, writeable } = this.props;
    const { visibleProps } = this.state;
    const availableProperties = this.schemaProperties.filter(p => visibleProps.indexOf(p) < 0);

    return (
      <div className={c('EntityViewer', { writeable: writeable })}>
        <div className='EntityViewer__title'>
          <SchemaIcon size={60} schema={entity.schema} />
          <h2 className='EntityViewer__title__text'>{entity.getCaption()}</h2>
          {vertexRef &&
            <div className='EntityViewer__settings'>
              <ColorPicker
                currSelected={vertexRef.color}
                onSelect={(color: string) => this.props.onVertexColorSelected(vertexRef, color)}
              />
              <VertexRadiusPicker
                radius={vertexRef.radius}
                onChange={(radius: number) => this.props.onVertexRadiusSelected(vertexRef, radius)}
                config={config}
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
          <SelectProperty
            properties={availableProperties}
            onSelected={this.onNewPropertySelected}
          />
        </>)}
      </div>
    )
  }
}
