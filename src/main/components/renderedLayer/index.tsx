import styled from 'styled-components';
import { IProps } from './index.types';

export const RenderedLayer = styled.div<IProps>`
    position: absolute;
    width: 104%;
    height: 104%;
    top: -2%;
    left: -2%;
    background-repeat: no-repeat;
    background-position: center;
    background-color: transparent;
    background-size: cover;
    transition: all 0.1s ease-out;
    ${(props) =>
        props.url &&
        `
        background-image: url(${props.url});
    `}
`;
