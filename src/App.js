import { useEffect, useState } from 'react';
import ReactDropdown from 'react-dropdown';
import './App.css';

function App() {

  const options = ['Amount', 'Status'];
  const options_sub = {
    'amount': ['All', 'Acending', 'Descending'],
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

  const [selected, setSelected] = useState(-1);
  const [afilter, setAfilter] = useState('All');
  const [sfilter, setSfilter] = useState('All');

  const onSelect = (index) => setSelected(index);

  const subItemSelect = (index) => {
    console.log(`Selected item: ${index}`);
    setSelected(-1);
    // TODO: update the table view
  };

  const subSelect = (index) => { // sub menu
    console.log(index);
    return <div className='dropdown-sub'>
      {
        (props.options_sub[`${index.label}`.toLowerCase()]).map((item, index) => {
          return <span className='dropdown-sub-item' key={index} onClick={() => subItemSelect(index)}>
            {item}
          </span>
        })
      }
    </div>
  };

  return ( // main menu
    <div id="dropdown">
      <ReactDropdown options={props.options} onChange={onSelect} className="dropdown-main-items" controlClassName='dropdown-main-control' menuClassName='dropdown-main-menu' placeholderClassName='dropdown-main-placeholder' />
      {
        (selected != -1) ? subSelect(selected) : null
      }
    </div>
  );
}

function TableView(props) { // depends on the number of columns from the api call
  const titles = ["User ID", "Name", "Pay ID", "Status"];
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://api.sampleapis.com/baseball/hitsSingleSeason')
      .then(response => response.json())
      .then(json => setData(json));
  }, []);

  return (
    <div className='table-view' id='table-view-parent'>
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
                return <td id={index} className={classes}>{item[key]}</td>
              }).filter((_, index) => index < 4)}
            </tr>
          })) :
          (<tr><td>Loading</td></tr>)}
      </table>
    </div>
  );
}

{/* function TableItem(props) {
  return (
    //TODO
  );
} */}


export default App;
