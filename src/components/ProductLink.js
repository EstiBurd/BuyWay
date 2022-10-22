import React from 'react';
import { useNavigate } from 'react-router-dom';
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
        <ArrowBackIosRoundedIcon disabled={isFirstItemVisible} className="scroll" onClick={() => scrollPrev()} />
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
const ProductLink = ({ products, addMainBasicData, selectData, currentProd, isSelect, selectFather, removeFather }) => {
    const navigate = useNavigate();
    // const [isSelect, setisSelect] = useState(false);
    // const [selectData, setselectData] = useState([]);
    // const selectFather = (event) => {
    //     setisSelect(true);
    //     if (currentProd.length === 0) {
    //         setcurrentProd([products.find(prod => prod.id === event.currentTarget.id)]);
    //     }
    //     else {
    //         setcurrentProd(oldArray => [...oldArray, products.find(prod => prod.id === event.currentTarget.id)]);
    //     }
    //     setProducts(products.filter(prod => prod.id !== event.currentTarget.id));
    // }
    // const removeFather = (event) => {
    //     let toRemove = allProducts.find(prod => prod.id === event.currentTarget.id);
    //     setProducts(oldArray => [...oldArray, toRemove]);
    //     setcurrentProd(currentProd.filter(prod => prod.id !== toRemove.id));

    // }

    const EditProd = (prod) => {
        navigate("EditProd", { state: { newProd: prod, selectData: selectData } })
    }
    // const addMainBasicData = (event) => {
    //     var updateList = [...selectData];
    //     var prodID = currentProd.find(prod => prod.id === event.target.id);
    //     {
    //         Object.entries(prodID.basicDataItems).map(() => (
    //             event.target.checked ?
    //                 updateList = [...selectData, event.target.value] :
    //                 updateList.splice(selectData.indexOf(event.target.value), 1)
    //         ))
    //     }
    //     setselectData(updateList);
    // }
    const masterIds = currentProd.map(current => current.id);
    const linkedProdsIds = products.map(link => link.id);
    console.log(masterIds, "master");
    console.log(linkedProdsIds, "linkkk");
    
    const linkProducts = () => {
        products.map((x) => {
            let isCurrect = true;
            
            for (let i of selectData) {
                isCurrect = x.basicDataItems[i] && isCurrect ? true : false;
            }
            if (isCurrect) {
                x.isMainProduct = false;

                currentProd.map((y) => {
                    y.HasRelatedProducts = [...y.HasRelatedProducts, x.id]
                })
            }
            console.log(isCurrect, "isCurrect");


        });
        console.log(products, "products after link!!")
        console.log(currentProd, "currentProd after link!!")
    }
    const newArr = products.map((x) => {
        let isCurrect = true;
        for (let i of selectData) {
            isCurrect = x.basicDataItems[i] && isCurrect ? true : false;
        }
        return { ...x, isCurrect };
    });
    newArr.sort((a, b) => a.isCurrect - b.isCurrect);
    return (<>
        {currentProd.map((prod, index) => {
            return (<div className="cardsArr" key={index} >{isSelect ? <div key={index}>
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

        })}

        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} >

            {newArr.map((prod, index) => {
                return (<div key={index}>
                    <div className="cardsArr" >

                        <div className={prod.isCurrect ? "" : "filed"}>
                            {isSelect ? <div><FiEdit2 onClick={() => EditProd(prod)} id={prod.id} /></div> : null}
                            <div id={prod.id} data-album-card onClick={selectFather}>
                                <div className="imageArr">
                                    <img src={("../../Images/" + prod.advancedDataItems.images[0])} alt="img" />
                                    <img src={("../../Images/" + prod.logo)} id='logoArr' alt="img" />
                                </div>
                                <div className='prodNameArr'>
                                    {prod.name}
                                </div>
                                <div className="captionArr" >
                                    {prod.companyName}
                                </div>

                                {Object.entries(prod.basicDataItems).map(([key, value]) => (

                                    <div key={key} >
                                        <p>
                                            {key} - {value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div></div>
                </div>)
            })}
        </ScrollMenu>
        <input type={"button"} onClick={linkProducts}  />
    </>);
}
export default ProductLink;