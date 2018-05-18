const isObject = require('isobject')
const pluralize = require('pluralize')
const clientErrorMessages = require('./error_messages')
const { RequestError } = require('./errors')
const validFields = require('./validFields')

function validateFields (methodName, allFields, fields) {
  const invalidFields = []

  fields.forEach(field => {
    if (!allFields.includes(field)) {
      invalidFields.push(field)
    }
  })

  if (invalidFields.length > 0) {
    throw new RequestError(
      'invalid_fields',
      clientErrorMessages.invalid_field(methodName, invalidFields)
    )
  }

  return fields
}

function collectFieldsFromObject (methodName, entityName, fieldsObject) {
  const allFields = validFields[entityName]
  const { all, fields, only, except, ...nested } = fieldsObject
  let collectedFields = []

  if (except) {
    const exceptFields = typeof except === 'string' ? except.split(',') : except
    validateFields(methodName, allFields, exceptFields)
    collectedFields = allFields.filter(field => !exceptFields.includes(field))
  } else if (all || only || fields) {
    collectedFields = collectFields(
      methodName,
      entityName,
      all || only || fields
    )
  }

  // Iterate over nested associations
  Object.keys(nested).forEach(nestedEntityName => {
    const pluralEntityName = pluralize.plural(nestedEntityName)
    const singularEntityName = pluralize.singular(nestedEntityName)

    // Check if nested association is valid
    if (!allFields.includes(pluralEntityName)) {
      throw new RequestError(
        'invalid_fields',
        clientErrorMessages.invalid_field(methodName, [
          `${entityName}.${nestedEntityName}`
        ])
      )
    }

    // Remove nested association when is presented as single field
    const nestedFieldIndex = collectedFields.findIndex(
      field => field === pluralEntityName
    )
    if (nestedFieldIndex > -1) {
      collectedFields.splice(nestedFieldIndex, 1)
    }

    // Recursively grap fields for nested association(s)
    const nestedFields = collectFields(
      methodName,
      singularEntityName,
      nested[nestedEntityName]
    ).map(nestedField => `${pluralEntityName}.${nestedField}`)
    collectedFields.push(...nestedFields)
  })

  return collectedFields
}

function collectFields (methodName, entityName, fields) {
  const allFields = [...validFields[entityName]]

  if (fields === true || fields === 'all' || fields === '*') {
    return allFields
  } else if (typeof fields === 'string') {
    return validateFields(methodName, allFields, fields.split(','))
  } else if (Array.isArray(fields)) {
    return validateFields(methodName, allFields, [...fields])
  } else if (isObject(fields)) {
    return collectFieldsFromObject(methodName, entityName, fields)
  } else {
    return null
  }
}

function makeFieldsParam (methodName, entityName, fields) {
  if (!fields) {
    return null
  }

  return collectFields(methodName, entityName, fields).join(',')
}

module.exports = {
  ...validFields,
  makeFieldsParam
}
