import { Book } from '../types/Books';

interface FetchBooksResponse {
  listOfBooks: Book[];
  totNumBooks: number;
}

const apiUrl = 'https://localhost:7088/Bookstore/';

export const fetchBooks = async (
  numBooksPage: number,
  pageNum: number,
  order: string,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((c) => `categories=${encodeURIComponent(c)}`)
      .join('&');
    const response = await fetch(
      `${apiUrl}check?numBooks=${numBooksPage}&pageNum=${pageNum}&order=${order}${selectedCategories.length ? `&${categoryParams}` : ''}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects', error);
    throw error;
  }
};

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${apiUrl}AddBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error('Failed to add book!');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding project', error);
    throw error;
  }
};

export const editBook = async (
  bookID: number,
  editedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${apiUrl}Edit/${bookID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedBook),
    });

    if (!response.ok) {
      throw new Error('Failed to edit book!');
    }
    return await response.json();
  } catch (error) {
    console.error('Error editing book', error);
    throw error;
  }
};

export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}Delete/${bookID}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete book!');
    }
  } catch (error) {
    console.error('Error deleting book', error);
    throw error;
  }
};
