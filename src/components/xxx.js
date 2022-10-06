import React, { useState, useEffect } from 'react';
import './CSS/HomePage.css';
import { useNavigate } from 'react-router-dom';
import BBcream from '../Images/dior.jpg'
import { products } from '../Products';
const HomePage = () => {
    
    // const navigate = useNavigate();
    // const navigateMe = () => {
    //     navigate("/ProductLink");
    // }
    
    const [checked, setchecked] = useState([]);
    const [product, setproduct] = useState([]);
    
    function shuffle(arr) {
        let currentIndex = arr.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            if (randomIndex !== currentIndex) {
                currentIndex--;
                [arr[currentIndex], arr[randomIndex]] = [
                    arr[randomIndex], arr[currentIndex]];
            }
        }
        setproduct(arr);
    }
    
    useEffect(() => {
        return () => {
	if (product.length===0) {
            	shuffle(products)
            }
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
    }
    
    console.log(checked);

    //  if (!product)
    //  {
     
     return (<>
     {/* onClick={navigateMe} */}
     <button type={'button'} >ייצוא מוצרים</button>
            
            <div>
                {product.map((prod, key) => {
                    return (<div className="card" data-album-card>
                        {/* {prod.basicDataItems} */}
                        <input type={'checkbox'} defaultChecked={false} onChange={handleCheck} id={prod.id} value={prod} key={key} />
                        <div className="image">
                            <img src={require("../Images/" + prod.advancedDataItems.images[0])} alt="img" />
                            <img src={require("../Images/" + prod.logo)} alt="img" />
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
//    else
//    {
//    	return (<div>loading...</div>);
//    }
// }

export default HomePage;