const PropTypes = require('prop-types')
const organizationPropType = require('./propTypes/organization')

const {
  arrayOf,
  bool,
  number,
  string,
  object,
  oneOf,
  oneOfType,
  shape
} = PropTypes

// Shortcut for single value
const value = value => oneOf([value])
const timeIntervals = oneOf(['minute', 'hour', 'day', 'week', 'month'])
const allOrArrayOf = shape => oneOfType([value('*'), arrayOf(shape)])

// Main definition
module.exports = {
  organization: organizationPropType.isRequired,

  package: shape({
    name: string.isRequired,
    description: string,
    eav: object,
    keyLength: number,
    nearQuotaThreshold: number,
    notifyAdminEmails: string,
    notifyAdminPeriod: timeIntervals,
    notifyDeveloperPeriod: timeIntervals,
    sharedSecretLength: number,
    notifyAdminNearQuota: bool,
    notifyAdminOverQuota: bool,
    notifyAdminOverThrottle: bool,
    notifyDeveloperNearQuota: bool,
    notifyDeveloperOverQuota: bool,
    notifyDeveloperOverThrottle: bool
  }),
  plans: arrayOf(
    shape({
      name: string.isRequired,
      description: string,
      status: oneOf(['active', 'inactive']),
      emailTemplateSetId: string,
      eav: object,
      notes: string,
      maxNumKeysAllowed: number,
      numKeysBeforeReview: number,
      qpsLimitCeiling: number,
      rateLimitCeiling: number,
      rateLimitPeriod: timeIntervals,
      adminKeyProvisioningEnabled: bool,
      qpsLimitExempt: bool,
      qpsLimitKeyOverrideAllowed: bool,
      rateLimitExempt: bool,
      rateLimitKeyOverrideAllowed: bool,
      responseFilterOverrideAllowed: bool,
      selfServiceKeyProvisioningEnabled: bool,

      services: arrayOf(
        shape({
          id: string,
          name: string,
          endpoints: allOrArrayOf(
            shape({
              id: string,
              name: string,
              undefinedMethodsAllowed: bool,
              methods: allOrArrayOf(
                oneOfType([string, shape({ id: string, name: string })])
              )
            })
          ),
          methods: allOrArrayOf(
            oneOfType([string, shape({ name: string.isRequired })])
          )
        })
      )
    })
  )
}
