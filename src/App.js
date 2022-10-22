import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter, RouterProvider, Route, Routes, createRoutesFromElements } from "react-router-dom";
import ProductLink from './components/ProductLink';
// import { connect } from 'react-redux'
import EditProd from './components/EditProd';
import { useState, useEffect } from 'react';
import { products } from './Products';
// import PopUp from './components/PopUp';
// import { products } from '../src/Products';


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//         {/* <Route path='PopUp' element={<PopUp />} /> */}
//     </>
//   )
// );
function App() {
  const [listCheked, setListChecd] = useState([]);
  const [currentProd, setcurrentProd] = useState([]);
  const [product, setproduct] = useState(products);
  const [isSelect, setisSelect] = useState(false);
  const [selectData, setselectData] = useState([]);


  const updateList = (product, index) => {
    const list = [...listCheked];
    listCheked[index] = product;
    setListChecd(list);
  }

  const handleCheck = (event) => {
    const prodById = product.find(prod => prod.id === event.target.id);
    let updateList = [...listCheked];
    if (event.target.checked) {
      updateList = [...listCheked, prodById]
    }
    else {
      updateList.splice(listCheked.indexOf(prodById), 1);
    }
    setListChecd(updateList);
  }
  const selectFather = (event) => {
    setisSelect(true);
    if (currentProd.length === 0) {
      setcurrentProd([listCheked.find(prod => prod.id === event.currentTarget.id)]);
    }
    else {
      setcurrentProd(oldArray => [...oldArray, listCheked.find(prod => prod.id === event.currentTarget.id)]);
    }
    setListChecd(listCheked.filter(prod => prod.id !== event.currentTarget.id));
  }
  const removeFather = (event) => {
    let toRemove = currentProd.find(prod => prod.id === event.currentTarget.id);
    setListChecd(oldArray => [...oldArray, toRemove]);
    setcurrentProd(currentProd.filter(prod => prod.id !== toRemove.id));
  }
  const addMainBasicData = (event) => {
    console.log(event,"event from data")
    var updateList = [...selectData];
    var prodID = currentProd.find(prod => prod.id === event.target.id);
    {
        Object.entries(prodID.basicDataItems).map(() => (
            event.target.checked ?
                updateList = [...selectData, event.target.value] :
                updateList.splice(selectData.indexOf(event.target.value), 1)
        ))
    }
    setselectData(updateList);
}
// console.log(event,"event from outside data")
 
  return (
    <BrowserRouter  >
      <Routes>     
        <Route path="ProductLink" element={<ProductLink
          currentProd={currentProd}
          // setcurrentProd={setcurrentProd}
          products={listCheked}
          setProducts={setListChecd}
          // allProducts={product}
          selectFather={selectFather}
          removeFather={removeFather}
          isSelect={isSelect}
          addMainBasicData={addMainBasicData}
          selectData={selectData}
        />} />
        <Route path='ProductLink/EditProd' element={<EditProd checked={listCheked} products={product} />} />
        <Route path="/" element={<HomePage handleCheck={handleCheck} checked={listCheked} products={product} />} />
      </Routes>
    </BrowserRouter>
  )
}

// const mapStateToProps = state => {
//   return {
//     prod: state.products
//   }
// }
// const mapDispatchToProps = dispatch => {
//   return {
//     change(name) {
//       dispatch({
//         type: "CHANGE",
//         payload: name
//       })
//     }

//   }
// }
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
