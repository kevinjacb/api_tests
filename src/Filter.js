import react, { useState } from 'react';
import ReactDropdown from 'react-dropdown';

function DropDown(props) {

    //states 0 -> all, 1 -> active, 2 -> inactive type = user
    //states 0 -> none, 1 -> ascending, 2 -> descending type = payment
    const onSelect = (index) => {
        switch (index.value) {
            case 'None':
                index.value = 0;
                break;
            case 'Ascending':
                index.value = 1;
                break;
            case 'Descending':
                index.value = 2;
                break;
            case 'Active':
                index.value = 1;
                break;
            case 'Inactive':
                index.value = 2;
                break;
        }
        props.callback(index.value);
    };



    return (
        <div className={props.rootClass}>
            <ReactDropdown
                options={props.options}
                onChange={onSelect}
                placeholder={props.placeHolder}
                key={props.key}
            />
        </div>
    );
}

export default DropDown;