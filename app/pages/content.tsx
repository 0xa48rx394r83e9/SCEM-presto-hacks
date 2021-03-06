import UserInfo from "app/core/components/UserInfo"
import { Link } from "blitz"
import { Box, useAspect } from "@react-three/drei"
//import { Box, useAspect } from "drei"
import React, { Suspense, useRef } from "react"
import { useFrame, useThree } from "react-three-fiber"
import { Flex } from "react-three-flex"
import * as THREE from "three"
import DarkMode from "app/core/components/DarkMode"

function Content() {
  return (
    // <div className="demo-content ">
    <div className="flex flex-col items-end text-center mt-96">
      <div>
        {/* <div className="logo">
            <img src="/logo.png" alt="blitz.js" /> */}
        {/* </div> */}
        <p>
          <strong>Congrats!</strong> Your app is ready, including user sign-up and log-in.
        </p>
        <DarkMode />
        <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Content
