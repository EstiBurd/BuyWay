import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
// import Arrow from 'react-arrow';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
const getItems = () => Array(20).fill(0).map((_, ind) => ({ id: `element-${ind}` }));

function ProductLink(props) {
    const location = useLocation();
    const [items, setItems] = useState(getItems);
    const [selected, setSelected] = useState([]);
    const [position, setPosition] = useState(0);

    // const isItemSelected = (id) => !!selected.find((el) => el === id);

    // const handleClick =
    //     (id) =>
    //         ({ getItemById, scrollToItem }) => {
    //             const itemSelected = isItemSelected(id);

    //             setSelected((currentSelected) =>
    //                 itemSelected
    //                     ? currentSelected.filter((el) => el !== id)
    //                     : currentSelected.concat(id)
    //             );
    //         };

    return (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {location.state.map((prod, index) => {
                        return (<div key={index} className="card" data-album-card>
                            {/* {prod.basicDataItems} */}
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
                {/* ); */}

            {/* {items.map(({ id }) => (
        <Card
          itemId={id} // NOTE: itemId is required for track items
          title={id}
          key={id}
          onClick={handleClick(id)}
          selected={isItemSelected(id)}
        />
      ))} */}
    </ScrollMenu>
            );
}

            function LeftArrow() {
  const {isFirstItemVisible, scrollPrev} =
            React.useContext(VisibilityContext);

            return (
            <button disabled={isFirstItemVisible} onClick={() => scrollPrev()}>Left</button>


            );
}

            function RightArrow() {
  const {isLastItemVisible, scrollNext} = React.useContext(VisibilityContext);

            return (
            <button disabled={isLastItemVisible} onClick={() => scrollNext()}>
                Right
            </button>
            );
}

//             function Card({onClick, selected, title, itemId}) {
//   const visibility = React.useContext(VisibilityContext);

//             return (
//             <div
//                 onClick={() => onClick(visibility)}
//                 style={{
//                     width: '160px',
//                 }}
//                 tabIndex={0}
//             >
//                 <div className="card">
//                     <div>{title}</div>
//                     <div>visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}</div>
//                     <div>selected: {JSON.stringify(!!selected)}</div>
//                 </div>
//                 <div
//                     style={{
//                         height: '200px',
//                     }}
//                 />
//             </div>
//             );
// }
// const ProductLink = (props) => {
//     const location = useLocation();

//     console.log(location.state);
//     return (<>
//         {location.state.map((prod, index) => {
//             return (<div key={index} className="card" data-album-card>
//                 {/* {prod.basicDataItems} */}
//                 <div className="image">
//                     <img src={("../../Images/" + prod.advancedDataItems.images[0])} alt="img" />
//                     <img src={("../../Images/" + prod.logo)} alt="img" />
//                 </div>
//                 <div className='prodName'>
//                     {prod.name}
//                 </div>
//                 <div className="caption" >
//                     {prod.companyName}
//                 </div>
//             </div>)
//         })}
//     </>);
// }

export default ProductLink;