import { useEffect, useState } from "react";
import { useAuthState } from "../../Context";
import Logout from "../UIButtons/Logout";
import { BarWrapper, InnerContainer } from "./UserBar.styles";

const UserBar = () => {
    const {userDetails} = useAuthState();
    const [userAlias, setUserAlias] = useState(null);

    

    useEffect(() => {
        setUserAlias(userDetails.user);
        
    }, [userDetails]);

    console.log(userDetails);

    if (!userAlias) {
        return null;
    }

    return (
        <BarWrapper>
            <InnerContainer>
                <p>{userAlias}</p>
                <Logout />
            </InnerContainer>
        </BarWrapper>
    );
}

export default UserBar;