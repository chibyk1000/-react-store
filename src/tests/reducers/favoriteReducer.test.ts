import store from "../shared/store";
import {
  emptyFavorites,
  removeItem,
  saveItem,
} from "../../redux/reducers/favoriteReducers";
import { product1, product2, product3, product4 } from "../data/products";

beforeEach(() => {
  store.dispatch(emptyFavorites());
});

describe("Testing Favorite Reducers", () => {
  test("it should add product to favorites", async () => {
    store.dispatch(saveItem(product1));
    store.dispatch(saveItem(product2));
    store.dispatch(saveItem(product3));
    expect(
      store.getState().favoriteReducers.find((item) => item.id === product1.id)
        ?.title
    ).toBe(product1.title);
    expect(
      store.getState().favoriteReducers.find((item) => item.id === product2.id)
        ?.title
    ).toBe(product2.title);

    expect(store.getState().favoriteReducers.length).toBe(3);
  });

  test("it should remove item from favorites", async () => {
    store.dispatch(removeItem(product1));
    expect(store.getState().favoriteReducers.length).toBe(2);
  });
});
