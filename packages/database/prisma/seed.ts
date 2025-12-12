import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Clean database
  console.log('🧹 Cleaning database...');
  await prisma.wishlistItem.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Database cleaned\n');

  // ============================================
  // USERS
  // ============================================
  console.log('👤 Creating users...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@berrioecommerce.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'SUPER_ADMIN',
      emailVerified: true,
      emailVerifiedAt: new Date(),
    },
  });

  const customers = await Promise.all(
    Array.from({ length: 20 }).map(async () => {
      return prisma.user.create({
        data: {
          email: faker.internet.email().toLowerCase(),
          password: hashedPassword,
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phone: faker.phone.number(),
          role: 'CUSTOMER',
          emailVerified: faker.datatype.boolean(),
          emailVerifiedAt: faker.datatype.boolean() ? faker.date.past() : null,
        },
      });
    })
  );

  console.log(`✅ Created ${customers.length + 1} users\n`);

  // ============================================
  // BRANDS
  // ============================================
  console.log('🏢 Creating brands...');

  const brandsData = [
    { name: 'Apple', logo: 'https://logo.clearbit.com/apple.com' },
    { name: 'Samsung', logo: 'https://logo.clearbit.com/samsung.com' },
    { name: 'Sony', logo: 'https://logo.clearbit.com/sony.com' },
    { name: 'Dell', logo: 'https://logo.clearbit.com/dell.com' },
    { name: 'HP', logo: 'https://logo.clearbit.com/hp.com' },
    { name: 'Lenovo', logo: 'https://logo.clearbit.com/lenovo.com' },
    { name: 'LG', logo: 'https://logo.clearbit.com/lg.com' },
    { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
    { name: 'Google', logo: 'https://logo.clearbit.com/google.com' },
    { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com' },
    { name: 'Asus', logo: 'https://logo.clearbit.com/asus.com' },
    { name: 'Acer', logo: 'https://logo.clearbit.com/acer.com' },
  ];

  const brands = await Promise.all(
    brandsData.map((brand) =>
      prisma.brand.create({
        data: {
          name: brand.name,
          slug: brand.name.toLowerCase().replace(/\s+/g, '-'),
          description: `${brand.name} - Líder mundial en tecnología y electrónica`,
          logo: brand.logo,
          website: `https://www.${brand.name.toLowerCase()}.com`,
          isActive: true,
        },
      })
    )
  );

  console.log(`✅ Created ${brands.length} brands\n`);

  // ============================================
  // CATEGORIES
  // ============================================
  console.log('📁 Creating categories...');

  const computersCategory = await prisma.category.create({
    data: {
      name: 'Computadoras y Laptops',
      slug: 'computadoras-laptops',
      description: 'Laptops, PCs de escritorio y accesorios',
      icon: '💻',
      order: 1,
      isActive: true,
    },
  });

  const smartphonesCategory = await prisma.category.create({
    data: {
      name: 'Smartphones y Tablets',
      slug: 'smartphones-tablets',
      description: 'Teléfonos inteligentes y tablets',
      icon: '📱',
      order: 2,
      isActive: true,
    },
  });

  const audioCategory = await prisma.category.create({
    data: {
      name: 'Audio y Sonido',
      slug: 'audio-sonido',
      description: 'Audífonos, bocinas y sistemas de audio',
      icon: '🎧',
      order: 3,
      isActive: true,
    },
  });

  const tvCategory = await prisma.category.create({
    data: {
      name: 'TV y Video',
      slug: 'tv-video',
      description: 'Televisores, monitores y proyectores',
      icon: '📺',
      order: 4,
      isActive: true,
    },
  });

  const gamingCategory = await prisma.category.create({
    data: {
      name: 'Gaming',
      slug: 'gaming',
      description: 'Consolas, videojuegos y accesorios',
      icon: '🎮',
      order: 5,
      isActive: true,
    },
  });

  const accessoriesCategory = await prisma.category.create({
    data: {
      name: 'Accesorios',
      slug: 'accesorios',
      description: 'Accesorios y periféricos',
      icon: '⌨️',
      order: 6,
      isActive: true,
    },
  });

  // Subcategories
  await prisma.category.createMany({
    data: [
      {
        name: 'Laptops Gaming',
        slug: 'laptops-gaming',
        parentId: computersCategory.id,
        order: 1,
      },
      {
        name: 'Laptops Ultrabook',
        slug: 'laptops-ultrabook',
        parentId: computersCategory.id,
        order: 2,
      },
      {
        name: 'PCs de Escritorio',
        slug: 'pcs-escritorio',
        parentId: computersCategory.id,
        order: 3,
      },
      {
        name: 'Smartphones Android',
        slug: 'smartphones-android',
        parentId: smartphonesCategory.id,
        order: 1,
      },
      {
        name: 'iPhone',
        slug: 'iphone',
        parentId: smartphonesCategory.id,
        order: 2,
      },
      {
        name: 'Tablets',
        slug: 'tablets',
        parentId: smartphonesCategory.id,
        order: 3,
      },
    ],
  });

  console.log('✅ Created 6 main categories with subcategories\n');

  // ============================================
  // PRODUCTS
  // ============================================
  console.log('📦 Creating products...');

  const productsData = [
    // Laptops
    {
      name: 'MacBook Pro 14" M3',
      category: computersCategory.id,
      brand: brands.find((b) => b.name === 'Apple')?.id,
      price: 1999.99,
      compareAtPrice: 2299.99,
      stock: 15,
      isFeatured: true,
      specifications: {
        processor: 'Apple M3',
        ram: '16GB',
        storage: '512GB SSD',
        screen: '14" Liquid Retina XDR',
        graphics: 'Integrated',
      },
    },
    {
      name: 'Dell XPS 15',
      category: computersCategory.id,
      brand: brands.find((b) => b.name === 'Dell')?.id,
      price: 1799.99,
      compareAtPrice: 1999.99,
      stock: 20,
      isFeatured: true,
      specifications: {
        processor: 'Intel Core i7-13700H',
        ram: '32GB DDR5',
        storage: '1TB SSD',
        screen: '15.6" OLED 4K',
        graphics: 'NVIDIA RTX 4060',
      },
    },
    {
      name: 'Lenovo ThinkPad X1 Carbon',
      category: computersCategory.id,
      brand: brands.find((b) => b.name === 'Lenovo')?.id,
      price: 1599.99,
      stock: 12,
      specifications: {
        processor: 'Intel Core i7',
        ram: '16GB',
        storage: '512GB SSD',
        screen: '14" FHD',
      },
    },
    // Smartphones
    {
      name: 'iPhone 15 Pro Max',
      category: smartphonesCategory.id,
      brand: brands.find((b) => b.name === 'Apple')?.id,
      price: 1199.99,
      stock: 30,
      isFeatured: true,
      specifications: {
        processor: 'A17 Pro',
        ram: '8GB',
        storage: '256GB',
        screen: '6.7" OLED',
        camera: '48MP + 12MP + 12MP',
        battery: '4422 mAh',
      },
    },
    {
      name: 'Samsung Galaxy S24 Ultra',
      category: smartphonesCategory.id,
      brand: brands.find((b) => b.name === 'Samsung')?.id,
      price: 1299.99,
      stock: 25,
      isFeatured: true,
      specifications: {
        processor: 'Snapdragon 8 Gen 3',
        ram: '12GB',
        storage: '512GB',
        screen: '6.8" Dynamic AMOLED 2X',
        camera: '200MP + 50MP + 12MP + 10MP',
      },
    },
    {
      name: 'Google Pixel 8 Pro',
      category: smartphonesCategory.id,
      brand: brands.find((b) => b.name === 'Google')?.id,
      price: 999.99,
      stock: 18,
      specifications: {
        processor: 'Google Tensor G3',
        ram: '12GB',
        storage: '256GB',
        screen: '6.7" LTPO OLED',
        camera: '50MP + 48MP + 48MP',
      },
    },
    // Audio
    {
      name: 'Sony WH-1000XM5',
      category: audioCategory.id,
      brand: brands.find((b) => b.name === 'Sony')?.id,
      price: 399.99,
      compareAtPrice: 449.99,
      stock: 40,
      isFeatured: true,
      specifications: {
        type: 'Over-ear',
        wireless: true,
        noiseCancelling: 'Active',
        battery: '30 hours',
      },
    },
    {
      name: 'Apple AirPods Pro (2nd Gen)',
      category: audioCategory.id,
      brand: brands.find((b) => b.name === 'Apple')?.id,
      price: 249.99,
      stock: 50,
      specifications: {
        type: 'In-ear',
        wireless: true,
        noiseCancelling: 'Active',
        battery: '6 hours',
      },
    },
    // TVs
    {
      name: 'Samsung 65" Neo QLED 4K',
      category: tvCategory.id,
      brand: brands.find((b) => b.name === 'Samsung')?.id,
      price: 1899.99,
      stock: 8,
      isFeatured: true,
      specifications: {
        size: '65"',
        resolution: '4K UHD',
        technology: 'Neo QLED',
        smartTV: 'Tizen',
        hdmi: '4 x HDMI 2.1',
      },
    },
    {
      name: 'LG 55" OLED Evo C3',
      category: tvCategory.id,
      brand: brands.find((b) => b.name === 'LG')?.id,
      price: 1499.99,
      stock: 10,
      specifications: {
        size: '55"',
        resolution: '4K UHD',
        technology: 'OLED Evo',
        smartTV: 'webOS',
        refreshRate: '120Hz',
      },
    },
  ];

  const products = await Promise.all(
    productsData.map(async (product) => {
      const slug = product.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      return prisma.product.create({
        data: {
          sku: `SKU-${faker.string.alphanumeric(8).toUpperCase()}`,
          name: product.name,
          slug,
          description: faker.commerce.productDescription(),
          shortDescription: faker.lorem.sentence(),
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          cost: product.price * 0.6,
          stock: product.stock,
          weight: faker.number.int({ min: 100, max: 5000 }),
          dimensions: {
            length: faker.number.int({ min: 10, max: 50 }),
            width: faker.number.int({ min: 10, max: 50 }),
            height: faker.number.int({ min: 2, max: 30 }),
          },
          specifications: product.specifications,
          categoryId: product.category,
          brandId: product.brand,
          isActive: true,
          isFeatured: product.isFeatured || false,
          metaTitle: product.name,
          metaDescription: faker.lorem.sentence(),
          images: {
            create: [
              {
                url: `https://picsum.photos/seed/${faker.string.uuid()}/800/800`,
                alt: product.name,
                order: 0,
                isPrimary: true,
              },
              {
                url: `https://picsum.photos/seed/${faker.string.uuid()}/800/800`,
                alt: `${product.name} - Vista 2`,
                order: 1,
                isPrimary: false,
              },
              {
                url: `https://picsum.photos/seed/${faker.string.uuid()}/800/800`,
                alt: `${product.name} - Vista 3`,
                order: 2,
                isPrimary: false,
              },
            ],
          },
        },
      });
    })
  );

  console.log(`✅ Created ${products.length} products\n`);

  // ============================================
  // ADDRESSES
  // ============================================
  console.log('🏠 Creating addresses...');

  const addresses = await Promise.all(
    customers.slice(0, 10).map((customer) =>
      prisma.address.create({
        data: {
          userId: customer.id,
          firstName: customer.firstName || '',
          lastName: customer.lastName || '',
          company: faker.datatype.boolean() ? faker.company.name() : undefined,
          addressLine1: faker.location.streetAddress(),
          addressLine2: faker.datatype.boolean()
            ? faker.location.secondaryAddress()
            : undefined,
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode(),
          country: 'US',
          phone: faker.phone.number(),
          isDefault: true,
        },
      })
    )
  );

  console.log(`✅ Created ${addresses.length} addresses\n`);

  // ============================================
  // ORDERS
  // ============================================
  console.log('🛍️ Creating orders...');

  const orders = await Promise.all(
    customers.slice(0, 5).map(async (customer, index) => {
      const orderProducts = faker.helpers.arrayElements(products, {
        min: 1,
        max: 3,
      });
      const address = addresses[index];

      if (!address) return null;

      const subtotal = orderProducts.reduce(
        (acc, p) => acc + Number(p.price),
        0
      );
      const tax = subtotal * 0.08;
      const shipping = 15.99;
      const total = subtotal + tax + shipping;

      return prisma.order.create({
        data: {
          orderNumber: `ORD-${new Date().getFullYear()}${String(
            new Date().getMonth() + 1
          ).padStart(2, '0')}${String(new Date().getDate()).padStart(
            2,
            '0'
          )}-${faker.string.numeric(5)}`,
          userId: customer.id,
          email: customer.email,
          addressId: address.id,
          status: faker.helpers.arrayElement([
            'PENDING',
            'CONFIRMED',
            'PROCESSING',
            'SHIPPED',
            'DELIVERED',
          ]),
          paymentStatus: 'PAID',
          subtotal,
          tax,
          shipping,
          discount: 0,
          total,
          currency: 'USD',
          items: {
            create: orderProducts.map((product) => ({
              productId: product.id,
              productName: product.name,
              productSku: product.sku,
              quantity: faker.number.int({ min: 1, max: 3 }),
              price: Number(product.price),
              discount: 0,
              subtotal: Number(product.price),
            })),
          },
          payment: {
            create: {
              provider: 'STRIPE',
              transactionId: `pi_${faker.string.alphanumeric(24)}`,
              status: 'COMPLETED',
              amount: total,
              currency: 'USD',
              paymentMethod: 'card',
              last4: faker.finance.creditCardNumber('####'),
              cardBrand: faker.helpers.arrayElement([
                'Visa',
                'Mastercard',
                'Amex',
              ]),
              paidAt: new Date(),
            },
          },
        },
      });
    })
  );

  console.log(`✅ Created ${orders.filter(Boolean).length} orders\n`);

  // ============================================
  // REVIEWS
  // ============================================
  console.log('⭐ Creating reviews...');

  const reviews = await Promise.all(
    products.slice(0, 5).map((product) =>
      prisma.review.create({
        data: {
          productId: product.id,
          userId: faker.helpers.arrayElement(customers).id,
          rating: faker.number.int({ min: 3, max: 5 }),
          title: faker.lorem.sentence(),
          comment: faker.lorem.paragraph(),
          isVerifiedPurchase: true,
          status: 'APPROVED',
        },
      })
    )
  );

  console.log(`✅ Created ${reviews.length} reviews\n`);

  // ============================================
  // CART ITEMS
  // ============================================
  console.log('🛒 Creating cart items...');

  const cartItems = await Promise.all(
    customers.slice(0, 8).map((customer) =>
      prisma.cartItem.create({
        data: {
          userId: customer.id,
          productId: faker.helpers.arrayElement(products).id,
          quantity: faker.number.int({ min: 1, max: 5 }),
        },
      })
    )
  );

  console.log(`✅ Created ${cartItems.length} cart items\n`);

  console.log('✨ Seed completed successfully!\n');
  console.log('📊 Summary:');
  console.log(`   - Users: ${customers.length + 1}`);
  console.log(`   - Brands: ${brands.length}`);
  console.log(`   - Categories: 6`);
  console.log(`   - Products: ${products.length}`);
  console.log(`   - Orders: ${orders.filter(Boolean).length}`);
  console.log(`   - Reviews: ${reviews.length}`);
  console.log(`   - Cart Items: ${cartItems.length}`);
  console.log('\n🔐 Admin credentials:');
  console.log('   Email: admin@berrioecommerce.com');
  console.log('   Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
