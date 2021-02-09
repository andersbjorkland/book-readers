import styled from "styled-components";
import { faLaughWink, faGhost, faPoop,faSun, faMask, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const iconLexicon = {
    faLaughWink: {
        fa: faLaughWink,
        description: "Funny"
    },
    faGhost: {
        fa: faGhost,
        description: "Scary"
    },
    faPoop: {
        fa: faPoop,
        description: "Boring"
    },
    faSun: {
        fa: faSun,
        description: "Feelgood"
    },
    faMask: {
        fa: faMask,
        description: "Thrilling"
    },
    faLightbulb: {
        fa: faLightbulb,
        description: "Insightful"
    }
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    width: fit-content;
    justify-content: space-between;
    
    svg {
        color: grey;
    }
    svg.active {
        color: var(--lighterBlue);
    }

    .tooltip .tooltiptext {
        visibility: hidden;
        width: 68px;
        background-color: var(--purple);
        color: white;
        text-align: center;
        padding: 5px 0;
        border-radius: 4px;
        
        position: absolute;
        z-index: 1;
        bottom: 100%;
        left: 50%;
        margin-left: -30px;

        font-size: 0.7rem;
    }

    .tooltip:hover .tooltiptext {
        visibility: visible;
    }
`;

export const SocialButton = ({faCode, updateImpressions, activated=false, iconObj = null, lexiconize = true}) => {
    const [active, setActive] = useState(activated);

    const handleClick = () => {
        if (updateImpressions) {
            updateImpressions(!active, faCode);
            setActive(!active);
        }

    }

    const icon = (lexiconize ? 
        <FontAwesomeIcon icon={iconLexicon[faCode].fa} className={active ? "active" : ""}/> :
        <FontAwesomeIcon icon={iconObj.fa} className={active ? "active" : ""}/>
        );

    const description = (lexiconize ?
        <span className="tooltiptext">{iconLexicon[faCode].description}</span> :
        <span className="tooltiptext">{iconObj.description}</span>
    )

    if (!faCode) {
        console.error("No faCode present!");
        return null;
    }

    if (!lexiconize) {
        return (
            <Wrapper>
                <div className="tooltip" onClick={handleClick}>
                    {icon}
                    {description}
                </div>
            </Wrapper>
        );
    }

    return (
        <div className="tooltip" onClick={handleClick}>
            {icon}
            {description}
        </div>
    );
}

const SocialImpression = ({updateImpressions, impressions}) => {
    let i = 0;
    console.log({impressions});
    const socials = Object.keys(iconLexicon).map(icon => <SocialButton key={i++} activated={impressions?.includes(icon)} faCode={icon} updateImpressions={updateImpressions} />)

    return (
        <Wrapper>
            {socials}
        </Wrapper>
    );
    
}

export default SocialImpression;