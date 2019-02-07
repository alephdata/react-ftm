import { Property, PropertyValue } from '../../src/followthemoney'
import { schemata } from './_schemata'

describe('ftm/ProperyValue', () => {
  const values = ['DESC-1', 'DESC-2']
  let propertyInstance = new PropertyValue(
    'description',
    values,
    new Property(schemata.Thing.properties.description)
  )
  ;['name'].forEach(propertyName =>
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
})
