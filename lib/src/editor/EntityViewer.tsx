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
      visibleProps: new Map(this.getVisibleProperties().set(p, true))
    }))
  }

  onEditPropertyClick(e:React.MouseEvent, property:Property){
    e.preventDefault()
    e.stopPropagation()
    this.setState(({visibleProps}) => ({
      visibleProps: new Map(this.getVisibleProperties().set(property, true))
    }))
  }

  leaveEditMode(e) {
    this.setState(({visibleProps}) => ({
      visibleProps: this.getVisibleProperties()
    }))
  }

  renderProperty(property:Property){
    const { entity } = this.props;
    const isEditable = this.state.visibleProps.get(property);

    return <React.Fragment key={property.name}>
      <li
        className='EntityViewer__property-list-item'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='EntityViewer__property-list-item__label'>
          <span className={Classes.TEXT_MUTED}>
            <PropertyName prop={property}/>
          </span>
        </div>
        <div className='EntityViewer__property-list-item__value'>
          {isEditable && (
            <PropertyEditor
              key={property.name}
              onEntityChanged={this.props.onEntityChanged}
              entity={entity}
              property={property}
            />
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
    const {visibleProps} = this.state;
    const availableProperties = this.schemaProperties.filter(p => !visibleProps.has(p));

    return <div className='EntityViewer' onClick={(e) => this.leaveEditMode(e)}>
      <H2 className='EntityViewer__title'>{entity.getCaption()}</H2>
      <UL className={c('EntityViewer__property-list', Classes.LIST_UNSTYLED)}>
        {Array.from(visibleProps.keys()).map(this.renderProperty)}
      </UL>
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
