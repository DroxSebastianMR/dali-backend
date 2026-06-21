import { PrismaClient, BusinessStatus } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedBusinesses() {
  const sebastian = await prisma.user.findUnique({
    where: {
      email: 'SebastianMR08@dali.com',
    },
  });

  if (!sebastian) {
    console.log('⚠️ Usuario propietario no encontrado');
    return;
  }

  const businesses = [
    {
      trade_name: 'Farmacia Salud Plus',
      legal_name: 'Farmacia Salud Plus SAC',
      ruc: '20612345671',
      description: 'Medicamentos, productos de cuidado personal y delivery.',
      logo_url: 'https://placehold.co/300x300?text=Salud+Plus',
      cover_image_url: 'https://placehold.co/1200x600?text=Farmacia+Salud+Plus',
      email: 'contacto@saludplus.pe',
      phone: '044123456',
      whatsapp: '51987654321',
      status: BusinessStatus.ACTIVE,
      is_verified: true,
      average_rating: 4.9,
      total_reviews: 328,
      staff_names: ['María Gómez', 'Carlos Ruiz'],
      location: {
        name: 'Sucursal Principal',
        address: 'Av. Larco 1250',
        reference: 'Frente al Real Plaza',
        country: 'Perú',
        state: 'La Libertad',
        city: 'Trujillo',
        district: 'Víctor Larco',
        latitude: -8.121337,
        longitude: -79.034904,
      },
    },

    {
      trade_name: 'Botica San Martín',
      legal_name: 'Botica San Martín EIRL',
      ruc: '20612345672',
      description: 'Medicamentos genéricos y productos de salud.',
      logo_url: 'https://placehold.co/300x300?text=San+Martin',
      cover_image_url: 'https://placehold.co/1200x600?text=Botica+San+Martin',
      email: 'ventas@sanmartin.pe',
      phone: '044555888',
      whatsapp: '51912345678',
      status: BusinessStatus.ACTIVE,
      is_verified: true,
      average_rating: 4.8,
      total_reviews: 241,
      staff_names: ['Luis Medina', 'Andrea Vega'],
      location: {
        name: 'Sucursal Centro',
        address: 'Jr. Pizarro 640',
        reference: 'A media cuadra de la Plaza de Armas',
        country: 'Perú',
        state: 'La Libertad',
        city: 'Trujillo',
        district: 'Centro Histórico',
        latitude: -8.111763,
        longitude: -79.028687,
      },
    },

    {
      trade_name: 'Market Express',
      legal_name: 'Market Express SAC',
      ruc: '20612345673',
      description: 'Minimarket con productos de primera necesidad.',
      logo_url: 'https://placehold.co/300x300?text=Market',
      cover_image_url: 'https://placehold.co/1200x600?text=Market+Express',
      email: 'hola@marketexpress.pe',
      phone: '044777444',
      whatsapp: '51999999999',
      status: BusinessStatus.ACTIVE,
      is_verified: false,
      average_rating: 4.5,
      total_reviews: 112,
      staff_names: ['José Pérez'],
      location: {
        name: 'Local Principal',
        address: 'Av. América Oeste 980',
        reference: 'Cerca de la UPAO',
        country: 'Perú',
        state: 'La Libertad',
        city: 'Trujillo',
        district: 'Trujillo',
        latitude: -8.115624,
        longitude: -79.038261,
      },
    },

    {
      trade_name: 'Farmacia Santa Rosa',
      legal_name: 'Farmacia Santa Rosa SAC',
      ruc: '20612345674',
      description: 'Medicinas y productos de bienestar.',
      logo_url: 'https://placehold.co/300x300?text=Santa+Rosa',
      cover_image_url: 'https://placehold.co/1200x600?text=Santa+Rosa',
      email: 'contacto@santarosa.pe',
      phone: '044321654',
      whatsapp: '51987611111',
      status: BusinessStatus.ACTIVE,
      is_verified: true,
      average_rating: 4.7,
      total_reviews: 189,
      staff_names: ['Rosa Díaz'],
      location: {
        name: 'Sucursal Primavera',
        address: 'Av. Húsares de Junín 500',
        reference: 'Frente al colegio',
        country: 'Perú',
        state: 'La Libertad',
        city: 'Trujillo',
        district: 'Primavera',
        latitude: -8.108,
        longitude: -79.03,
      },
    },

    {
      trade_name: 'Super Market Norte',
      legal_name: 'Super Market Norte SAC',
      ruc: '20612345675',
      description: 'Supermercado de productos nacionales.',
      logo_url: 'https://placehold.co/300x300?text=SMN',
      cover_image_url: 'https://placehold.co/1200x600?text=Super+Market',
      email: 'ventas@smn.pe',
      phone: '044222111',
      whatsapp: '51981234567',
      status: BusinessStatus.ACTIVE,
      is_verified: true,
      average_rating: 4.6,
      total_reviews: 256,
      staff_names: ['Carlos Peña', 'Ana Torres'],
      location: {
        name: 'Local Norte',
        address: 'Av. España 2100',
        reference: 'Esquina principal',
        country: 'Perú',
        state: 'La Libertad',
        city: 'Trujillo',
        district: 'El Recreo',
        latitude: -8.107,
        longitude: -79.025,
      },
    },

    {
      trade_name: 'Café Aroma',
      legal_name: 'Café Aroma EIRL',
      ruc: '20612345676',
      description: 'Cafetería especializada en café peruano.',
      logo_url: 'https://placehold.co/300x300?text=Aroma',
      cover_image_url: 'https://placehold.co/1200x600?text=Cafe+Aroma',
      email: 'hola@cafearoma.pe',
      phone: '044888999',
      whatsapp: '51994455667',
      status: BusinessStatus.ACTIVE,
      is_verified: false,
      average_rating: 4.9,
      total_reviews: 421,
      staff_names: ['Lucía Ramírez'],
      location: {
        name: 'Local Centro',
        address: 'Jr. Independencia 310',
        reference: 'Cerca de la Catedral',
        country: 'Perú',
        state: 'La Libertad',
        city: 'Trujillo',
        district: 'Centro Histórico',
        latitude: -8.109,
        longitude: -79.028,
      },
    },

    {
      trade_name: 'Veterinaria Huellitas',
      legal_name: 'Veterinaria Huellitas SAC',
      ruc: '20612345677',
      description: 'Atención veterinaria y accesorios para mascotas.',
      logo_url: 'https://placehold.co/300x300?text=Huellitas',
      cover_image_url: 'https://placehold.co/1200x600?text=Huellitas',
      email: 'info@huellitas.pe',
      phone: '044333777',
      whatsapp: '51995544332',
      status: BusinessStatus.ACTIVE,
      is_verified: true,
      average_rating: 4.8,
      total_reviews: 298,
      staff_names: ['Pedro Chávez'],
      location: {
        name: 'Consultorio Principal',
        address: 'Av. Fátima 900',
        reference: 'Al lado de la clínica',
        country: 'Perú',
        state: 'La Libertad',
        city: 'Trujillo',
        district: 'California',
        latitude: -8.118,
        longitude: -79.036,
      },
    },

    {
      trade_name: 'Panadería San José',
      legal_name: 'Panadería San José EIRL',
      ruc: '20612345678',
      description: 'Pan artesanal y pastelería fresca.',
      logo_url: 'https://placehold.co/300x300?text=San+Jose',
      cover_image_url: 'https://placehold.co/1200x600?text=Panaderia',
      email: 'ventas@sanjose.pe',
      phone: '044444888',
      whatsapp: '51997711223',
      status: BusinessStatus.ACTIVE,
      is_verified: false,
      average_rating: 4.4,
      total_reviews: 91,
      staff_names: ['Miguel Ríos'],
      location: {
        name: 'Local Principal',
        address: 'Av. Mansiche 150',
        reference: 'Frente al estadio',
        country: 'Perú',
        state: 'La Libertad',
        city: 'Trujillo',
        district: 'Trujillo',
        latitude: -8.103,
        longitude: -79.041,
      },
    },

    {
      trade_name: 'Tecno Store',
      legal_name: 'Tecno Store SAC',
      ruc: '20612345679',
      description: 'Venta de celulares, accesorios y gadgets.',
      logo_url: 'https://placehold.co/300x300?text=Tecno',
      cover_image_url: 'https://placehold.co/1200x600?text=Tecno+Store',
      email: 'contacto@tecnostore.pe',
      phone: '044999777',
      whatsapp: '51993322110',
      status: BusinessStatus.ACTIVE,
      is_verified: true,
      average_rating: 4.7,
      total_reviews: 387,
      staff_names: ['Kevin Soto', 'Andrea Silva'],
      location: {
        name: 'Sucursal Mall',
        address: 'Real Plaza Trujillo',
        reference: 'Segundo piso',
        country: 'Perú',
        state: 'La Libertad',
        city: 'Trujillo',
        district: 'Trujillo',
        latitude: -8.114,
        longitude: -79.029,
      },
    },

    {
      trade_name: 'Fresh Market',
      legal_name: 'Fresh Market SAC',
      ruc: '20612345680',
      description: 'Productos orgánicos y alimentos saludables.',
      logo_url: 'https://placehold.co/300x300?text=Fresh',
      cover_image_url: 'https://placehold.co/1200x600?text=Fresh+Market',
      email: 'info@freshmarket.pe',
      phone: '044121212',
      whatsapp: '51990012345',
      status: BusinessStatus.ACTIVE,
      is_verified: false,
      average_rating: 4.6,
      total_reviews: 175,
      staff_names: ['Diana León'],
      location: {
        name: 'Tienda Principal',
        address: 'Av. Larco 780',
        reference: 'Cerca del óvalo',
        country: 'Perú',
        state: 'La Libertad',
        city: 'Trujillo',
        district: 'Víctor Larco',
        latitude: -8.122,
        longitude: -79.032,
      },
    },
  ];

  for (const item of businesses) {
    const exists = await prisma.business.findUnique({
      where: {
        ruc: item.ruc,
      },
    });

    if (exists) {
      console.log(`⚠️ Negocio ya existe: ${item.trade_name}`);
      continue;
    }

    await prisma.business.create({
      data: {
        owner_user_id: sebastian.id,

        trade_name: item.trade_name,
        legal_name: item.legal_name,
        ruc: item.ruc,

        description: item.description,

        logo_url: item.logo_url,
        cover_image_url: item.cover_image_url,

        email: item.email,
        phone: item.phone,
        whatsapp: item.whatsapp,

        status: item.status,
        is_verified: item.is_verified,

        average_rating: item.average_rating,

        total_reviews: item.total_reviews,

        staff_names: item.staff_names,

        locations: {
          create: {
            name: item.location.name,

            address: item.location.address,

            reference: item.location.reference,

            country: item.location.country,

            state: item.location.state,

            city: item.location.city,

            district: item.location.district,

            latitude: item.location.latitude,

            longitude: item.location.longitude,

            is_main: true,
            is_active: true,

            delivery_available: true,
            pickup_available: true,
          },
        },
      },
    });

    console.log(`✅ Negocio creado: ${item.trade_name}`);
  }
}
