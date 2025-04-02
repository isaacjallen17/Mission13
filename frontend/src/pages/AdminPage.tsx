import { useEffect, useState } from 'react';
import { Book } from '../types/Books';
import { deleteBook, fetchBooks } from '../api/BooksAPI';
import Pagination from '../components/Pagination';
import NewBookForm from '../components/NewBookForm';
import EditBookForm from '../components/EditBookForm';

function AdminPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [numBooksPage, setNumBooksPage] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(0);
  const [totNumBooks, setTotNumBooks] = useState<number>(0);
  const [totPages, setTotPages] = useState<number>(0);
  const [order, setOrder] = useState<string>('title');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingForm, setEditingForm] = useState<Book | null>(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(numBooksPage, pageNum, order, []);

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
  }, [numBooksPage, pageNum, totNumBooks, order]);

  const handleDelete = async (bookID: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this book?'
    );
    if (!confirmDelete) return;
    try {
      await deleteBook(bookID);
      setBooks(books.filter((b) => b.bookID !== bookID));
    } catch (error) {
      alert('Failed to delete book. Try it again, bud.');
    }
  };

  if (loading) return <p>Loading Books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <h1>Admin Page</h1>

      {!showForm && (
        <button
          className="btn btn-success md-3"
          onClick={() => setShowForm(true)}
        >
          Add Book
        </button>
      )}

      {showForm && (
        <NewBookForm
          onSuccess={() => {
            setShowForm(false);
            fetchBooks(numBooksPage, pageNum, order, []).then((data) =>
              setBooks(data.listOfBooks)
            );
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingForm && (
        <EditBookForm
          book={editingForm}
          onSuccess={() => {
            setEditingForm(null);
            fetchBooks(numBooksPage, pageNum, order, []).then((data) =>
              setBooks(data.listOfBooks)
            );
          }}
          onCancel={() => setEditingForm(null)}
        />
      )}

      <div>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
              <th>Classification</th>
              <th>Category</th>
              <th>Page Count</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.bookID}>
                <td>{b.bookID}</td>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.publisher}</td>
                <td>{b.isbn}</td>
                <td>{b.classification}</td>
                <td>{b.category}</td>
                <td>{b.pageCount}</td>
                <td>${b.price}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm w-100 mb-1"
                    onClick={() => setEditingForm(b)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm w-100 mb-1"
                    onClick={() => handleDelete(b.bookID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default AdminPage;
