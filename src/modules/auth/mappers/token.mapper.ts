import ms, { StringValue } from 'ms';

export function mapTokens(accessToken: string, refreshToken: string) {
  const accessExpires = process.env.JWT_ACCESS_EXPIRES as StringValue;
  const refreshExpires = process.env.JWT_REFRESH_EXPIRES as StringValue;

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    token_type: 'Bearer',
    expires_in: ms(accessExpires) / 1000,
    refresh_expires_in: ms(refreshExpires) / 1000,
  };
}
