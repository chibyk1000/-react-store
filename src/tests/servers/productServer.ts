import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { product1, product2, product3, product4, products, updateProduct } from '../data/products'
// import { NewProduct } from '../../types/Product'
import { Product, NewProduct, Filter } from '../../types/Products'
const filter: Filter = {
  categoryId: "1",
  price_max: "500",
  price_min: "100",
  title: "",
};
import categories from '../data/categories'
const updateId = 770
const productServer = setupServer(
    // Describe the requests to mock.
    rest.get("https://api.escuelajs.co/api/v1/products", (req, res, ctx) => {

        const categoriesSearch = req.url.searchParams.get("categoryId");
        const titleSearch = req.url.searchParams.get("title");
        const price_min = req.url.searchParams.get('price_min')
        const price_max = req.url.searchParams.get('price_max')



        let response

      if (price_min && price_max) {
              response = products.filter(
                (product) => product.price >= Number(filter.price_min) && product.price <= Number(filter.price_max)
              );
        
        }else if (Number(categoriesSearch) > 0) {
           
        response =  products.filter(product=> product.category.id ===  1)
        } else if (titleSearch) { 
               response = products.filter(
                 (product) => product.title === "Product 3"
               ); 
        }
        
        else {
            response = products
}    
        return res(
            ctx.json(response),
        )
    }),
    rest.post("https://api.escuelajs.co/api/v1/products/", async (req, res, ctx) => {
        const newProduct = await req.json() as NewProduct
       
        const category = categories.find(c => c.id === newProduct.categoryId)
        const error: string[] = []
        let product: Product|null = null
        if (!(newProduct.price > 0)) {
            error.push("price must be a positive number")
        }
        if (!Array.isArray(newProduct.images)) {
            error.push("images must be an array")
        } else if (newProduct.images.length < 1) {
            error.push("images must contain at least 1 image")
        } else if (newProduct.images.some((item:any) => typeof item !== "string")) {
            error.push("images must be an array of string")
        }
        if (!category) {
            error.push("category does not exist")
        } else {
            product = {
                title: newProduct.title,
                price: newProduct.price,
                category: category,
                description: newProduct.description,
                images: newProduct.images,
                id: 1
            }

            products.push(product);
        }
        if (error.length > 0) {
            return res(
                ctx.status(400),
                ctx.json({
                    statusCode: 400,
                    message: error,
                    error: "Bad Request"
                })
            )
        }
        return res(
            ctx.status(201),
            ctx.json(products) 
        )
    }),


    rest.put(`https://api.escuelajs.co/api/v1/products/${updateId}`, async (req, res, ctx) => {
    
        const response = await req.json();
        
    
        const foundProduct = products.find(p => p.id === updateId)
        if (foundProduct) {
      
            foundProduct.price = updateProduct.price
            foundProduct.description = updateProduct.description
            foundProduct.title = updateProduct.title
            foundProduct.category = updateProduct.category
  }
        
        return res(ctx.status(200), ctx.json(foundProduct))
    }),
    
    rest.delete(`https://api.escuelajs.co/api/v1/products/${product1.id}`, async (req, res, ctx) => {
        const response = await req.json();


        console.log('server ');
         
        const index = products.findIndex(p=> p.id === 770)
        products.splice(index, 1);

        return res(ctx.status(200), ctx.json({message:"product deleted"}))
    })
)

export default productServer