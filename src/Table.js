import DropDown from "./Filter";
import { useState } from "react";


function _TablePopUp(props) { // TODO: popup for table view
    console.log(props.popUpData); //debug

    const type = props.popUpType;

    const sortOptions = ['None', 'Ascending', 'Descending'];
    const filterOptions = ['None', 'Active', 'Inactive'];

    const [sortOption, setSortOption] = useState(0);
    const [filterOption, setFilterOption] = useState(0);

    const hide = () => {
        props.hidePopUp({ showPopUp: false, popUpData: "", type: "" });
    };


    const copy = Object.assign({}, props.popUpData[0]); // copy the object

    const name = copy['name'];
    const user_id = copy['user_id'];
    const age = copy['age'];
    delete copy.name;
    delete copy.user_id;
    delete copy.age;

    const titles = Object.keys(copy).map((item, index) => item.replace('_', ' ')); // get titles from the items
    let data = Object.values(props.popUpData.map((item, index) => {
        const copy = Object.assign({}, item); // copy the object
        delete copy.user_id; // redundant data
        delete copy.name;
        delete copy.age;
        return { ...copy, status: (copy['status'] == 1) ? "active" : "inactive" }
    }));// get data from the items
    // get data from the items

    console.log("befo", data);

    if (type == 'user_id') {
        switch (filterOption) {
            case 1:
                data = data.filter((item, index) => item.status == 'active');
                break;
            case 2:
                data = data.filter((item, index) => item.status == 'inactive');
                break;
        }
        switch (sortOption) {
            case 1:
                data = data.sort((a, b) => a.amount - b.amount);
                break;
            case 2:
                data = data.sort((a, b) => b.amount - a.amount);
                break;
        }
    }

    console.log("sort", sortOption);
    console.log("aft", data);

    return <div id="table-popup-blur" onClick={hide}>
        <div id="table-popup">
            <div id='table-popup-details'>
                <text className='table-popup-common-details'><span className='details-desc'>NAME:</span> {name}</text>
                <text className='table-popup-common-details'><span className='details-desc'>USER ID:</span> {user_id}</text>
                <text className='table-popup-common-details'><span className='details-desc'>AGE:</span> {age}</text>
            </div>
            {(type == 'user_id') ?
                <div id="dropdown-container" onClick={(event) => { event.stopPropagation(); }}>
                    <text className="dropdown-label"> Sort: </text>
                    <DropDown options={sortOptions} placeHolder="None" callback={setSortOption} rootClass="dropdown1" />
                    <span id="space"></span>
                    <text className="dropdown-label"> Filter: </text>
                    <DropDown options={filterOptions} placeHolder="None" callback={setFilterOption} rootClass="dropdown2" />
                </div>
                : null}
            <TableView titles={titles} data={data} type={type} />
        </div>
    </div>
}

function _TableView(props) {

    let titles = props.titles;

    if (titles.length == 0)
        titles = ["NO DATA"];

    return (
        <div className='table-view'>
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
                {(props.data && props.data.length > 0) ?
                    (props.data.map((item, index) => {
                        // console.log("this", props.data); //debug
                        return <tr className='table-data-row'>
                            {Object.keys(item).map((key, index) => {
                                const classes = 'table-data-row table-data-item ' + ((index === 0 || index == 2) ? ' table-data-item-selectable' : ''); // hover control
                                return <td id={index} className={classes} onClick={() => (index === 0) ? props.callback1(item[key]) : (index === 2) ? props.callback2(item[key]) : null}><span className={((index === 0 || index == 2) ? ' table-data-item-selectable' : '') + ((key == 'status') ? item[key] : null)}>{item[key]}</span></td>
                            })}
                        </tr>
                    })) :
                    (<tr><td><span id='popup-loading'> Loading</span></td></tr>)}
            </table>
        </div>
    );
}

export const TableView = _TableView;
export const TablePopUp = _TablePopUp;