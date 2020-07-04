import styled from 'styled-components';
import { IProps } from './index.types';

export const RootDiv = styled.div<IProps>`
    border-radius: 5px;
    transform-style: preserve-3d;
    -webkit-tap-highlight-color: rgba(#000, 0);
    transform: perspective(${(props) => props.rootElemWidth}px);
`;
