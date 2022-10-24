import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import './CSS/HomePage.css';
import Hamburger from 'hamburger-react'
import AOS from "aos";
import "aos/dist/aos.css";
import { FiAlertCircle } from "react-icons/fi";
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const HomePage = ({ resetData, products, checked, handleCheck }) => {
    const navigate = useNavigate();
    const [query, setquery] = useState("");
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);
    useEffect(() => {
        resetData();
    }, [])
    const navigateMe = () => {
        navigate("ProductLink");
    }
    const [shuffledArray, setShuffledArray] = useState(products);
    useEffect(() => {
        let mixedArr = [...products];
        setShuffledArray(mixedArr.sort((a, b) => 0.5 - Math.random()))
    }, [])

    return (<>
        <div className='bodyDiv'>
            <div onClick={navigateMe}>
                <Hamburger />
            </div>

            <div className='searchDiv'>

                <FiSearch className='searchIcon' onClick={() => document.getElementById("focusInput").focus()} />
                <input type={"text"} id="focusInput" placeholder="חיפוש..." className="search" onChange={(e) => setquery(e.target.value)} />
            </div>

            <div className='allCards'>
                {shuffledArray.filter((prod) => prod.name.toLocaleLowerCase().includes(query))
                    .map((prod, key) => {
                        return prod.isMainProduct ? (<div key={key} data-aos="fade-up" className="card" data-album-card>
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
                            {prod.HasRelatedProducts.length ? <div> <OverlayTrigger className="infoICON"
                                key='bottom'
                                placement='bottom'
                                overlay={
                                    <Tooltip id={'tooltip-bottom'}>
                                        {products.map(x => {
                                            for (let i of prod.HasRelatedProducts) {
                                                if (x.id === i) {
                                                    return (<div className='infoDetails'><li> ID: {x.id}  שם המוצר:{x.name}</li></div>)
                                                }
                                            }
                                        })}
                                    </Tooltip>
                                }
                            >
                                <Button className='btnInfo'><FiAlertCircle variant="secondary" /></Button>
                            </OverlayTrigger></div> : null}
                        </div>) : null
                    })}
            </div>
        </div>  </>
    );
}
export default HomePage;