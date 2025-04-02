import { useEffect, useState } from 'react';
import './Filter.css';
import { useNavigate } from 'react-router-dom';

function Filter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        'https://mission13backendija531.azurewebsites.net/Bookstore/catgories'
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
      <button className="btn btn-primary" onClick={() => navigate('/admin')}>
        Admin Access
      </button>
      <p>
        * Please do not go here unless you're an admin. It isn't password
        protected.
      </p>
      <br />
      <br />
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
