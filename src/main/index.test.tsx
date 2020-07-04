import React from 'react';
import { render } from '@testing-library/react';
import Parallax from './index';

describe('Test Component', () => {
    const renderComponent = () =>
        render(
            <Parallax
                layers={[
                    'https://i.imgur.com/G2zsxeD.png',
                    'https://i.imgur.com/HZmIEdK.png',
                    'https://i.imgur.com/dp50zpz.png',
                    'https://i.imgur.com/DiWkFKd.png',
                    'https://i.imgur.com/LwojbKJ.png',
                ]}
                isStatic={false}
                style={{
                    width: '320px',
                    height: '500px',
                }}
            />,
        );
    it('check mounted', () => {
        const { getByTestId } = renderComponent();
        const rootComponent = getByTestId('root-div');
        expect(rootComponent).toBeInTheDocument();
    });
});
