import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    
    width: 7rem;
    justify-content: space-between;

    svg {
        color: darkgray;
    }
    svg.active {
        color: purple;
    }
`;

const getStars = (onClick, selectedScore = 0, num = 5) => {
    let stars = [];

    for (let i = 1; i <= num; i++) {
        stars.push(<Star key={i} onClick={onClick} value={i} selectedScore={selectedScore} />);
    }

    return stars;
}

const Star = ({onClick, value, selectedScore}) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (value <= selectedScore) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [value, selectedScore]);

    return (
        <div onClick={() => onClick(value)}>
            <FontAwesomeIcon icon={faStar} className={active ? "active" : ""}/>
        </div>
    );

}

const Score = ({setScore, selectedScore}) => {

    const onClick = (value) => {
        setScore(value);
    }

    return (
        <Wrapper>
            {getStars(onClick, selectedScore)}
        </Wrapper>
    );
}

export default Score;