import React, { useState, useEffect } from 'react';
import './CSS/HomePage.css';
import { useNavigate } from 'react-router-dom';
import { products } from '../Products';

const HomePage = () => {
    const navigate = useNavigate();
    const navigateMe = () => {
        navigate("ProductLink", { state: checked });
    }
    const [checked, setchecked] = useState([]);
    const [product, setproduct] = useState([]);

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
        var prodById = products.find(prod => prod.id === event.target.id);
        var updateList = [...checked];
        if (event.target.checked) {
            updateList = [...checked, prodById]
        }
        else {
            updateList.splice(checked.indexOf(prodById), 1);
        }
        setchecked(updateList);
        // return checked;

    }


    console.log(checked);
    return (<><button type={'button'} onClick={navigateMe}>ייצוא מוצרים</button>
        <div>{product.map((prod, key) => {
            return (<div className="card" data-album-card>
                {/* {prod.basicDataItems} */}
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
            </div>)
        })}
        </div>
    </>
    );
}


export default HomePage;
