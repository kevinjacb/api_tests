import { useEffect, useState } from 'react';
import ReactDropdown from 'react-dropdown';
import './App.css';

function App() {

  const options = ['Amount', 'Status'];
  const options_sub = {
    'amount': ['None', 'Acending', 'Descending'],
    'status': ['All', 'Active', 'Inactive']
  };

  return (
    <div className="App">
      <div id="top-bar"> {/* top bar with filters*/}
        <div id="dropdown-container">
          <text id="dropdown-label"> Filter: </text>
          <DropDown options={options} options_sub={options_sub} />
        </div>
      </div>
      <div id="table-view"> {/* table view */}
        <TableView />
      </div>
    </div>
  );
}

function DropDown(props) { // dropdown component

  const dflt = { 'selected': -1, 'afilter': 'None', 'sfilter': 'All', 'placeHolder': 'None' }; // selected , amount, status, placeholder
  const [selections, setSelections] = useState(dflt);
  const { selected, afilter, sfilter, placeHolder } = selections;

  const onSelect = (index) => setSelections({ ...selections, "selected": index });

  const subItemSelect = (label, index) => {
    const naf = label === 'amount' ? props.options_sub[label][index] : afilter;
    const nsf = label === 'status' ? props.options_sub[label][index] : sfilter;
    setSelections(prevState => ({
      ...prevState,
      selected: -1,
      afilter: naf,
      sfilter: nsf,
      placeHolder: (nsf === 'All' && naf === 'None') ? 'None' : 'Applied'
    }));
    console.log(selections);
    // TODO: update the table view
  };


  const subSelect = (index) => { // sub menu
    // console.log(index);
    return <div className='dropdown-sub'>
      {
        (props.options_sub[`${index.label}`.toLowerCase()]).map((item, ind) => {
          return <span className='dropdown-sub-item' key={ind} onClick={() => subItemSelect(`${index.label}`.toLowerCase(), ind)}>
            {item}
          </span>
        })
      }
    </div>
  };

  return ( // main menu
    <div id="dropdown">
      <ReactDropdown options={props.options} onChange={onSelect} value={placeHolder} className="dropdown-main-items" controlClassName='dropdown-main-control' menuClassName='dropdown-main-menu' placeholderClassName='dropdown-main-placeholder' />
      {
        (selected != -1) ? subSelect(selected) : null
      }
    </div>
  );
}

function TableView(props) { // depends on the number of columns from the api call
  const titles = ["User ID", "Name", "Pay ID", "Status"];
  const popupDeets = { "showPopUp": false, "data": "" };
  const [data, setData] = useState([]);
  const [{ showPopUp, popUpData }, setShowPopup] = useState(popupDeets);

  useEffect(() => {
    fetch('https://devapi.pepcorns.com/api/test/getAllUsers')
      .then(response => response.json())
      .then(json => setData(json['response']));
  }, []);


  const handleUserClick = (userId) => { // handles user id click
    console.log(userId);
    fetch(`https://devapi.pepcorns.com/api/test/getUserById/${userId}`)
      .then(response => response.json())
      .then(json => {
        setShowPopup({ showPopUp: true, popUpData: json })
        console.log(json);
      }
      );
  };

  const handlePayClick = (payId) => { // handles pay id click
    console.log(payId);
  };

  const hidePopUp = () => { // hides the popup
    setShowPopup({ showPopUp: false, popUpData: "" });
  };

  return (
    <div className='table-view' id='table-view-parent'>
      {(showPopUp) ? <TablePopUp uid={showPopUp} /> : null}
      <table>
        <tr className='table-title-row'>
          {
            titles.map((item, index) => {
              return (
                <th className='table-title-item' key={index}>
                  {item.toUpperCase()}
                </th>
              );
            })}
        </tr>
        {(data && data.length > 0) ?
          (data.map((item, index) => {
            return <tr className='table-data-row'>
              {Object.keys(item).map((key, index) => {
                const classes = 'table-data-row table-data-item ' + ((index === 0 || index == 2) ? ' table-data-item-selectable' : ''); // hover control
                return <td id={index} className={classes} onClick={() => (index === 0) ? handleUserClick(item[key]) : (index === 2) ? handlePayClick(item[key]) : null}>{item[key]}</td>
              }).filter((_, index) => index < 4)}
            </tr>
          })) :
          (<tr><td>Loading</td></tr>)}
      </table>
    </div>
  );
}

function TablePopUp(props) { // TODO: popup for table view
  return <div>Jelllo {props.uid}</div>
}


export default App;
