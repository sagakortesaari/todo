import React from 'react'
import {motion} from 'framer-motion'

export default function Color({ color, clicked, startingpos, handler, id }) {
    const variants = {
        visible: {opacity: 1, y:10},
        hidden: {opacity: 0, y:-57*startingpos}
    }

    return (
        <motion.button whileHover = {{scale: 1.2}} animate={clicked ? "visible":"hidden"} onClick={() => handler(color)} initial="hidden" variants={variants} className="color" style={{backgroundColor:color}}></motion.button>
    )
}
