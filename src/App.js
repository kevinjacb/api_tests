import { useEffect, useState } from 'react';
import ReactDropdown from 'react-dropdown';
import { TableView, TablePopUp } from './Table';
import DropDown from './Filter';
import { SocialIcon } from 'react-social-icons';
import './App.css';


function App() {


  return (
    <div className="App">
      <div id="top-bar"> {/* top bar with filters*/}
        <text id="main-title">PEPCORNS</text>
        <div className='social-icon'><SocialIcon url='https://github.com/kevinjacb/api_tests' fgColor='white' bgColor='black' /></div>
      </div>
      <div id="main-screen"> {/* table view */}
        <MainScreen />
      </div>
    </div>
  );
}



function MainScreen(props) { // depends on the number of columns from the api call // TODO
  const titles = ["User ID", "Name", "Pay ID"];
  const popupDeets = { "showPopUp": false, "popUpData": [{ 'loading': 'loading' }], "type": "" };
  const [data, setData] = useState([]);
  const [{ showPopUp, popUpData, type }, setShowPopup] = useState(popupDeets);


  useEffect(() => {
    fetch('https://devapi.pepcorns.com/api/test/getAllUsers')
      .then(response => response.json())
      .then(json =>
        setData(json['response']));
  }, []);

  const handleUserClick = (userId) => { // handles user id click
    // console.log(popUpData); //debug
    fetch(`https://devapi.pepcorns.com/api/test/getUserById/${userId}`)
      .then(response => response.json())
      .then(json => {
        setShowPopup({ "showPopUp": true, "popUpData": json['response'], "type": 'user_id' })
        // console.log(json); //debug
      }
      );
  };

  const handlePayClick = (payId) => { // handles pay id click
    fetch(`https://devapi.pepcorns.com/api/test/getPayment/payment-0${payId}`)
      .then(response => response.json())
      .then(json => {
        setShowPopup({ "showPopUp": true, "popUpData": json['response'], "type": 'payment' })
        console.log(payId, json); //debug
      }
      );
  };

  const hidePopUp = () => { // hides the popup
    setShowPopup({ showPopUp: false, popUpData: "", type: "" });
  };


  return <div id='main-screen'>
    {(showPopUp) ? <TablePopUp popUpData={popUpData} hidePopUp={hidePopUp} popUpType={type} /> : null}
    < TableView titles={titles} data={data} callback1={handleUserClick} callback2={handlePayClick} />
  </div>;
}



export default App;
