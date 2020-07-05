import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, select, array, object, boolean } from '@storybook/addon-knobs';
import Parallax from './index';

storiesOf('Parallax', module)
    .addDecorator(withKnobs)
    .add('Default', () => (
        <Parallax
            isStatic={boolean('isStatic', false)}
            layers={array(
                'layers',
                [
                    'https://i.imgur.com/G2zsxeD.png',
                    'https://i.imgur.com/HZmIEdK.png',
                    'https://i.imgur.com/dp50zpz.png',
                    'https://i.imgur.com/DiWkFKd.png',
                    'https://i.imgur.com/LwojbKJ.png',
                ],
                ',',
            )}
            style={object('style', {
                width: '320px',
                height: '500px',
            })}
        />
    ));
