import React from 'react';
import './logo.scss';

const blockName = 'logo';

type TLogo = () => JSX.Element;

export const Logo: TLogo = () => (<div className={blockName}>
    <span className={`${blockName}__text--bold`}>netflix</span>
    <span className={`${blockName}__text`}>roulette</span>
</div>);