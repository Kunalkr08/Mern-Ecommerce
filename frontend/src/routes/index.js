import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import { Login } from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import { AllUsers } from '../pages/AllUsers'
import { AllProducts } from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
const router= createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children : [
          {
            path : "",
            element : <Home/>
          },
          {
            path: "login",
            element : <Login/>
          },
          {
            path: "forgot-password",
            element: <ForgotPassword/>
          },
          {
            path : "sign-up",
            element: <SignUp/>
          },
          {
               path : "product-category",
               element : <CategoryProduct/>
          },
          {
               path : "product/:id",
               element : <ProductDetail/>
          },
          {
              path : "cart",
              element : <Cart/>
          },
          {
              path : "search",
              element : <SearchProduct/>
          },
          {
            path : "admin-panel",
            element : <AdminPanel/>,
            children : [
               {
                  path : "all-user",
                  element : <AllUsers/>
               },
               {
                   path : "all-product",
                   element : <AllProducts/>
               } 
            ]
          }
        ]
    }
])

export default router