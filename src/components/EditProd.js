import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './CSS/EditProd.css';
const EditProd = ({products}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const myProd = location.state.newProd;
    const [updateProd, setupdateProd] = useState(myProd.basicDataItems)

    const update = (event) => {
        var obj = {};
        const key = event.target.id;
        obj[key] = event.target.value;
        setupdateProd(Object.assign(updateProd, obj));
    }
    const save = () => {
        // console.log(products,"products from edit page")
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'הנתונים נשמרו בהצלחה',
            showConfirmButton: false,
            timer: 2000
        })

        navigate("/ProductLink");
    }
    return (<>{console.log(location.state.data)}
        <div className='allAdd'>
            <h2>הכנס ערכים חסרים</h2>
            {location.state.selectData.map((data, index) => {
                return (<div className='addDiv' key={index}>
                   <div>
                        <label>{data}: </label>
                        <input type={"text"} className="addInput" onChange={update} id={data} value={myProd.basicDataItems[data]} />
                    </div>
                </div>)
            })}

            <button type={"button"} className="custom-btn btn-5" onClick={save} ><span>שמור</span></button>
        </div></>);
}

export default EditProd;