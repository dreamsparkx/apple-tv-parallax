import { CSSProperties } from 'react';

export interface IProps {
    layers?: string[];
    isStatic?: boolean;
    className?: string;
    style?: CSSProperties;
}

export interface IState {
    rootElemWidth: number;
    rootElemHeight: number;
    isOnHover: boolean;
    container: CSSProperties;
    shine: CSSProperties;
    layers: CSSProperties[];
}
