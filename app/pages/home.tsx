import * as THREE from "three"
import ReactDOM from "react-dom"
import React, { useRef, useEffect, MutableRefObject } from "react"
import { Canvas, useFrame } from "react-three-fiber"
import { Block, useBlock } from "./blocks"
import state from "./store"
import { ResizeObserver } from '@juggle/resize-observer'
import useMeasure from "react-use/lib/useMeasure";

function Plane({ color = "white", ...props }) {
  return (
    <mesh {...props}>
      <planeGeometry />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

function Cross() {
  const ref = useRef()as MutableRefObject<HTMLDivElement>;
  const { viewportHeight } = useBlock()
  useFrame(() => {
    const curTop = state.top.current
    const curY = (ref.current as any).rotation.z
    const nextY = (curTop / ((state.pages - 1) * viewportHeight * state.zoom)) * Math.PI;
    (ref.current as any).rotation.z = THREE.MathUtils.lerp(curY, nextY, 0.1)
  })
  return (
    <group ref={ref} scale={[2, 2, 2]}>
      <Plane scale={[1, 0.2, 0.2]} color="#e2bfca" />
      <Plane scale={[0.2, 1, 0.2]} color="#e2bfca" />
    </group>
  )
}

function Content({ left, children }) {
  const { contentMaxWidth, canvasWidth, margin } = useBlock()
  const aspect = 1.75
  const alignRight = (canvasWidth - contentMaxWidth - margin) / 2
  return (
    <group position={[alignRight * (left ? -1 : 1), 0, 0]}>
      <Plane scale={[contentMaxWidth, contentMaxWidth / aspect, 1]} color="#bfe2ca" />
      {children}
    </group>
  )
}

function Stripe() {
  const { contentMaxWidth } = useBlock()
  return (
    <Plane scale={[100, contentMaxWidth, 1]} rotation={[0, 0, Math.PI / 4]} position={[0, 0, -1]} color="#e3f6f5" />
  )
}

// function useMeasure(arg0: { polyfill: typeof ResizeObserver }): [any, any] {
// 	throw new Error("Function not implemented.")
// }

export default function home() {
  const [ref, bounds] = useMeasure()
  const scrollArea = useRef()
//   const state = { top: { current: number }, zoom: any, pages: number }
  // const state.top: React.MutableRefObject<number>
//   const onScroll = (e: { target: any }) => ((state.top as any).current = e.target.scrollTop)
  const onScroll = e => ((state.top.current as any) = e.target.scrollTop)
  useEffect(() => void onScroll({ target: scrollArea.current }), [])
  return (
    <>
      <Canvas resize={{ polyfill: ResizeObserver }} orthographic camera={{ zoom: state.zoom, position: [0, 0, 500] }}>
        {/* First section */}
        <Block factor={1.5} offset={0}>
          <Content left children={undefined} />
        </Block>
        {/* Second section */}
        <Block factor={2.0} offset={1}>
          <Content left={undefined} children={undefined} />
        </Block>
        {/* Stripe */}
        <Block factor={-1.0} offset={1}>
          <Stripe />
        </Block>
        {/* Last section */}
        <Block factor={1.5} offset={2}>
          <Content left>
              <Cross />
          </Content>
        </Block>
      </Canvas>
      <div className="scrollArea" onScroll={onScroll}>
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  )
}
