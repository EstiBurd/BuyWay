import './App.css';
import HomePage from './components/HomePage';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import ProductLink from './components/ProductLink';
import { connect } from 'react-redux'
import EditProd from './components/EditProd';
import PopUp from './components/PopUp';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="ProductLink" element={<ProductLink />} />
      <Route path='EditProd' element={<EditProd />} />
      {/* <Route path='PopUp' element={<PopUp />} /> */}
    </>
  )
);
function App(props) {
  return (
    <RouterProvider router={router} />
  )
}
const mapStateToProps = state => {
  return {
    prod: state.products
  }
}
const mapDispatchToProps = dispatch => {
  return {
    change(name) {
      dispatch({
        type: "CHANGE",
        payload: name
      })
    }

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);


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
