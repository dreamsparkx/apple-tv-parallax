export interface IProps {
    layers?: string[];
    isStatic?: boolean;
    className?: string;
    style?: any;
}

export interface IState {
    rootElemWidth: number;
    rootElemHeight: number;
    isOnHover: boolean;
    container: any;
    shine: any;
    layers: any[];
}
