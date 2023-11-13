// This is a brute force approach to loading block svgs to React components
// and should be refactored to use dynamic import and svg loading

/// <reference types="vite-plugin-svgr/client" />
import Block_0 from "../../assets/blocks/block_0.svg?react"
import Block_1 from "../../assets/blocks/block_1.svg?react"
import Block_2 from "../../assets/blocks/block_2.svg?react"
import Block_3 from "../../assets/blocks/block_3.svg?react"
import Block_4 from "../../assets/blocks/block_4.svg?react"
import Block_5 from "../../assets/blocks/block_5.svg?react"
import Block_6 from "../../assets/blocks/block_6.svg?react"
import Block_7 from "../../assets/blocks/block_7.svg?react"
import Block_8 from "../../assets/blocks/block_8.svg?react"
import Block_9 from "../../assets/blocks/block_9.svg?react"
import Block_10 from "../../assets/blocks/block_10.svg?react"
import Block_11 from "../../assets/blocks/block_11.svg?react"
import Block_12 from "../../assets/blocks/block_12.svg?react"
import Block_13 from "../../assets/blocks/block_13.svg?react"
import Block_14 from "../../assets/blocks/block_14.svg?react"
import Block_15 from "../../assets/blocks/block_15.svg?react"
import Block_16 from "../../assets/blocks/block_16.svg?react"
import Block_17 from "../../assets/blocks/block_17.svg?react"
import Block_18 from "../../assets/blocks/block_18.svg?react"
import Block_19 from "../../assets/blocks/block_19.svg?react"
import Block_20 from "../../assets/blocks/block_20.svg?react"
import Block_21 from "../../assets/blocks/block_21.svg?react"
import Block_22 from "../../assets/blocks/block_22.svg?react"
import Block_23 from "../../assets/blocks/block_23.svg?react"
import Block_24 from "../../assets/blocks/block_24.svg?react"

interface BlockProps {
  id: number
}

function Block({ id }: BlockProps) {
  switch (id) {
    case 0:
      return <Block_0 />
    case 1:
      return <Block_1 />
    case 2:
      return <Block_2 />
    case 3:
      return <Block_3 />
    case 4:
      return <Block_4 />
    case 5:
      return <Block_5 />
    case 6:
      return <Block_6 />
    case 7:
      return <Block_7 />
    case 8:
      return <Block_8 />
    case 9:
      return <Block_9 />
    case 10:
      return <Block_10 />
    case 11:
      return <Block_11 />
    case 12:
      return <Block_12 />
    case 13:
      return <Block_13 />
    case 14:
      return <Block_14 />
    case 15:
      return <Block_15 />
    case 16:
      return <Block_16 />
    case 17:
      return <Block_17 />
    case 18:
      return <Block_18 />
    case 19:
      return <Block_19 />
    case 20:
      return <Block_20 />
    case 21:
      return <Block_21 />
    case 22:
      return <Block_22 />
    case 23:
      return <Block_23 />
    case 24:
      return <Block_24 />
  }
}

export default Block
