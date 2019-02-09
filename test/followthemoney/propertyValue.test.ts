import { Property, PropertyValue } from '../../src/followthemoney'
import { schemata } from './_schemata'

describe('ftm/ProperyValue', () => {
  const values = ['DESC-1', 'DESC-2']
  let propertyInstance = new PropertyValue(
    'description',
    values,
    new Property(schemata.Thing.properties.description)
  )
  ;['name', 'values'].forEach(propertyName =>
    it(`should have property ${propertyName}`, function() {
      expect(propertyInstance).toHaveProperty(propertyName)
    })
  )
  describe('toString method', () => {
    it('should exist', function() {
      expect(propertyInstance).toHaveProperty('toString')
    })
    it('should return string', function() {
      expect(typeof propertyInstance.toString()).toBe('string')
    })
    it('should return values seperated by comma', function() {
      expect(propertyInstance.toString(',')).toEqual(values.join(','))
    })
  })
  describe('method isEmpty', () => {
    it('should return return false if values persist', function() {
      expect(propertyInstance.isEmpty()).toEqual(false)
    })
  })
  it('should return return true if values empty', function() {
    const theProperty = new PropertyValue(
      'description',
      [],
      new Property(schemata.Thing.properties.description)
    )
    expect(theProperty.isEmpty()).toEqual(true)
  })
})
