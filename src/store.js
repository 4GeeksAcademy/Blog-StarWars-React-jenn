export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    favorites: []
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task':

      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => todo.id === id ? { ...todo, background: color } : todo)
      };

    case 'toggle_favorite':
      const exists = store.favorites.some(fav =>
        fav.uid === action.payload.uid && fav.type === action.payload.type
      );

      return {
        ...store,
        favorites: exists
          ? store.favorites.filter(fav =>
            !(fav.uid === action.payload.uid && fav.type === action.payload.type)
          )
          : [...store.favorites, action.payload]
      };
    default:
      throw Error('Unknown action.');
  }
}
