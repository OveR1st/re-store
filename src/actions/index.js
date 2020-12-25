const booksRequested = () => {
  return {
    type: 'FETCH_BOOKS_REQUEST'
  }
}

const booksLoaded = (newBooks) => {
  return {
    type: 'FETCH_BOOKS_SUCCESS',
    payload: newBooks
  };
};


const booksError = (error) => {
  return {
    type: 'FETCH_BOOKS_FAILURE',
    payload: error
  }
}

export const bookAddedToCart = (bookId) => {
  return {
    type: 'BOOK_ADDED_TO_CART',
    payload: bookId,
  }
}


const fetchBooks = (bookstoreService, dispatch) => () => {
  dispatch(booksRequested());
  bookstoreService.getBooks()
    .then((data) => dispatch(booksLoaded(data)))
    .catch((err) => dispatch(booksError(err)));
}

export const bookMinusInCart = (id) => {
  return {
    type: 'BOOK_MINUS_IN_CART',
    payload: id
  }
}
const bookPlusInCart = (id) => {
  return {
    type: 'BOOK_PLUS_IN_CART',
    payload: id
  }
}
const bookDeleteInCart = (id) => {
  return {
    type: 'BOOK_DELETE_IN_CART',
    payload: id
  }
}

export {
 fetchBooks
};