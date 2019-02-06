import { Model } from '../../src/followthemoney/model'
import { schemata } from './_schemata'
import Schema from '../../src/followthemoney/schema'
describe('ftm/Model class', () => {
  it('should be instantiable', () => {
    expect(new Model({})).toBeInstanceOf(Model)
  })
  describe('getSchema method', () => {
    let modelInstance: Model
    beforeEach(() => {
      modelInstance = new Model(schemata)
    })

    it('should exist', () => {
      expect(modelInstance).toHaveProperty('getSchema')
    })
    it('should return `Schema` for string', () => {
      const schema = modelInstance.getSchema('Thing')
      expect(schema).toBeInstanceOf(Schema)
    })
  })
  it('should have property `schemata`', () => {
    const model = new Model(schemata)
    expect(model).toHaveProperty('schemata')
    expect(model.schemata).toBe(schemata)
  })
})
