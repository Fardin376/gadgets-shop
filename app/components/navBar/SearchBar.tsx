'use client';

import { useRouter } from 'next/navigation';
import queryString from 'query-string';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FaMagnifyingGlass } from 'react-icons/fa6';

function SearchBar() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm) return router.push('/');

    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: { searchTerm: data.searchTerm },
      },
      { skipNull: true }
    );

    router.push(url);
    reset();
  };

  return (
    <div className="searchbar-wrapper">
      <input
        {...register('searchTerm')}
        autoComplete="off"
        type="text"
        placeholder="Explore your desired products"
        className="searchbar-field"
      />
      <button onClick={handleSubmit(onSubmit)} className="searchbar-button">
        {<FaMagnifyingGlass />}
      </button>
    </div>
  );
}
export default SearchBar;
