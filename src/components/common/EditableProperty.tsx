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
  minimal?: boolean
}

export class EditableProperty extends React.Component<IEditablePropertyProps> {
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
    const { editing, entity, fetchEntitySuggestions, onSubmit, property, minimal, resolveEntityReference } = this.props;
    const entityData = entity.toJSON();

    const values = entity.getProperty(property.name);
    const isEmpty = values.length === 0;

    return (
      <div
        className={c('EditableProperty', {'active': editing, minimal})}
        onClick={(e) => !editing && this.toggleEditing(e)}
      >
        {(!minimal || isEmpty) && (
          <div className='EditableProperty__label'>
            <span>
              <Property.Name prop={property}/>
            </span>
          </div>
        )}
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
          {(!editing && !(minimal && isEmpty)) && (
            <Property.Values
              prop={property}
              values={values}
              resolveEntityReference={resolveEntityReference}
              translitLookup={entity.latinized}
            />
          )}
        </div>
      </div>
    );
  }
}
