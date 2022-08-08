import React, { useState } from 'react';
import './authorization-page.scss';
import { Wrapper } from '../../containers/wrapper/wrapper';

export const AuthorizationPage = () => {
    const [ isAdmin, setIsAdmin ] = useState(true);
    const makeLog = () => {
        console.log('Send');
    };
    return <>
        <Wrapper>
            <div className="authorization">
                <form className="authorization__form">
                    <label className="authorization__label">
                        <span className="authorization__field-name">Email: </span>
                        <input className="authorization__field" type="text" />
                    </label>
                    <label className="authorization__label">
                        <span className="authorization__field-name">Password: </span>
                        <input className="authorization__field" type="password" />
                    </label>
                    <label className="authorization__label--question">
                        <span className="authorization__field-name--question">is admin? </span>
                        <input className="authorization__field--question" type="checkbox" onChange={() => setIsAdmin((isAdmin) => !isAdmin)}/>
                    </label>
                    { isAdmin &&
                        <label className="authorization__label">
                            <span className="authorization__field-name">admin secret: </span>
                            <input className="authorization__field" type="password" />
                        </label> }
                    <button onClick={makeLog}>Submit</button>
                </form>
                <div className="authorization__standalone standalone">
                    <div className="standalone__separator"/>
                    <button className="standalone__escape-btn">Enter as a guest</button>
                </div>
            </div>
        </Wrapper>
    </>;
};