const client = require('../../client')
const extractData = require('./extractData')

function applyChange(
  { toCreate = [], toUpdate = [], toDelete = [] },
  pathBaseName,
  ...pathArguments
) {
  return Promise.all([
    ...toCreate.map(data =>
      client[`create${pathBaseName}`](...pathArguments, extractData(data))
    ),
    ...toUpdate.map(data =>
      client[`update${pathBaseName}`](
        ...pathArguments,
        data.id,
        extractData(data)
      )
    ),
    ...toDelete.map(({ id }) =>
      client[`delete${pathBaseName}`](...pathArguments, id)
    )
  ])
}

module.exports = applyChange
