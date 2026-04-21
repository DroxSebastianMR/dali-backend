
export function mapContext(user: any) {
    return {
        businesses: user.businesses?.map((b: any) => ({
            id: b.id,
            nombre_comercial: b.nombre_comercial,
            estado: b.estado,
            role: b.role,
        })) || [],
    };
}