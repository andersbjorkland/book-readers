import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

const VerifyPage = () => {
    const query = new URLSearchParams(useLocation().search);
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState(null);
    
    useEffect(() => {
        const verificationTarget = query.toString() ? unescape(query.toString()) : null;
        if (!verificationTarget) {
            console.log("No target destination to verify to.");
        } else {
            console.log(verificationTarget);
            fetch(verificationTarget)
                .then(response => {
                    setStatus(response.status);
                    return response.json();
                })
                .then(result => {
                    console.log(result);
                    setMessage(result.message ? <p>{result.message}</p> : null);
                });
        }
    }
    , []);

    

    return (
        <>
            <h1>Verify</h1>
            {message}
        </>
    );
}

export default VerifyPage;