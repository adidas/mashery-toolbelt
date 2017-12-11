const promoteApi = require('../../src/adidas/promoteApi')

const simpleApi = {
  service: {
    name: 'Some API'
  },
  endpoints: [
    {
      name: 'First Endpoint',
      trafficManagerDomain: 'traffic.domain.com',
      publicDomains: [{ address: 'public.domain.com' }],
      systemDomains: [{ address: 'backend.domain.com' }],
      requestPathAlias: '/{id}',
      outboundRequestTargetPath: 'path/{id}'
    }
  ]
}

const devApi = {
  service: {
    name: 'DEV Some API'
  },
  endpoints: [
    {
      name: 'DEV First Endpoint',
      trafficManagerDomain: 'dev.traffic.domain.com',
      publicDomains: [{ address: 'dev.public.domain.com' }],
      systemDomains: [{ address: 'backend.dev.domain.com' }],
      requestPathAlias: '/{id}',
      outboundRequestTargetPath: 'path/{id}'
    }
  ]
}

const qaApi = {
  service: {
    name: 'QA Some API'
  },
  endpoints: [
    {
      name: 'QA First Endpoint',
      trafficManagerDomain: 'qa.traffic.domain.com',
      publicDomains: [{ address: 'qa.public.domain.com' }],
      systemDomains: [{ address: 'backend.qa.domain.com' }],
      requestPathAlias: '/{id}',
      outboundRequestTargetPath: 'path/{id}'
    }
  ]
}

const prdApi = {
  service: {
    name: 'PRD Some API'
  },
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

const sitApi = {
  service: {
    name: 'SIT Some API'
  },
  endpoints: [
    {
      name: 'SIT First Endpoint',
      trafficManagerDomain: 'sit.traffic.domain.com',
      publicDomains: [{ address: 'sit.public.domain.com' }],
      systemDomains: [{ address: 'backend.sit.domain.com' }],
      requestPathAlias: '/{id}',
      outboundRequestTargetPath: 'sit/path/{id}'
    }
  ]
}

test('promotes API without env to DEV', () => {
  expect(promoteApi(simpleApi, 'dev', 'backend.dev.domain.com')).toEqual(devApi)
})

test('promotes DEV API to QA', () => {
  expect(promoteApi(devApi, 'qa', 'backend.qa.domain.com')).toEqual(qaApi)
})

test('promotes QA API to PRD', () => {
  expect(promoteApi(qaApi, 'prd', 'backend.domain.com')).toEqual(prdApi)
})

test('promotes QA API to SIT', () => {
  expect(promoteApi(qaApi, 'sit', 'backend.sit.domain.com')).toEqual(sitApi)
})
