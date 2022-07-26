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

    const setSessionUser = (userType: USER_TYPE, userId: string) => {
        sessionStorage.setItem('userType', userType);
        sessionStorage.setItem('userId', userId);
    }

    const signIn = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        const isDataValid = validateForm(credentials);
        if (!isDataValid) return;
        userService.getAccess(credentials)
            .then(({ userType, userId }: { userType: TNullable<USER_TYPE>, userId: string }) => {
                if (userType === null) return;
                setSessionUser(userType, userId);
                navigate("movies");
            });
    };

    const writeCredential = (field: 'email' | 'password') => (event: any) => {
        credentials[field] = event.target.value;
    };

    const enterAsAGuest = () => {
        setSessionUser(USER_TYPE.GUEST, null);
        navigate("movies");
    };

    return <>
        <Wrapper>
            <div className="authorization__wrapper">
                <div className="authorization__background">
                    <form className="authorization__form">
                        <label className="authorization__label form__label">
                            <span className="authorization__field-name">Email: </span>
                            <input
                                className="authorization__field form__input"
                                placeholder="enter email"
                                type="text"
                                onBlur={writeCredential('email')}/>
                        </label>
                        <label className="authorization__label form__label">
                            <span className="authorization__field-name">Password: </span>
                            <input
                                className="authorization__field form__input"
                                placeholder="enter password"
                                type="password"
                                onBlur={writeCredential('password')}/>
                        </label>
                        <button
                            className="authorization__submit-btn search__btn"
                            onClick={signIn}>Sign in</button>
                    </form>
                    <div className="authorization__standalone standalone">
                        <div className="standalone__separator"/>
                        <button
                            className="standalone__escape-btn search__btn"
                            onClick={enterAsAGuest}>Enter as a guest</button>
                    </div>
                </div>
            </div>
        </Wrapper>
    </>;
};