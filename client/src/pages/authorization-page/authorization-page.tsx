import React from 'react';
import './authorization-page.scss';
import { Wrapper } from '../../containers/wrapper/wrapper';
import { ICredentials, TNullable } from '../../types/types';
import { userService } from '../../services/user.service';
import { useNavigate } from "react-router-dom";

enum USER_TYPE {
    GUEST = 'guest',
    SUBSCRIBER = 'subscriber',
    ADMIN = 'admin'
}

export const AuthorizationPage = () => {
    const credentials: ICredentials = {
        email: null,
        password: null,
    };

    const navigate = useNavigate();

    const validateForm = ({ email, password }: ICredentials): boolean => {
        return [email, password].every(data => data !== null);
    };

    const setSessionUser = (userType: USER_TYPE) => {
        sessionStorage.setItem('userType', userType);
    }

    const submitAuthorization = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        const isDataValid = validateForm(credentials);
        if (!isDataValid) return;
        userService.getAccess(credentials)
            .then(({ userType }: { userType: TNullable<USER_TYPE> }) => {
                if (userType === null) return;
                setSessionUser(userType);
                navigate("movies");
            });
    };

    const writeCredential = (field: 'email' | 'password') => (event: any) => {
        credentials[field] = event.target.value;
    }

    return <>
        <Wrapper>
            <div className="authorization">
                <form className="authorization__form">
                    <label className="authorization__label">
                        <span className="authorization__field-name">Email: </span>
                        <input
                            className="authorization__field"
                            placeholder="enter email"
                            type="text"
                            onBlur={writeCredential('email')}/>
                    </label>
                    <label className="authorization__label">
                        <span className="authorization__field-name">Password: </span>
                        <input
                            className="authorization__field"
                            placeholder="enter password"
                            type="password"
                            onBlur={writeCredential('password')}/>
                    </label>
                    <button
                        className="authorization__submit-btn"
                        onClick={submitAuthorization}>Submit</button>
                </form>
                <div className="authorization__standalone standalone">
                    <div className="standalone__separator"/>
                    <button
                        className="standalone__escape-btn"
                        onClick={() => setSessionUser(USER_TYPE.GUEST)}>Enter as a guest</button>
                </div>
            </div>
        </Wrapper>
    </>;
};