
import productsReducer , { fetchAllProducts,createNewProduct,deleteProduct, emptyProducts,fetchProductByCategory,fetchProductByJointFilter,fetchProductsByTitle,fetchSingleProduct,filterProduct,sortProductsByCategory,sortProductsByPrice,updateProduct } from "../../redux/reducers/productReducers"

import store from "../../redux/store"
import { Filter } from "../../types/Products"
import {  newProduct,  product1, product2, product3, product4,  updateProduct as productUpdate } from "../data/products"
import productServer from "../servers/productServer"


const filter: Filter = {
    categoryId: '1',
    price_max: '100',
    price_min: '500', 
    title: ""
}
beforeAll(() => {
    productServer.listen({ onUnhandledRequest: "bypass" });
})

afterAll(() => {
    productServer.close()
})

beforeEach(() => {
    store.dispatch(emptyProducts)
})

describe("Testing productsReducer", () => {
    test("Check initialState", () => {
        const state = productsReducer(undefined, { type: "unknown" })
        expect(state).toEqual({
  product: { id: 0, category: { id: 0, name: "", image: "",  }, description: "", images: [], price: 0, title: "",  },
  products:[]
}
)
    })
    test("Check should fetch all products", async () => {
        await store.dispatch(fetchAllProducts())
    expect(store.getState().productsReducer.products.length).toBe(4)
        expect(store.getState().productsReducer.products).toEqual([product1, product2, product3, product4])
     
    }) 
    test("Check should add new product", async () => {
   await store.dispatch(createNewProduct(newProduct as any))
        expect(store.getState().productsReducer.products.length).toBe(5)
      
         
        expect(store.getState().productsReducer.products[4].title).toBe("New Product 1")
    })        


    test('it should fetch products by category', async () => { 
        
        await store.dispatch(fetchProductByCategory('1')) 
     
     expect(store.getState().productsReducer.products.length).toBe(2)
         
    })

    test("Check should update existing product", async () => {
        await store.dispatch(updateProduct(productUpdate))
        const state = store.getState().productsReducer.products
    
        expect(state[0].title).toBe("Product updated");
    })

      test("should get product by title", async () => {
        await store.dispatch(fetchProductsByTitle("Product 3"));
          const state = store.getState().productsReducer.products;
          
               expect(store.getState().productsReducer.products.length).toBe(1);

      });
    test("should sort product by price", async () => {
          await store.dispatch(fetchAllProducts());
        await store.dispatch(sortProductsByPrice());
          const state = store.getState().productsReducer;
         expect(state.products[3].price).toBe(900)
         expect(state.products[0].price).toBe(149)
      });
    test("should sort product by category", async () => {
          await store.dispatch(fetchAllProducts());
        await store.dispatch(sortProductsByCategory());
          const state = store.getState().productsReducer;
          
      expect(state.products[0].category.name).toBe('Category 1')
        
      });

    
        test("it should fetch products by category and price range", async () => {
          await store.dispatch(fetchAllProducts());
          await store.dispatch(fetchProductByJointFilter(filter));
          expect(store.getState().productsReducer.products.length).toBe(2);
        }); 
    
    
        test("it should delete product", async () => {
          await store.dispatch(fetchAllProducts());

          
          await store.dispatch(deleteProduct(product1.id.toString()));
                    console.log(
                      await store.getState().productsReducer.products.length
                    );
          // expect(store.getState().productsReducer.products.length).toBe(3);
        }); 

}) 