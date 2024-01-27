'use client';

import { useSearchParams } from 'next/dist/client/components/navigation';
import { useRouter } from 'next/navigation';
import queryString from 'query-string';
import { useCallback } from 'react';
import { IconType } from 'react-icons';

function CategoryOption({
  label,
  icon: Icon,
  selected,
}: {
  label: string;
  icon: IconType;
  selected?: boolean;
}) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    if (label === 'All') {
      router.push('/');
    } else {
      let currentQuery = {};

      if (params) {
        currentQuery = queryString.parse(params.toString());
      }

      const updtatedQuery = {
        ...currentQuery,
        category: label,
      };

      const url = queryString.stringifyUrl(
        {
          url: '/',
          query: updtatedQuery,
        },
        {
          skipNull: true,
        }
      );

      router.push(url);
    }
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`category-option-wrap ${
        selected ? 'category-option-selected' : 'category-option-not-selected'
      }`}
    >
      <div className="mb-2 flex gap-1">
        <Icon size={20} />
        <div className="category-option-label">{label}</div>
      </div>
    </div>
  );
}
export default CategoryOption;
