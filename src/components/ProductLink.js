import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FiEdit2 } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import './CSS/ProductLink.css';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } =
        React.useContext(VisibilityContext);

    return (<>
    <ArrowBackIosRoundedIcon disabled={isFirstItemVisible} className="scroll" onClick={() => scrollPrev()}/>
    </>
            // <button >Left</button>
    );
}

function RightArrow() {
    const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);
    return (<>
        <ArrowForwardIosTwoToneIcon disabled={isLastItemVisible} className="scroll" onClick={() => scrollNext()} />
        {/* <button >
            Right
        </button> */}
        </>
    )

}
function ProductLink() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSelect, setisSelect] = useState(false);
    const [productsArr, setproductsArr] = useState(location.state);
    const [currentProd, setcurrentProd] = useState([]);
    const [prodToEdit, setprodToEdit] = useState({});
    const [selectData, setselectData] = useState([]);
    const selectFather = (event) => {
        setisSelect(true);
        if (currentProd.length === 0) {
            setcurrentProd([productsArr.find(prod => prod.id === event.currentTarget.id)]);
        }
        else {
            setcurrentProd(oldArray => [...oldArray, productsArr.find(prod => prod.id === event.currentTarget.id)]);
        }
        setproductsArr(productsArr.filter(prod => prod.id !== event.currentTarget.id));
    }
    const removeFather = (event) => {
        // setisSelect(!isSelect);
        let toRemove = location.state.find(prod => prod.id === event.currentTarget.id);
        setproductsArr(oldArray => [...oldArray, toRemove]);
        setcurrentProd(currentProd.filter(prod => prod.id !== toRemove.id));

    }

    const EditProd = (event) => {
        setprodToEdit(location.state.find(prod => prod.id === event.currentTarget.id));
        console.log("clicked!!!")
        navigate("EditProd", { state: prodToEdit });//?????
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
    console.log(productsArr, "productsArr")
    console.log(selectData, "this is checked!!!!!!");

    const newArr = productsArr.map((x) => {

        let isCurrect = true;
        console.log(isCurrect,"first")
        for (let i of selectData) {
            console.log(i,isCurrect,"first 1")
            isCurrect = x.basicDataItems[i]&&isCurrect?true:false;
            console.log(isCurrect,"first 2")

        }
        return { ...x, isCurrect };

    })
    // newArr.orderby((a,b)=>a.isCurrect<=b.isCurrect)
    console.log(newArr, "new")
    return (<>
        {currentProd.map((prod, index) => {
            return (<div>{isSelect ? <div className="card" key={index}>
                <GrClose onClick={removeFather} id={prod.id} />
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
                {Object.entries(prod.basicDataItems).map(([key, value]) => (
                    <div>
                        <p>
                            <input type={"checkbox"} defaultChecked={false} id={prod.id} value={key} onChange={addMainBasicData} />

                            {key} - {String(value)}
                        </p>
                    </div>
                ))}
            </div> : null}</div>)

        })}

        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} >

            {newArr.map((prod, index) => { 
                return (<div className='container' key={index}>
                    <div className="cards" >

                        <div className={prod.isCurrect ? "" : "filed"}></div>
                        <FiEdit2 onClick={EditProd} id={prod.id} />
                        <div id={prod.id} data-album-card onClick={selectFather}>
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

                            {Object.entries(prod.basicDataItems).map(([key, value]) => (

                                <div>
                                    <p>
                                        {key} - {String(value)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div></div>)
            })}
        </ScrollMenu>
        {/* <input type={"button"} onClick={linkProducts} /> */}
    </>);
}
export default ProductLink;