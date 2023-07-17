import store from "../shared/store"
import { addToCart,decrementQuantity, incrementQuantity,emptyCart,removeFromCart } from "../../redux/reducers/cartReducers"
import { product1,product2,product3,product4 } from "../data/products"

beforeEach(() => {
    store.dispatch(emptyCart())
})

describe("Testing cartReducer", () => {
    test("Should add product to shopping cart", () => {
        store.dispatch(addToCart(product1))
        store.dispatch(addToCart(product2)) 
        expect(store.getState().cartReducers.find((item)=>item.id === product1.id)?.title).toBe(product1.title)
        expect(store.getState().cartReducers.find((item)=>item.id ===product2.id)?.title).toBe(product2.title)
    }) 
    test("Should remove product by its id", () => {
        store.dispatch(removeFromCart(product1.id)) 
        expect(store.getState().cartReducers).not.toContain(product1)
    })
    test("increment product quantity", () => {
        store.dispatch(addToCart(product3))
        store.dispatch(incrementQuantity(product3))
        const state = store.getState().cartReducers
        const updateProduct = state.find((item) => item.id === product3.id)
        expect(updateProduct?.quantity).toEqual(2)
    })
     test("decrement product quantity", () => {
       store.dispatch(addToCart(product3));
       store.dispatch(decrementQuantity(product3));
       const state = store.getState().cartReducers;
       const updateProduct = state.find((item) => item.id === product3.id);
       expect(updateProduct?.quantity).toEqual(2); 
     });
})