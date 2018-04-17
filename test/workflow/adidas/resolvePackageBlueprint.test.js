const vcr = require('nock-vcr-recorder')
const resolvePackageBlueprint = require('../../../src/workflow/adidas/resolvePackageBlueprint')
const packageBlueprint = require('./packageBlueprint.json')
const packageBlueprintResult = require('./packageBlueprintResult.json')

test('#1', () => {
  const blueprintResolver = () => resolvePackageBlueprint(packageBlueprint)
  const packagePromise = vcr.useCassette(
    'package blueprint 1',
    blueprintResolver
  )
  return expect(packagePromise).resolves.toEqual(packageBlueprintResult)
})
