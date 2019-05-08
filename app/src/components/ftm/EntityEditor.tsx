import React, {PureComponent, ReactNode} from 'react';
import {
  TagInput,
  ControlGroup,
  FormGroup,
  Callout,
  MenuItem,
  NonIdealState,
} from '@blueprintjs/core'
import {Suggest} from "@blueprintjs/select";
import {DateInput, IDateFormatProps} from "@blueprintjs/datetime";
import {Entity, Property, Values} from "@alephdata/followthemoney";
import {GraphLayout} from "@alephdata/vislib";
import {highlightText} from "../../utils";

interface ITypeProps {
  values: Values
  property: Property
  entity: Entity
  onPropertyChanged: (values: Values, property: Property) => void
}

class DateType extends PureComponent<ITypeProps> {
  static group = new Set(['date'])
  onChange = (value: Date) => {
    this.props.onPropertyChanged([value.toString()] as unknown as Values, this.props.property)
  };
  jsDateFormatter: IDateFormatProps = {
    formatDate: date => date.toLocaleDateString(),
    parseDate: str => new Date(str),
    placeholder: "M/D/YYYY",
  };

  render() {
    const {property, values} = this.props;

    return <FormGroup
      label={property.description || property.label || property.name}
    >
      <DateInput
        {...this.jsDateFormatter}
        value={values[0] ? new Date(values[0] as string) : undefined}
        onChange={this.onChange}
      />
    </FormGroup>
  }
}

class TextType extends PureComponent<ITypeProps> {
  static group = new Set(['text', 'string'])

  onChange = (values: Array<string | ReactNode>) => {
    // TODO: @pudo maybe we need to implement Entity.removeProperty in FTM?
    this.props.onPropertyChanged(values as unknown as Values, this.props.property)
  }

  render() {
    const {property} = this.props;
    return <FormGroup
      label={property.description || property.label || property.name}
    >
      <ControlGroup
        vertical
      >
        <TagInput
          addOnPaste
          onChange={this.onChange}
          values={this.props.values}
        />
      </ControlGroup>
    </FormGroup>
  }
}


interface IPropertyProps {
  entity: Entity,
  property: Property,
  onEntityChanged: (nextEntity: Entity) => void
}

// 7ce99c16990557f8a859a6c6ab080dc8cf1e1506 - MARIOT
// 47b73abc9dd57c83c3ae65cd70dc48541b15a1e3 - JAMAL
class PropertyEditor extends PureComponent<IPropertyProps> {
  onPropertyChanged = (nextValues: Values) => {
    const nextEntity = this.props.entity.clone();
    nextEntity.properties.set(this.props.property, nextValues);
    this.props.onEntityChanged(nextEntity)
  }

  render() {
    const {entity, property} = this.props;
    const values = entity.getProperty(property);
    const commonProps = {
      onPropertyChanged: this.onPropertyChanged,
      values: values,
      property: property,
      entity: entity
    };

    if (DateType.group.has(property.type.name)) {
      return <DateType
        {...commonProps}
      />;
    }

    // fallback
    return <TextType
      {...commonProps}
    />;
  }
}

const PropertySuggest = Suggest.ofType<Property>()

interface IEntityEditorProps {
  entity: Entity,
  layout: GraphLayout
  updateLayout: (layout: GraphLayout) => void
}

interface IEntityEditorState {
  propsToEdit: Set<Property>
}

export default class EntityEditor extends PureComponent<IEntityEditorProps, IEntityEditorState> {
  private schemaProperties: Property[];

  onEntityChanged = (nextEntity: Entity) => {
    this.props.layout.appendEntity(nextEntity);
    this.props.updateLayout(this.props.layout)
  }

  constructor(props: IEntityEditorProps) {
    super(props);
    this.schemaProperties = Array.from(props.entity.schema.getProperties().values());

    this.state = {
      propsToEdit:this.getEditableProperties(props)
    }

  }

  getEditableProperties(props = this.props){
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
    if(this.props.entity !== nextProps.entity){
      this.schemaProperties = Array.from(nextProps.entity.schema.getProperties().values());
      this.setState({
        propsToEdit:this.getEditableProperties(nextProps)
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
        onEntityChanged={this.onEntityChanged}
        entity={entity}
        property={property}
      />)}
      <Callout>
        {/*TODO: Can be converted to separated component*/}
        <FormGroup label="Add more properties">
          <PropertySuggest
            itemPredicate={(query, property) => !propsToEdit.has(property) && `${property.name + property.description}`.includes(query.trim())}
            itemRenderer={(property, {handleClick, modifiers, query}) => {
              if (!modifiers.matchesPredicate) {
                return null;
              }
              const label = property.description ? property.name : undefined;
              const text = property.description || property.name;
              return (
                <MenuItem
                  active={modifiers.active}
                  disabled={modifiers.disabled}
                  label={label}
                  key={property.name}
                  onClick={handleClick}
                  text={highlightText(text, query)}
                />
              );
            }}
            resetOnSelect={true}
            onItemSelect={p => {
              this.setState(({propsToEdit}) => ({
                propsToEdit: new Set(propsToEdit.add(p))
              }))
            }}
            inputValueRenderer={p => p.name}
            items={this.schemaProperties}
            noResults={<NonIdealState
              icon="heart-broken"
              title="No search results"
              description="no such a property found, try using other Schemas"
            />}
          />
        </FormGroup>
      </Callout>
    </div>
  }
}