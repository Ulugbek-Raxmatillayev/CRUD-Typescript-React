import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Home from "./components/home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/(auth)/login";
import Register from "./pages/(auth)/register";
import Admin from "./pages/(admin)/main";
import AdminUsers from "./pages/(admin)/users";
import AdminProducts from "./pages/(admin)/products";
import AdminCategory from "./pages/(admin)/categorys";
import Seller from "./pages/(seller)/main";
import SellerProduct from "./pages/(seller)/products";

const queryClient = new QueryClient();

function App(): JSX.Element{
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* home router */}
        <Route path="/" element={<Home />}/>
        {/* home router */}

        {/* admin router */}
        <Route path="/admin" element={<Admin />}/>
        <Route path="/admin/users-control" element={<AdminUsers />}/>
        <Route path="/admin/products-control" element={<AdminProducts />}/>
        <Route path="/admin/categories-control" element={<AdminCategory/>}/>
        {/* admin router */}


        {/* seller router */}
        <Route path="/seller" element={<Seller />}/>
        <Route path="/seller/products-control" element={<SellerProduct />}/>
        {/* seller router */}

        {/* auth routers*/}
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register />}/>
        {/* auth routers*/}

        

      </Routes>
    </QueryClientProvider>
  )
}

export default App