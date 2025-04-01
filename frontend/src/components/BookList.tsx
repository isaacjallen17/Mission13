import { useCart } from '../context/CartContext';
import { Book } from '../types/Books';
import { CartItem } from '../types/CartItem';
import { useEffect, useState } from 'react';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [numBooksPage, setNumBooksPage] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(0);
  const [totNumBooks, setTotNumBooks] = useState<number>(0);
  const [totPages, setTotPages] = useState<number>(0);
  const [order, setOrder] = useState<string>('title');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((c) => `categories=${encodeURIComponent(c)}`)
        .join('&');
      const response = await fetch(
        `https://localhost:7088/Bookstore/check?numBooks=${numBooksPage}&pageNum=${pageNum}&order=${order}${selectedCategories.length ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();
      setBooks(data.listOfBooks);
      setTotNumBooks(data.totNumBooks);
      setTotPages(Math.ceil(totNumBooks / numBooksPage));
      setOrder(order);
    };
    fetchBooks();
  }, [numBooksPage, pageNum, totNumBooks, order, selectedCategories]);

  const handleAddToCart = (
    bookID: number,
    title: string,
    author: string,
    category: string,
    price: number
  ) => {
    const newItem: CartItem = {
      bookID: bookID,
      title: title,
      author: author,
      category: category,
      price: price,
      total: price,
      quantity: 1,
    };
    addToCart(newItem);
  };

  return (
    <>
      <label>
        Sort Books:
        <select
          value={order}
          onChange={(o) => {
            setOrder(o.target.value);
            setPageNum(0);
          }}
        >
          <option value="title">Title (alphabetical)</option>
          <option value="pagesHighLow">Number of Pages (high to low)</option>
          <option value="pagesLowHigh">Number Of Pages (low to high)</option>
          <option value="price">Price (low to high)</option>
        </select>
      </label>
      <br />
      <br />
      {books.map((b) => (
        <div
          id="bookCard"
          className="card shadow-sm p-3 mb-5 rounded bg-secondary p-5 text-light"
          key={b.bookID}
        >
          <h3 className="card-title">
            <strong>{b.title}</strong>
            <br />
            By {b.author}
          </h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Published By:</strong> {b.publisher}
              </li>
              <li>
                <strong>ISBN:</strong> {b.isbn}
              </li>
              <li>
                <strong>Category:</strong> {b.category}
              </li>
              <li>
                <strong>Classification:</strong> {b.classification}
              </li>
              <li>
                <strong>Number of Pages:</strong> {b.pageCount}
              </li>
              <li>
                <strong>Price:</strong> ${b.price}
              </li>
            </ul>
            <button
              className="btn btn-success"
              onClick={() =>
                handleAddToCart(
                  b.bookID,
                  b.title,
                  b.author,
                  b.category,
                  b.price
                )
              }
            >
              Add To Cart
            </button>
          </div>
        </div>
      ))}
      <br />
      <button disabled={pageNum === 0} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>
      {[...Array(totPages)].map((_, i) => (
        <button key={i} onClick={() => setPageNum(i)} disabled={pageNum === i}>
          {i + 1}
        </button>
      ))}
      <button
        disabled={pageNum === totPages - 1}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>
      <br />
      <label>
        Number Of Books Per Page:
        <select
          value={numBooksPage}
          onChange={(x) => {
            setNumBooksPage(Number(x.target.value));
            setPageNum(0);
          }}
        >
          <option value="3">3</option>
          <option value="5">5</option>
        </select>
      </label>
      <br />
    </>
  );
}

export default BookList;
