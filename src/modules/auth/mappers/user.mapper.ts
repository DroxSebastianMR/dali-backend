export function mapUser(user: any) {
  return {
    id: user.id,

    email: user.email,

    first_name: user.first_name,
    last_name: user.last_name,

    phone: user.phone,

    photo_url: user.photo_url,

    status: user.status,

    email_verified: user.email_verified,

    telefono_verified: user.telefono_verified,

    last_login_at: user.last_login_at,

    created_at: user.created_at,
  };
}
