import React, { useContext } from 'react'
import './Navbar.css'
import { Coincontext } from '../../context/Coincontext'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const {setCurrency}=useContext(Coincontext);

  const currencyhandler=(e)=>{
   switch(e.target.value){
    case "inr":
      setCurrency({name:'inr',symbol:'₹'});
      break;
      case "ero":
        setCurrency({name:'eur',symbol:'€'});
        break;
      case "usd":
        setCurrency({name:'usd',symbol:'$'});
        break;
      default:
        setCurrency({name:'inr',symbol:'₹'})
   } 
  }
  return (
    <div className='navbar'>
         <Link to='/'><h1>CRYPTO</h1></Link>
         <ul>
            <Link to='/'><li>Home</li></Link>
            <li>Features</li>
            <li>Pricing</li>
            <li>Blog</li>
         </ul>
         <div className="navright">
            <select onChange={currencyhandler}>
                <option value="inr">INR</option>
                <option value="ero">ERO</option>
                <option value="usd">USD</option>
            </select>
            <button>Sign Up</button>
         </div>
    </div>
  )
}

export default Navbar