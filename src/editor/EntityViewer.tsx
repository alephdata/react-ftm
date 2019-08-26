import * as React from 'react'
import {Classes, Divider, H2, UL} from '@blueprintjs/core'
import {Entity, Property} from '@alephdata/followthemoney';
import {SelectProperty} from './SelectProperty';
import {PropertyEditor} from './PropertyEditor';
import { PropertyName, PropertyValues} from '../types';
import { SchemaIcon } from '../types';
import { Vertex } from '../layout'
import {ColorPicker} from './ColorPicker'
import c from 'classnames';


import './EntityViewer.scss';

interface IEntityViewerProps {
  entity: Entity,
  vertexRef?: Vertex,
  onEntityChanged: (entity: Entity) => void
  onVertexColorSelected: (vertex: Vertex, color: string) => void
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

  leaveEditMode() {
    this.setState({
      currEditing: null
    })
  }

  renderProperty(property:Property){
    const { entity } = this.props;
    const { currEditing } = this.state;
    const isEditable = property === currEditing;

    return <React.Fragment key={property.name}>
      <li
        className={c('EntityViewer__property-list-item', {'active': isEditable})}
        onClick={(e) => this.onEditPropertyClick(e, property)}
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
                onEntityChanged={this.props.onEntityChanged}
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
    const { entity, vertexRef } = this.props;
    const { visibleProps } = this.state;
    const availableProperties = this.schemaProperties.filter(p => visibleProps.indexOf(p) < 0);
    return (
      <div
        className='EntityViewer'
        onClick={() => this.leaveEditMode()} >
          <div className='EntityViewer__title'>
            <SchemaIcon size={60} schema={entity.schema} />
            <h2 className='EntityViewer__title__text'>{entity.getCaption()}</h2>
            {vertexRef &&
              <ColorPicker
                vertex={vertexRef}
                onSelect={this.props.onVertexColorSelected} />
            }
          </div>

          <UL className={c('EntityViewer__property-list', Classes.LIST_UNSTYLED)}>
            {visibleProps.map(this.renderProperty)}
          </UL>
          {!!availableProperties.length && (<>
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
