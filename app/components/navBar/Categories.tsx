'use client';

import { categories } from '@/utils/utils';
import Container from '../Container';
import CategoryOption from './CategoryOption';
import { usePathname} from 'next/navigation';
import { useSearchParams } from 'next/dist/client/components/navigation';

function Categories() {
  const params = useSearchParams();
  const category = params?.get('category')
  const pathName = usePathname();

  const isMainPage = pathName === '/';

  if (!isMainPage) return null;

  return (
    <div className="categories-wrapper">
      <Container>
        <div className="categories-content-wrapper">
          {categories.map((item) => (
            <CategoryOption
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={
                category === item.label ||
                (category === null && item.label === 'All')
              }
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
export default Categories;
