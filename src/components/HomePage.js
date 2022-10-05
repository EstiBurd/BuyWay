import React from 'react';
import { products } from '../Products';
const Home = () => {
    return (<>
        {products.map(prod =>{
                         console.log(prod);
            return<div>
        {prod.name}
                {/* {prod.basicDataItems} */}
                <img src={require("../Images/"+prod.advancedDataItems.images[0])} width={150} height={150}/>
            </div>
        })}
    </>);
}

export default Home;