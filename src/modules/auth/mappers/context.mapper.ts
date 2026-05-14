export function mapContext(user: any) {
  return {
    businesses:
      user.owned_businesses?.map(
        (b: any) => ({
          id: b.id,

          trade_name:
            b.trade_name,

          status: b.status,
        }),
      ) || [],
  };
}