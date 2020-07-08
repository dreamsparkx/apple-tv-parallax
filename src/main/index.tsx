import React, { useRef, useState, useEffect } from 'react';
import { IState, IProps } from './index.types';
import { RootDiv } from './components/rootDiv';
import { InnerDiv } from './components/innerDiv';
import { ShadowDiv } from './components/shadowDiv';
import { LayersDiv } from './components/layersDiv';
import { RenderedLayer } from './components/renderedLayer';
import { ShineDiv } from './components/shineDiv';

const Parallax: React.FunctionComponent<IProps> = (props: IProps) => {
    const { layers = [], isStatic = false, className = '', style = {} } = props;
    const [state, setState] = useState<IState>({
        rootElemWidth: 0,
        rootElemHeight: 0,
        isOnHover: false,
        container: {},
        shine: {},
        layers: [],
    });
    const rootRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!isStatic) {
            setState({
                ...state,
                rootElemWidth:
                    rootRef.current.clientWidth || rootRef.current.offsetWidth || rootRef.current.scrollWidth,
                rootElemHeight:
                    rootRef.current.clientHeight || rootRef.current.offsetHeight || rootRef.current.scrollHeight,
            });
        }
    }, []);
    const renderShine = () => (
        <ShineDiv
            style={{
                background: state.shine.background,
            }}
        />
    );
    const renderShadow = () => <ShadowDiv isOnHover={state.isOnHover} />;
    const renderLayers = () => (
        <LayersDiv>
            {layers &&
                layers.map((imgSrc: string, idx: number) => (
                    <RenderedLayer
                        url={imgSrc}
                        key={idx}
                        style={{
                            ...(state.layers[idx] ? state.layers[idx] : {}),
                        }}
                    />
                ))}
        </LayersDiv>
    );
    const handleMove = ({ pageX, pageY }) => {
        if (isStatic) {
            return;
        }
        const { rootElemWidth, rootElemHeight } = state;
        const layersCount = layers.length;
        const bodyScrollTop = document.body.scrollTop || document.getElementsByTagName('html')[0].scrollTop;
        const bodyScrollLeft = document.body.scrollLeft;
        const offsets = rootRef.current.getBoundingClientRect();
        const wMultiple = 320 / rootElemWidth;
        const offsetX = 0.52 - (pageX - offsets.left - bodyScrollLeft) / rootElemWidth; // cursor position X
        const offsetY = 0.52 - (pageY - offsets.top - bodyScrollTop) / rootElemHeight; // cursor position Y
        const dy = pageY - offsets.top - bodyScrollTop - rootElemHeight / 2; // center Y of container
        const dx = pageX - offsets.left - bodyScrollLeft - rootElemWidth / 2; // center X of container
        const yRotate = (offsetX - dx) * (0.07 * wMultiple); // rotation for container Y
        const xRotate = (dy - offsetY) * (0.1 * wMultiple); // rotation for container X
        const arad = Math.atan2(dy, dx); // angle between cursor and center of container in RAD
        const rawAngle = (arad * 180) / Math.PI - 90; // convert rad to degrees
        const angle = rawAngle < 0 ? rawAngle + 360 : rawAngle;
        setState({
            ...state,
            container: {
                transform:
                    `rotateX(${xRotate}deg) rotateY(${yRotate}deg)` +
                    (state.isOnHover ? ' scale3d(1.07,1.07,1.07)' : ''),
            },
            shine: {
                background: `linear-gradient(${angle}deg, rgba(255, 255, 255, ${
                    ((pageY - offsets.top - bodyScrollTop) / rootElemHeight) * 0.4
                }) 0%, rgba(255, 255, 255, 0) 80%)`,
                transform: `translateX(${offsetX * layersCount - 0.1}px) translateY(${offsetY * layersCount - 0.1}px)`,
            },
            layers: layers.map((_, idx) => ({
                transform: `translateX(${offsetX * (layersCount - idx) * ((idx * 2.5) / wMultiple)}px) translateY(${
                    offsetY * layersCount * ((idx * 2.5) / wMultiple)
                }px)`,
            })),
        });
    };
    const handleEnter = () => {
        if (isStatic) {
            return;
        }
        setState({ ...state, isOnHover: true });
    };
    const handleLeave = () => {
        if (isStatic) {
            return;
        }
        setState({
            ...state,
            isOnHover: false,
            container: {},
            shine: {},
            layers: [],
        });
    };
    const handleTouchMove = (evt: React.TouchEvent<HTMLDivElement>) => {
        evt.preventDefault();
        if (isStatic) {
            return;
        }
        const { pageX, pageY } = evt.touches[0];
        handleMove({ pageX, pageY });
    };
    return (
        <RootDiv
            ref={rootRef}
            rootElemWidth={state.rootElemWidth}
            style={{
                ...style,
            }}
            className={className}
            data-testid="root-div"
            onMouseMove={(event: React.MouseEvent) => {
                handleMove({
                    pageX: event.pageX,
                    pageY: event.pageY,
                });
            }}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onTouchMove={handleTouchMove}
            onTouchStart={handleEnter}
            onTouchEnd={handleLeave}
        >
            <InnerDiv
                style={{
                    ...state.container,
                }}
            >
                {renderShadow()}
                {renderLayers()}
                {renderShine()}
            </InnerDiv>
        </RootDiv>
    );
};
export default Parallax;
