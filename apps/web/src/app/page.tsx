import { Hero } from '@/components/home/Hero';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { Categories } from '@/components/home/Categories';
import { FeaturedBrands } from '@/components/home/FeaturedBrands';
import { Newsletter } from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <FeaturedBrands />
      <Newsletter />
    </div>
  );
}
