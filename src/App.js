import '../src/components/CSS/App.css';
import HomePage from './components/HomePage';
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import ProductLink from './components/ProductLink';
import EditProd from './components/EditProd';
import React, { useState, } from 'react';
import { products } from './Products';

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
  const selectFather = (id) => {
    setisSelect(true);
    if (currentProd.length === 0) {
      setcurrentProd([listCheked.find(prod => prod.id === id)]);
    }
    else {
      setcurrentProd(oldArray => [...oldArray, listCheked.find(prod => prod.id === id)]);
    }
    setListChecd(listCheked.filter(prod => prod.id !== id));
  }
  const removeFather = (event) => {
    let toRemove = currentProd.find(prod => prod.id === event.currentTarget.id);
    setListChecd(oldArray => [...oldArray, toRemove]);
    setcurrentProd(currentProd.filter(prod => prod.id !== toRemove.id));
    setselectData([]);
  }
  const addMainBasicData = (event) => {
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
  const resetData=()=>{
    setcurrentProd([]);
        setisSelect(false);
        setListChecd([]);
        setselectData([]);
}
return (<>

  <BrowserRouter>
    <Routes>
      <Route path="ProductLink" element={<ProductLink
        currentProd={currentProd}
        products={listCheked}
        setProducts={setListChecd}
        selectFather={selectFather}
        removeFather={removeFather}
        isSelect={isSelect}
        addMainBasicData={addMainBasicData}
        selectData={selectData}
      />} />
      <Route path='ProductLink/EditProd' element={<EditProd checked={listCheked} products={product} />} />
      <Route path="/" element={<HomePage handleCheck={handleCheck} resetData={resetData} checked={listCheked} products={product} />} />
    </Routes>
  </BrowserRouter>
</>
)
}
export default App;