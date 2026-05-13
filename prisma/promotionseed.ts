import { PrismaClient, BannerType, BannerTargetType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed DALI...");

  /*
  |--------------------------------------------------------------------------
  | USER ADMIN
  |--------------------------------------------------------------------------
  */

  const admin = await prisma.user.create({
    data: {
      email: "sebas@dali.com",
      first_name: "Sebastian",
      last_name: "Mercado",
      status: "ACTIVE",
    },
  });

  /*
  |--------------------------------------------------------------------------
  | CATEGORIES
  |--------------------------------------------------------------------------
  */

  const bebidas = await prisma.productCategory.create({
    data: {
      name: "Bebidas",
    },
  });

  const farmacia = await prisma.productCategory.create({
    data: {
      name: "Farmacia",
    },
  });

  const libreria = await prisma.productCategory.create({
    data: {
      name: "Librería",
    },
  });

  /*
  |--------------------------------------------------------------------------
  | PRODUCTS
  |--------------------------------------------------------------------------
  */

  const cocaCola = await prisma.product.create({
    data: {
      name: "Coca Cola 1L",
      brand: "Coca Cola",
      unit_of_measurement: "unidad",
      category_id: bebidas.id,
    },
  });

  const ibuprofeno = await prisma.product.create({
    data: {
      name: "Ibuprofeno 400mg",
      brand: "Bayer",
      unit_of_measurement: "caja",
      category_id: farmacia.id,
    },
  });

  const cuaderno = await prisma.product.create({
    data: {
      name: "Cuaderno Alpha",
      brand: "Alpha",
      unit_of_measurement: "unidad",
      category_id: libreria.id,
    },
  });

  /*
  |--------------------------------------------------------------------------
  | BUSINESSES
  |--------------------------------------------------------------------------
  */

  const bodega = await prisma.business.create({
    data: {
      trade_name: "Bodega San José",
      description: "Bodega local con delivery rápido",
      status: "ACTIVE",
      logo_url:
        "https://images.unsplash.com/photo-1542838132-92c53300491e",
    },
  });

  const farmaciaUniversal = await prisma.business.create({
    data: {
      trade_name: "Farmacia Universal",
      description: "Medicinas y delivery express",
      status: "ACTIVE",
      logo_url:
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88",
    },
  });

  const libreriaTruman = await prisma.business.create({
    data: {
      trade_name: "Librería Truman",
      description: "Útiles escolares y oficina",
      status: "ACTIVE",
      logo_url:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da",
    },
  });

  /*
  |--------------------------------------------------------------------------
  | BANNER 1
  |--------------------------------------------------------------------------
  */

  const banner1 = await prisma.homeBanner.create({
    data: {
      title: "2x1 en bebidas cerca de ti",
      subtitle: "Promoción válida hasta las 6PM",
      image_url:
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd",
      background_color: "#F59E0B",

      badge_text: "PROMO",
      badge_color: "#DC2626",

      type: BannerType.PROMOTION,

      cta_text: "Ver oferta",

      priority: 100,

      is_active: true,

      created_by: admin.id,

      targets: {
        create: {
          target_type: BannerTargetType.BUSINESS,
          business_id: bodega.id,
        },
      },

      locations: {
        create: {
          country: "Perú",
          state: "La Libertad",
          city: "Trujillo",
          district: "Trujillo",
          latitude: -8.109052,
          longitude: -79.021534,
          radius_km: 15,
        },
      },
    },
  });

  /*
  |--------------------------------------------------------------------------
  | BANNER 2
  |--------------------------------------------------------------------------
  */

  await prisma.homeBanner.create({
    data: {
      title: "Farmacia Universal entrega en 15 min",
      subtitle: "Medicinas cerca de ti",
      image_url:
        "https://images.unsplash.com/photo-1585435557343-3b092031d4f7",
      background_color: "#2563EB",

      badge_text: "DELIVERY",
      badge_color: "#16A34A",

      type: BannerType.NEARBY,

      cta_text: "Pedir ahora",

      priority: 90,

      is_active: true,

      created_by: admin.id,

      targets: {
        create: {
          target_type: BannerTargetType.BUSINESS,
          business_id: farmaciaUniversal.id,
        },
      },

      locations: {
        create: {
          country: "Perú",
          state: "La Libertad",
          city: "Trujillo",
          district: "Víctor Larco",
          latitude: -8.1348,
          longitude: -79.0434,
          radius_km: 10,
        },
      },
    },
  });

  /*
  |--------------------------------------------------------------------------
  | BANNER 3
  |--------------------------------------------------------------------------
  */

  await prisma.homeBanner.create({
    data: {
      title: "Útiles escolares en tendencia",
      subtitle: "Encuentra librerías cerca",
      image_url:
        "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3",
      background_color: "#7C3AED",

      badge_text: "ESCOLAR",
      badge_color: "#EA580C",

      type: BannerType.RECOMMENDATION,

      cta_text: "Explorar",

      priority: 80,

      is_active: true,

      created_by: admin.id,

      targets: {
        create: {
          target_type: BannerTargetType.CATEGORY,
          category_id: libreria.id,
        },
      },

      locations: {
        create: {
          country: "Perú",
          state: "La Libertad",
          city: "Trujillo",
        },
      },
    },
  });

  console.log("✅ Seed DALI completado");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });