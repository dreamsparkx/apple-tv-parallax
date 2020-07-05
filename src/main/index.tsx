import React, { createRef } from 'react';
import { IState, IProps } from './index.types';
import { RootDiv } from './components/rootDiv';
import { InnerDiv } from './components/innerDiv';
import { ShadowDiv } from './components/shadowDiv';
import { LayersDiv } from './components/layersDiv';
import { RenderedLayer } from './components/renderedLayer';
import { ShineDiv } from './components/shineDiv';

export default class Parallax extends React.Component<IProps, IState> {
    state: IState = {
        rootElemWidth: 0,
        rootElemHeight: 0,
        isOnHover: false,
        container: {},
        shine: {},
        layers: [],
    };
    private rootRef = createRef<HTMLDivElement>();
    componentDidMount(): void {
        if (!this.props.isStatic) {
            this.setState({
                rootElemWidth:
                    this.rootRef.current.clientWidth ||
                    this.rootRef.current.offsetWidth ||
                    this.rootRef.current.scrollWidth,
                rootElemHeight:
                    this.rootRef.current.clientHeight ||
                    this.rootRef.current.offsetHeight ||
                    this.rootRef.current.scrollHeight,
            });
        }
    }
    handleMove = ({ pageX, pageY }) => {
        const { layers = [], isStatic = false } = this.props;
        if (isStatic) {
            return;
        }
        const { rootElemWidth, rootElemHeight } = this.state;
        const layersCount = layers.length;
        const bodyScrollTop = document.body.scrollTop || document.getElementsByTagName('html')[0].scrollTop;
        const bodyScrollLeft = document.body.scrollLeft;
        const offsets = this.rootRef.current.getBoundingClientRect();
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
        this.setState({
            container: {
                transform:
                    `rotateX(${xRotate}deg) rotateY(${yRotate}deg)` +
                    (this.state.isOnHover ? ' scale3d(1.07,1.07,1.07)' : ''),
            },
            shine: {
                background: `linear-gradient(${angle}deg, rgba(255, 255, 255, ${
                    ((pageY - offsets.top - bodyScrollTop) / rootElemHeight) * 0.4
                }) 0%, rgba(255, 255, 255, 0) 80%)`,
                transform: `translateX(${offsetX * layersCount - 0.1}px) translateY(${offsetY * layersCount - 0.1}px)`,
            },
            layers: this.props.layers.map((_, idx) => ({
                transform: `translateX(${offsetX * (layersCount - idx) * ((idx * 2.5) / wMultiple)}px) translateY(${
                    offsetY * layersCount * ((idx * 2.5) / wMultiple)
                }px)`,
            })),
        });
    };
    handleEnter = () => {
        const { isStatic = false } = this.props;
        if (isStatic) {
            return;
        }
        this.setState({ isOnHover: true });
    };
    handleLeave = () => {
        const { isStatic = false } = this.props;
        if (isStatic) {
            return;
        }
        this.setState({
            isOnHover: false,
            container: {},
            shine: {},
            layers: [],
        });
    };
    handleTouchMove = (evt: React.TouchEvent<HTMLDivElement>) => {
        evt.preventDefault();
        const { isStatic = false } = this.props;
        if (isStatic) {
            return;
        }
        const { pageX, pageY } = evt.touches[0];
        this.handleMove({ pageX, pageY });
    };
    renderShadow = () => <ShadowDiv isOnHover={this.state.isOnHover} />;
    renderLayers = () => (
        <LayersDiv>
            {this.props.layers &&
                this.props.layers.map((imgSrc: string, idx: number) => (
                    <RenderedLayer
                        url={imgSrc}
                        key={idx}
                        style={{
                            ...(this.state.layers[idx] ? this.state.layers[idx] : {}),
                        }}
                    />
                ))}
        </LayersDiv>
    );
    renderShine = () => (
        <ShineDiv
            style={{
                background: this.state.shine.background,
            }}
        />
    );
    render() {
        const { style = {}, isStatic = false, className = '' } = this.props;
        const { container } = this.state;
        return (
            <RootDiv
                ref={this.rootRef}
                rootElemWidth={this.state.rootElemWidth}
                style={{
                    ...style,
                }}
                className={className}
                onMouseMove={(event: React.MouseEvent) => {
                    this.handleMove({
                        pageX: event.pageX,
                        pageY: event.pageY,
                    });
                }}
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
                onTouchMove={this.handleTouchMove}
                onTouchStart={this.handleEnter}
                onTouchEnd={this.handleLeave}
                data-testid="root-div"
            >
                <InnerDiv
                    style={{
                        ...container,
                    }}
                >
                    {this.renderShadow()}
                    {this.renderLayers()}
                    {this.renderShine()}
                </InnerDiv>
            </RootDiv>
        );
    }
}
