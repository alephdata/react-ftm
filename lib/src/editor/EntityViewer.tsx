import * as React from 'react'
import {Classes, Divider, H2, UL} from '@blueprintjs/core'
import {Entity, Property} from '@alephdata/followthemoney';
import {SelectProperty} from './SelectProperty';
import {PropertyEditor} from './PropertyEditor';
import { PropertyName, PropertyValues} from '../types';
import './EntityViewer.scss';
import c from 'classnames';

interface IEntityViewerProps {
  entity: Entity,
  onEntityChanged: (entity: Entity) => void
}

interface IEntityViewerState {
  visibleProps: Property[],
  currEditing: Property | undefined
}


export class EntityViewer extends React.PureComponent<IEntityViewerProps, IEntityViewerState> {
  private schemaProperties: Property[];

  constructor(props: IEntityViewerProps) {
    super(props);
    this.schemaProperties = Array.from(props.entity.schema.getProperties().values());

    this.state = {
      visibleProps: this.getVisibleProperties(props),
      currEditing: null
    }

    this.onNewPropertySelected = this.onNewPropertySelected.bind(this);
    this.renderProperty = this.renderProperty.bind(this);
  }

  getVisibleProperties(props = this.props) {
    const {entity} = props;
    return [...entity.getProperties()]
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
      visibleProps: [...visibleProps, ...[p]],
      currEditing: p
    }))
  }

  onEditPropertyClick(e:React.MouseEvent, property:Property){
    e.preventDefault()
    e.stopPropagation()
    this.setState(() => ({
      currEditing: property
    }))
  }

  leaveEditMode(e) {
    this.setState(({}) => ({
      currEditing: null
    }))
  }

  renderProperty(property:Property){
    const { entity } = this.props;
    const { currEditing } = this.state;
    const isEditable = property === currEditing;

    return <React.Fragment key={property.name}>
      <li
        className='EntityViewer__property-list-item'
      >
        <div className='EntityViewer__property-list-item__label'>
          <span className={Classes.TEXT_MUTED}>
            <PropertyName prop={property}/>
          </span>
        </div>
        <div className='EntityViewer__property-list-item__value'>
          {isEditable && (
            <div onClick={(e) => e.stopPropagation()}>
              <PropertyEditor
                key={property.name}
                onEntityChanged={this.props.onEntityChanged}
                entity={entity}
                property={property}
              />
            </div>
          )}
          {!isEditable && (
            <div onClick={(e) => this.onEditPropertyClick(e, property)}>
              <PropertyValues prop={property} values={entity.getProperty(property)}/>
            </div>
          )}
        </div>
      </li>
    </React.Fragment>
  }

  render() {
    const { entity } = this.props;
    const { visibleProps } = this.state;
    const availableProperties = this.schemaProperties.filter(p => visibleProps.indexOf(p) < 0);

    return (
      <div
        className='EntityViewer'
        onClick={(e) => this.leaveEditMode(e)} >
          <H2 className='EntityViewer__title'>{entity.getCaption()}</H2>
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
