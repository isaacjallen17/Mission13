import { fetchBooks } from '../api/BooksAPI';
import { useCart } from '../context/CartContext';
import { Book } from '../types/Books';
import { CartItem } from '../types/CartItem';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [numBooksPage, setNumBooksPage] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(0);
  const [totNumBooks, setTotNumBooks] = useState<number>(0);
  const [totPages, setTotPages] = useState<number>(0);
  const [order, setOrder] = useState<string>('title');
  const { addToCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          numBooksPage,
          pageNum,
          order,
          selectedCategories
        );

        setBooks(data.listOfBooks);
        setTotNumBooks(data.totNumBooks);
        setTotPages(Math.ceil(totNumBooks / numBooksPage));
        setOrder(order);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
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

  if (loading) return <p>Loading Books...</p>;

  if (error) return <p className="text-red-500">Error: {error}</p>;

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
      <Pagination
        currentPage={pageNum}
        totalPages={totPages}
        pageSize={numBooksPage}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setNumBooksPage(newSize);
          setPageNum(0);
        }}
      />
    </>
  );
}

export default BookList;
