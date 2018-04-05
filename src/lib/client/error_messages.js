module.exports = {
  authentication_failed: 'Authentication failed with unknown reason',
  developer_inactive:
    'Application key, application secret or accessToken is wrong',
  invalid_client: 'Invalid username or password',
  invalid_field: (methodName, fields) =>
    `Invalid fields '${fields.join(',')}' for '${methodName}' method call`,
  invalid_grant: 'Invalid refresh token',
  invalid_scope: 'Scope (Area UUID) does not exists',
  invalid_request: 'Invalid resource owner password credentials',
  invalid_url_part: ({ argName, pattern, val, valType }) =>
    `'${argName}' for path '${pattern}' cant be '${val}'(${valType})`,
  missing_credentials: missing =>
    'The following credentials are missing or have invalid value: ' +
    missing.join(', '),
  not_authenticated: 'Not authenticated',
  request_error: (method, path, status, statusText) =>
    `[${method.toUpperCase()}] ${path} failed:${status} (${statusText})`,
  unsupported_grant_type: 'Access or refresh token is wrong'
}
