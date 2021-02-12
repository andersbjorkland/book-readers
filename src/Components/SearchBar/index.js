import { useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCoffee} from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect, useHistory } from "react-router-dom";
import { Wrapper } from "./SearchBar.styles";

const SearchBar = ({baseUrl}) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchValue = (event) => {
        setSearchValue(event.target.value);
    }

    const history = useHistory();

    /*
     * Upon pressing enter the search query should be executed. 
     * This is handled by setting a shouldRedirect variable to render a redirect component for React Router.
     * This will have to be unset once executed to hinder it redirecting whenever the searchValue variable is updated.
     */
    const handleTextEnter = (event) => {
        if (event.key === 'Enter') {
            history.push(baseUrl + "?q=" + searchValue);
        }
    }

    return (
        <Wrapper>
            <input className="text-input" type="text" onKeyUp={handleSearchValue} onKeyDown={handleTextEnter} placeholder={searchValue}/>
            <Link className="button" to={baseUrl + "?q=" + searchValue}><FontAwesomeIcon icon={faCoffee}/>Search</Link>
        </Wrapper>
    );
}

export default SearchBar;