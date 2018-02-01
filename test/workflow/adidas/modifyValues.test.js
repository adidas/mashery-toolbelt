const modifyValues = require('../../../src/workflow/adidas/modifyValues')

const devApi = {
  service: {
    name: 'DEV Some API',
    endpoints: [
      {
        name: 'DEV First Endpoint',
        trafficManagerDomain: 'dev.traffic.domain.com',
        publicDomains: [{ address: 'dev.public.domain.com' }],
        systemDomains: [{ address: 'backend.dev.domain.com' }],
        requestPathAlias: '/{id}',
        outboundRequestTargetPath: 'path/dev/{id}'
      }
    ]
  }
}

const qaApi = {
  service: {
    name: 'QA Some API',
    endpoints: [
      {
        name: 'QA First Endpoint',
        trafficManagerDomain: 'qa.public.domain.com',
        publicDomains: [{ address: 'qa.public.domain.com' }],
        systemDomains: [{ address: 'backend.qa.domain.com' }],
        requestPathAlias: '/{id}',
        outboundRequestTargetPath: 'path/qa/{id}'
      }
    ]
  }
}

const prdApi = {
  service: {
    name: 'PRD Some API',
    endpoints: [
      {
        name: 'PRD First Endpoint',
        trafficManagerDomain: 'traffic.domain.com',
        publicDomains: [{ address: 'public.domain.com' }],
        systemDomains: [{ address: 'backend.domain.com' }],
        requestPathAlias: '/{id}',
        outboundRequestTargetPath: 'path/{id}'
      }
    ]
  }
}

// const sitApi = {
//   service: {
//     name: 'SIT Some API'
//   },
//   endpoints: [
//     {
//       name: 'SIT First Endpoint',
//       trafficManagerDomain: 'sit.traffic.domain.com',
//       publicDomains: [{ address: 'sit.public.domain.com' }],
//       systemDomains: [{ address: 'backend.sit.domain.com' }],
//       requestPathAlias: '/{id}',
//       outboundRequestTargetPath: 'sit/path/{id}'
//     }
//   ]
// }

test('promotes DEV API to QA', () => {
  expect(modifyValues(devApi, {
    name: 'DEV*:QA*',
    publicDomain: 'qa.public.domain.com',
    endpointDomain: 'backend.qa.domain.com',
    endpointPath: '*/dev/*:*/qa/*',
  })).toEqual(qaApi)
})

test('promotes QA API to PRD', () => {
  expect(modifyValues(qaApi, {
    name: 'QA*:PRD*',
    trafficDomain: 'traffic.domain.com',
    publicDomain: 'public.domain.com',
    endpointDomain: 'backend.domain.com',
    endpointPath: '*/qa/*:*/*',
  })).toEqual(prdApi)
})

// test('promotes QA API to SIT', () => {
//   expect(modifyValues(qaApi, 'backend.sit.domain.com')).toEqual(sitApi)
// })


const complexApi = require('./fixtures/complexApi.json')

// Test real world api
test('promotes complex API to QA', () => {
  api = JSON.parse(JSON.stringify(complexApi))
  api.service.endpoints = api.service.endpoints.filter(endpoint => endpoint.name.startsWith("DEV"))
  expect(modifyValues(api, {
    name: ['DEV*:QA*', '*:QA *'],
    publicDomain: 'qa.apiinternal.adidas.com',
    endpointDomain: 'staging.coredam-s3-facade-service.staging.he.k8s.emea.adsint.biz',
    ignoreOtherEnv: true,
  })).toMatchSnapshot()
})

test('promotes complex API to PRD', () => {
  api = JSON.parse(JSON.stringify(complexApi))
  api.service.endpoints = api.service.endpoints.filter(endpoint => endpoint.name.startsWith("QA"))
  expect(modifyValues(api, {
    name: ['QA*:PRD*', '*:PRD *'],
    publicDomain: 'apiinternal.adidas.com',
    endpointDomain: 'production.coredam-s3-facade-service.prod.he.k8s.emea.adsint.biz',
    ignoreOtherEnv: true,
  })).toMatchSnapshot()
})
