import React from 'react';
import Parallax from './index';

export default {
    title: 'Parallax',
};

export const Primary = () => (
    <Parallax
        isStatic={false}
        layers={[
            'https://i.imgur.com/G2zsxeD.png',
            'https://i.imgur.com/HZmIEdK.png',
            'https://i.imgur.com/dp50zpz.png',
            'https://i.imgur.com/DiWkFKd.png',
            'https://i.imgur.com/LwojbKJ.png',
        ]}
        style={{
            width: '320px',
            height: '500px',
        }}
    />
);

export const Static = () => (
    <Parallax layers={[]} isStatic={true} staticFallback={'https://i.imgur.com/DiWkFKd.png'} style={{
        width: '320px',
        height: '500px',
    }}/>
);
