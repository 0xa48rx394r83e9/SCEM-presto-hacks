import { createRef } from "react"

// const createRef = useRef<HTMLInputElement | null>(null)

const state = {
  sections: 3,
  pages: 3,
  zoom: 75,
  top: createRef(),
  dangerouslyAllowMutability: true,
}

export default state
