import { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm";
import Nav from "./Nav";
const AuthPage = ({ initialMethod }) => {
    const [method, setMethod] = useState(initialMethod);


    useEffect(() => {
        setMethod(initialMethod);
    }, [initialMethod]);

    const route = method === 'login' ? '/auth/token/' : '/auth/user/register/';

    return (
        <>
            <Nav></Nav>
            <div className="d-flex justify-content-center align-items-center">
            <AuthForm route={route} method={method} />
            </div>
        </>
      );
};

export default AuthPage;