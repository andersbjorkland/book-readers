import { useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoffee} from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect } from "react-router-dom";

const SearchBar = ({baseUrl}) => {
    const [searchValue, setSearchValue] = useState("");
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const handleSearchValue = (event) => {
        setSearchValue(event.target.value);
    }

    /*
     * Upon pressing enter the search query should be executed. 
     * This is handled by setting a shouldRedirect variable to render a redirect component for React Router.
     * This will have to be unset once executed to hinder it redirecting whenever the searchValue variable is updated.
     */
    const handleTextEnter = (event) => {
        if (event.key === 'Enter') {
            setShouldRedirect(true);
            setTimeout(() => setShouldRedirect(false), 250);
        }
    }

    return (
        <div>
            <input type="text" onKeyUp={handleSearchValue} onKeyDown={handleTextEnter} placeholder={searchValue}/>
            <Link to={baseUrl + "?q=" + searchValue}><FontAwesomeIcon icon={faCoffee}/>Search</Link>
            {shouldRedirect ? <Redirect to={baseUrl + "?q=" + searchValue} /> : null}
        </div>
    );
}

export default SearchBar;