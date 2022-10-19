import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../Products';
import { FiList,FiSearch } from "react-icons/fi";
import './CSS/HomePage.css';

const HomePage = (props) => {

    const navigate = useNavigate();
    const navigateMe = () => {
        navigate("ProductLink", { state: checked });
    }
    const [checked, setchecked] = useState([]);
    const [product, setproduct] = useState([]);
    const [query, setquery] = useState("")
    function shuffle(arr) {
        const shuffledArray = arr.sort((a, b) => 0.5 - Math.random());
        setproduct(shuffledArray);
    }
    useEffect(() => {
        return () => {
            shuffle(products);
        };
    }, [])
    const handleCheck = (event) => {
        var prodById = product.find(prod => prod.id === event.target.id);
        var updateList = [...checked];
        if (event.target.checked) {
            updateList = [...checked, prodById]
        }
        else {
            updateList.splice(checked.indexOf(prodById), 1);
        }
        setchecked(updateList);
    }
    return (<>
        <FiList onClick={navigateMe} />
        {/* <button type={'button'} onClick={navigateMe}>ייצוא מוצרים</button> */}
        <div>
            <input type={"text"} placeholder="חיפוש..." className="search" onChange={(e) => setquery(e.target.value)} /> <FiSearch/>
        </div>
        <div>{products.filter(prod => prod.name.toLocaleLowerCase().includes(query)).map((prod, key) => {
            return prod.isMainProduct ? (<div className="card" data-album-card>

                <input type={'checkbox'} defaultChecked={false} onChange={handleCheck} key={key} id={prod.id} value={prod} />
                <div className="image">
                    <img src={("../../Images/" + prod.advancedDataItems.images[0])} alt="img" />
                    <img src={("../../Images/" + prod.logo)} alt="img" />
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
    </>
    );
}
// const mapStateToProps = (state) => {
//     return {
//         arr: state.prod.productsArr
//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         prod: () => dispatch(getAllProds(products))
//     }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
export default HomePage;