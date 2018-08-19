import env from '../env'

// Cognito settings
export const aws = {
  clientId: env.COGNITO_APP_CLIENT_ID || '',
  poolId: env.COGNITO_USER_POOL_ID || ''
}
