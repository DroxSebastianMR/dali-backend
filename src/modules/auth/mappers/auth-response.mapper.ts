import { mapAuthorization } from './authorization.mapper';
import { mapContext } from './context.mapper';
import { mapMeta } from './meta.mapper';
import { mapTokens } from './token.mapper';
import { mapUser } from './user.mapper';

export function mapAuthResponse(
  user: any,
  accessToken: string,
  refreshToken: string,
) {
  return {
    token: mapTokens(accessToken, refreshToken),
    user: mapUser(user),
    authorization: mapAuthorization(user),
    context: mapContext(user),
    meta: mapMeta(),
  };
}
