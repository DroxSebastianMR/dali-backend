

export function mapUser(user: any) {
    return {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        telefono: user.telefono,
        foto_url: user.foto_url,
        estado: user.estado,
        email_verified: user.email_verified,
        telefono_verified: user.telefono_verified,
        last_login_at: user.last_login_at,
        created_at: user.created_at,
    };
}