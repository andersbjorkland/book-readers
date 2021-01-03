import { useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoffee} from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({onSubmission}) => {
    const [searchValue, setSearchValue] = useState(null);

    const handleSearchValue = (event) => {
        setSearchValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmission(searchValue);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input type="text" onKeyUp={handleSearchValue} />
                <button type="submit"><FontAwesomeIcon icon={faCoffee}/>Search</button>
            </div>
        </form>
    );
}

export default SearchBar;