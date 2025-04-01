import { useEffect, useState } from 'react';
import './Filter.css';

function Filter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        'https://localhost:7088/Bookstore/catgories'
      );
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  function checkboxFilter({ target }: { target: HTMLInputElement }) {
    const checkedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((c) => c !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(checkedCategories);
  }

  return (
    <>
      <div className="category-filter">
        <h5>Filter By Categories:</h5>
        <div className="category-list">
          {categories.map((c) => (
            <div key={c} className="category-item">
              <input
                type="checkbox"
                id={c}
                value={c}
                onChange={checkboxFilter}
              />
              <label htmlFor={c}>{c}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Filter;
