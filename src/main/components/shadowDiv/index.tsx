import styled from 'styled-components';
import { IProps } from './index.types';

export const ShadowDiv = styled.div<IProps>`
    position: absolute;
    top: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
    transition: all 0.2s ease-out;
    box-shadow: 0 8px 30px rgba(14, 21, 47, 0.6);
    ${(props) =>
        props.isOnHover &&
        `
        box-shadow: 0 45px 100px rgba(14, 21, 47, 0.4), 0 16px 40px rgba(14, 21, 47, 0.4);
    `}
`;
