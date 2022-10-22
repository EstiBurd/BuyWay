import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiList, FiSearch } from "react-icons/fi";
import './CSS/HomePage.css';

const HomePage = ({ products, checked, handleCheck }) => {
    const navigate = useNavigate();
    const navigateMe = () => {
        navigate("ProductLink");
    }
    const [shuffledArray, setShuffledArray] = useState(products);
    useEffect(() => {
        let mixedArr = [...products];
        setShuffledArray(mixedArr.sort((a, b) => 0.5 - Math.random()))
    }, [])
    // console.log(products,"prods form HOME")
    const [query, setquery] = useState("");
    return (<>
        <div className='bodyDiv'>
            <FiList onClick={navigateMe} />
            {/* <button type={'button'} onClick={navigateMe}>ייצוא מוצרים</button> */}

            <div className='searchDiv'>
                <FiSearch className='searchIcon' onClick={() => document.getElementById("focusInput").focus()} />
                <input type={"text"} id="focusInput" placeholder="חיפוש..." className="search" onChange={(e) => setquery(e.target.value)} />
            </div>

            <div>
                {shuffledArray.filter((prod) => prod.name.toLocaleLowerCase().includes(query))
                    .map((prod, key) => {
                        // {console.log(prod,"in map home")}
                        return prod.isMainProduct ? (<div key={key} className="card" data-album-card>
                            <input type={'checkbox'} className="checkbox" defaultChecked={false} onChange={handleCheck} key={key} id={prod.id} value={prod} />
                            <div className="image">
                                <img src={("../../Images/" + prod.advancedDataItems.images[0])} alt="img" />
                                <img src={("../../Images/" + prod.logo)} alt="img" id='logo' />
                            </div>
                            <div className='prodName'>
                                {prod.name}
                            </div>
                            <div className="caption" >
                                {prod.companyName}
                            </div>
                        </div>) : null
                    })}
            </div>
        </div>  </>
    );
}
export default HomePage;