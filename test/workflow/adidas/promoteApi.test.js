const promoteApi = require('../../../src/workflow/adidas/promoteApi')

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
        trafficManagerDomain: 'qa.traffic.domain.com',
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
  expect(promoteApi(devApi, 'QA', {
    trafficDomain: 'qa.traffic.domain.com',
    publicDomain: 'qa.public.domain.com',
    publicPath: '*/dev/*:*/qa/*',
    endpointDomain: 'backend.qa.domain.com',
  })).toEqual(qaApi)
})

test('promotes QA API to PRD', () => {
  expect(promoteApi(qaApi, 'PRD', {
    trafficDomain: 'traffic.domain.com',
    publicDomain: 'public.domain.com',
    publicPath: '*/qa/*:*/*',
    endpointDomain: 'backend.domain.com',
  })).toEqual(prdApi)
})

// test('promotes QA API to SIT', () => {
//   expect(promoteApi(qaApi, 'sit', 'backend.sit.domain.com')).toEqual(sitApi)
// })
