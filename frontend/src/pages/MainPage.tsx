import { useState } from 'react';
import BookList from '../components/BookList';
import Filter from '../components/Filter';
import MainWelcome from '../components/MainWelcome';
import '../components/Filter.css';
import CartSummary from '../components/CartSummary';

function MainPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <CartSummary />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <MainWelcome />
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            <Filter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="col-8">
            <BookList selectedCategories={selectedCategories} />
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
