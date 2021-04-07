import * as React from 'react'
import { FormGroup, Intent, Button } from '@blueprintjs/core'
import { IEntityDatum, Property as FTMProperty, Schema } from '@alephdata/followthemoney'
import c from 'classnames';

import { PropertyEditor } from 'editors'
import { EdgeType, FTMEntityExtended as Entity, Property } from 'types'
import { Dialog } from 'components/common'

import './EditableProperty.scss';

interface IEditablePropertyProps {
  entity: Entity
  property: FTMProperty
  editing: boolean
  onToggleEdit: (property: FTMProperty) => void
  onSubmit: (entity: Entity, previous: IEntityDatum) => void
  fetchEntitySuggestions?: (queryText: string, schemata?: Array<Schema>) => Promise<Entity[]>
  resolveEntityReference?: (entityId: string) => Entity | undefined
}

interface IEditablePropertyState {

}

export class EditableProperty extends React.Component<IEditablePropertyProps, IEditablePropertyState> {
  constructor(props: IEditablePropertyProps) {
    super(props);

    this.toggleEditing = this.toggleEditing.bind(this);
  }

  toggleEditing(e:React.MouseEvent) {
    const { onToggleEdit, property } = this.props;
    e.preventDefault();
    e.stopPropagation();
    onToggleEdit(property);
  }

  render() {
    const { editing, entity, fetchEntitySuggestions, onSubmit, property, resolveEntityReference } = this.props;
    const entityData = entity.toJSON();

    return (
      <div
        className={c('EditableProperty', {'active': editing})}
        onClick={(e) => !editing && this.toggleEditing(e)}
      >
        <div className='EditableProperty__label'>
          <span>
            <Property.Name prop={property}/>
          </span>
        </div>
        <div className='EditableProperty__value'>
          {editing && (
            <PropertyEditor
              key={property.name}
              onSubmit={(entity: Entity) => onSubmit(entity, entityData)}
              entity={entity}
              property={property}
              fetchEntitySuggestions={fetchEntitySuggestions}
              resolveEntityReference={resolveEntityReference}
            />
          )}
          {!editing && (
            <Property.Values
              prop={property}
              values={entity.getProperty(property.name)}
              resolveEntityReference={resolveEntityReference}
              translitLookup={entity.latinized}
            />
          )}
        </div>
      </div>
    );
  }
}
