import { useState } from 'react';
import PopUp from './PopUp';
import { useLocation, useNavigate } from 'react-router-dom';

const EditProd = ({ theProd }) => {
    const id = theProd.id;
    const [name, setname] = useState(theProd.name);
    const [companyName, setcompanyName] = useState(theProd.companyName);
    const [companyLogo, setcompanyLogo] = useState(theProd.logo);
    const [image, setimage] = useState(theProd.advancedDataItems.images[0])
    const [basicDataItems, setbasicDataItems] = useState(theProd.basicDataItems);
    const navigate = useNavigate();
    const { state } = useLocation();
    console.log(state, "come from EDIT");

    // const handleSubmit = () => {
    //     console.log("cliked");
    //     navigate("PopUp");
    // }

    return (<>
    <h1>hjhj</h1>
        {/* <form onSubmit={handleSubmit}>
            <input type="text" value={name} />
        </form> */}
    </>);
}

export default EditProd;