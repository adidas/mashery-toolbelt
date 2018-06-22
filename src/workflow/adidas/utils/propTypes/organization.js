const PropTypes = require('prop-types')

module.exports = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  })
])
