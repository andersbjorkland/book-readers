import { useState } from "react";
import styled from "styled-components";

const ButtonToTextInput = ({prompt}) => {
    const [activated, setActivated] = useState(false);

    const handleClick = (event) => {
        event.preventDefault();
        setActivated(true);
    }

    return (
        <div>
            {activated ? null:  <button onClick={handleClick} >{prompt}</button>}
            {activated ? <><label>{prompt}</label><input type="text" /></> : null}
        </div>
    );
}

export default ButtonToTextInput;