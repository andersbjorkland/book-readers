import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import { CenteredContent, Wrapper } from "./PageLayout";
import { Content } from "../Components/Review/Review.styles";

const VerifyPage = () => {
    const query = new URLSearchParams(useLocation().search);
    const [message, setMessage] = useState(null);
    
    useEffect(() => {
        const verificationTarget = query.toString() ? unescape(query.toString()) : null;
        if (!verificationTarget) {
            console.log("No target destination to verify to.");
        } else {
            let signatureValue = verificationTarget.substr(
                verificationTarget.indexOf("signature=") + 10,
                verificationTarget.indexOf("&token=") - (verificationTarget.indexOf("signature=") + 10)
            );
            signatureValue = signatureValue.replaceAll('/', '%2F');
            signatureValue = signatureValue.replaceAll('+', '%2B');
            signatureValue = signatureValue.replaceAll('=', '%3D');

            let tokenValue = verificationTarget.substr(
                verificationTarget.indexOf("&token=") + 7
            );
            tokenValue = tokenValue.replaceAll('/', '%2F');
            tokenValue = tokenValue.replaceAll('+', '%2B');
            tokenValue = tokenValue.replaceAll('=', '%3D');

            let parsedTarget = verificationTarget.substr(0, verificationTarget.indexOf("&signature=")) 
                + "&signature=" + signatureValue
                + "&token=" + tokenValue;

            axios(parsedTarget)
                .then(response => {
                    setMessage(response.data.message ? <p>{response.data.message}</p> : null);
                    return response;
                });
        }
    });

    

    return (
        <Wrapper>
            <Content>
                <CenteredContent>
                    <h1>Verify</h1>
                    {message}
                </CenteredContent>
            </Content>
        </Wrapper>
    );
}

export default VerifyPage;