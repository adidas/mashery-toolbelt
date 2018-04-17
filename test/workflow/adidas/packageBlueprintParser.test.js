const makeBlueprintParser = require('../../../src/workflow/adidas/makeBlueprintParser')
const packagePropTypes = require('../../../src/workflow/adidas/utils/packageBlueprintPropTypes')
const packageBlueprintParser = makeBlueprintParser(packagePropTypes)

test('all data', () => {
  const blueprint = {
    package: {
      name: 'Some package',
      description: 'Package description',
      eav: {},
      keyLength: 24,
      nearQuotaThreshold: 50,
      notifyAdminEmails: 'Mashery_Support@adidas.com',
      notifyAdminPeriod: 'day',
      notifyDeveloperPeriod: 'day',
      sharedSecretLength: 10,
      notifyAdminNearQuota: true,
      notifyAdminOverQuota: true,
      notifyAdminOverThrottle: true,
      notifyDeveloperNearQuota: true,
      notifyDeveloperOverQuota: true,
      notifyDeveloperOverThrottle: true
    },
    plans: [
      {
        name: 'Plan name',
        description: 'This is an unlimited PLN demo',
        status: 'active',
        emailTemplateSetId: null,
        eav: {},
        notes: null,
        maxNumKeysAllowed: 4,
        numKeysBeforeReview: 0,
        qpsLimitCeiling: 1000,
        rateLimitCeiling: 0,
        rateLimitPeriod: 'day',
        adminKeyProvisioningEnabled: true,
        qpsLimitExempt: false,
        qpsLimitKeyOverrideAllowed: true,
        rateLimitExempt: true,
        rateLimitKeyOverrideAllowed: true,
        responseFilterOverrideAllowed: true,
        selfServiceKeyProvisioningEnabled: false,

        services: [
          {
            id: 'lkdsjaljdsalkjdlkas',
            endpoints: [
              {
                name: 'My endpoint',
                undefinedMethodsAllowed: true,
                methods: [
                  { id: 'jhdsauzdsadjsaldjal' },
                  { name: 'demo' },
                  'demo'
                ]
              },
              {
                name: 'Another service',
                endpoints: '*',
                methods: [{ name: 'demo' }, 'demo']
              },
              {
                name: 'Another plan',
                description: 'Something something',
                endpoints: '*',
                methods: '*'
              }
            ]
          }
        ]
      }
    ]
  }

  expect(packageBlueprintParser(blueprint)).resolves.toEqual(blueprint)
})
