export function mapAuthorization(user: any) {
  return {
    roles:
      user.user_roles?.map((r: any) => ({
        id: r.role.id,
        name: r.role.name,
      })) || [],
  };
}
