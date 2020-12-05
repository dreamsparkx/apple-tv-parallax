import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Parallax from './index';
import { IProps } from './index.types';

export default {
    title: 'Apple TV/Parallax',
    component: Parallax,
} as Meta;

const Template: Story<IProps> = (args) => <Parallax {...args} />;

export const Default = Template.bind({});
Default.args = {
    isStatic: false,
    style: {
        width: '320px',
        height: '500px',
    },
    layers: [
        'https://i.imgur.com/G2zsxeD.png',
        'https://i.imgur.com/HZmIEdK.png',
        'https://i.imgur.com/dp50zpz.png',
        'https://i.imgur.com/DiWkFKd.png',
        'https://i.imgur.com/LwojbKJ.png',
    ],
};
