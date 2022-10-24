import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2 } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import './CSS/ProductLink.css';
import Swal from 'sweetalert2';
const ProductLink = ({ products, addMainBasicData, selectData, currentProd, isSelect, selectFather, removeFather }) => {

    const navigate = useNavigate();
    const EditProd = (prod) => {
        navigate("EditProd", { state: { newProd: prod, selectData: selectData } })
    }
    const linkProducts = () => {
        let arrCheck = [];
        products.map((x) => {
            let isCurrect = true;
            for (let i of selectData) {
                isCurrect = x.basicDataItems[i] && isCurrect ? true : false;
            }
            arrCheck = [...arrCheck, isCurrect];
        });
        if (arrCheck.includes(false)) {
            Swal.fire({
                icon: 'error',
                title: 'אופס...',
                text: 'המוצרים אינם תקינים, אנא הוסף את הרכיבים החסרים',
            })
        }
        else {
            products.map(x => {
                x.isMainProduct = false;
                currentProd.map((y) => {
                    y.HasRelatedProducts = [...y.HasRelatedProducts, x.id];
                })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'המוצרים קושרו בהצלחה',
                    showConfirmButton: false,
                    timer: 2000
                })
                setTimeout(() => {
                    navigate("/", { state: { products: products } });
                }, 300);
            })
        }
    }
    const newArr = products.map((x) => {
        let isCurrect = true;
        for (let i of selectData) {
            isCurrect = x.basicDataItems[i] && isCurrect ? true : false;
        }
        return { ...x, isCurrect };
    });
    if (newArr.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'אופס...',
            text: 'לא נשארו מוצרים לקשר :(',
        })
    }
    newArr.sort((a, b) => a.isCurrect - b.isCurrect);
    return (<><div className='currentCard'>
        {currentProd.map((prod, index) => {
            return (
                <div className="cardsArr" key={index} >

                    {isSelect ? <div key={index}>
                        <GrClose onClick={removeFather} id={prod.id} />
                        <div className="imageArr">
                            <img src={("../../Images/" + prod.advancedDataItems.images[0])} alt="img" />
                            <img src={("../../Images/" + prod.logo)} alt="img" id='logoArr' />
                        </div>
                        <div className='prodNameArr'>
                            {prod.name}
                        </div>
                        <div className="captionArr" >
                            {prod.companyName}
                        </div>
                        {Object.entries(prod.basicDataItems).map(([key, value]) => (
                            <div key={key}>
                                <p>
                                    <input type={"checkbox"} defaultChecked={false} id={prod.id} value={key} onChange={addMainBasicData} />

                                    {key} - {value}
                                </p>
                            </div>
                        ))}
                    </div> : null}</div>)

        })}</div>
        <div className='cnt'>{newArr.length}</div>
        <div className="wrapper">

            {newArr.map((prod, index) => {
                return (<>

                    {isSelect ? <div className='editBtn'><FiEdit2 onClick={() => EditProd(prod)} id={prod.id} /> </div> : null}
                    <div key={index} id={prod.id} onClick={() => selectFather(prod.id)} >


                        <img src={("../../Images/" + prod.advancedDataItems.images[0])} className='prodImg' />
                    </div>
                    <div className={prod.isCurrect ? "notFeild" : "filed"}>
                        {Object.entries(prod.basicDataItems).map(([key, value]) => (

                            <div key={key} >
                                <p>
                                    {key} - {value}
                                </p>
                            </div>
                        ))}</div>
                </>)
            })}</div>
        <button type={"button"} className="custom-btn btn-5" onClick={linkProducts} disabled={!currentProd.length > 0 || !selectData.length > 0} ><span>קשר מוצרים</span></button>
    </>);
}
export default ProductLink;