
const initialState = {
  books: [],
  loading: true,
  error: null,
  cartItems: [],
  orderTotal: 220
}

const updateCartItems = (cartItems, item, idx) => {
  if (idx === -1) {
    return [
      ...cartItems,
      item
    ]
  }

  return [
    ...cartItems.slice(0, idx),
    item,
    ...cartItems.slice(idx + 1)
  ]
}

const updadeCartItem = (book, item = {}) => {

  const { 
    id = book.id,
    count = 0,
    title = book.title,
    total = 0 } = item;

    return {
      id,
      title,
      count: count + 1,
      total: total + book.price
    }
}

const updadeMinusCartItem = (book, item = {}) => {
  const { 
    id = book.id,
    count = 0,
    title = book.title,
    total = 0 } = item;

    return {
      id,
      title,
      count: count - 1,
      total: total - book.price
    }
}

const reducer = (state = initialState, action) => {

  console.log(action)

  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST' :
      return {
        ...state,
        books: [],
        loading: true,
        error: null
      };
    case 'FETCH_BOOKS_SUCCESS' :
      return{
        ...state,
        books: action.payload,
        loading: false,
        error: null
      };
    case 'FETCH_BOOKS_FAILURE' :
      return {
        ...state,
        books: [],
        loading: false,
        error: action.payload
      };
    case 'BOOK_ADDED_TO_CART':
      const bookId = action.payload;
      const book = state.books.find((book) => book.id === bookId);

      const itemIndex = state.cartItems.findIndex(({id}) => id === bookId)
      const item = state.cartItems[itemIndex]

      const newItem = updadeCartItem(book, item);


        return {
          ...state,
          cartItems: updateCartItems(state.cartItems, newItem, itemIndex)
        };
    case 'BOOK_MINUS_IN_CART' :
      const bookId1 = action.payload;
      const book1 = state.books.find((book) => book.id === bookId1);

      const itemIndex1 = state.cartItems.findIndex(({id}) => id === bookId1)
      const item1 = state.cartItems[itemIndex1]

      const newItem1 = updadeMinusCartItem(book1, item1);

      return {
        ...state,
        cartItems: updateCartItems(state.cartItems, newItem1, itemIndex1)
      };
    default :
      return state
  }
}

export default reducer;