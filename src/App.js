import './App.css';
import HomePage from './components/HomePage';
import ProductLink from './components/ProductLink'
import { Route, Routes } from 'react-router-dom'

function App() {
  // const navigate = useNavigate();
  return (
    <div>
      <HomePage />
      {/* <Routes>
       <Route exact path="/" element={<HomePage/>}/>
        <Route exact path="/ProductLink" element={<ProductLink />} />
      </Routes>  */}
    </div>
  );
}

export default App;
