import './App.css';
import HomePage from './components/HomePage';
import {createBrowserRouter,RouterProvider,Route,createRoutesFromElements} from "react-router-dom";
import ProductLink from './components/ProductLink';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<HomePage />}/>
    <Route path="ProductLink" element={<ProductLink />} />
    </>
  )
);
function App(){
  return (
    <RouterProvider router={router}/>
    
  )
}
export default App;


// import './App.css';
// import HomePage from './components/HomePage';
// import ProductLink from './components/ProductLink'
// import { Route, Routes } from 'react-router-dom'

// function App() {
//   // const navigate = useNavigate();
//   return (
//     <div>
//       <HomePage />
//       {/* <Routes>
//        <Route exact path="/" element={<HomePage/>}/>
//         <Route exact path="/ProductLink" element={<ProductLink />} />
//       </Routes>  */}
//     </div>
//   );
// }

// export default App;
