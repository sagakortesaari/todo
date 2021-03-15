import React from 'react'
import {motion} from 'framer-motion'

export default function Color({ color, clicked, startingpos, handler }) {
    const variants = {
        visible: {opacity: 1, y:10},
        hidden: {opacity: 0, y:-57*startingpos}
    }

    // initial="hidden" animate="visible" variants={variants}
    // clicked ? "visible":"hidden"
    // animate={clicked ? "visible":"hidden"} initial="hidden" variants={variants}
    return (
        <motion.button whileHover = {{scale: 1.2}} animate={clicked ? "visible":"hidden"} onClick={() => handler(color)} initial="hidden" variants={variants} className="color" style={{backgroundColor:color}}></motion.button>
    )
}
