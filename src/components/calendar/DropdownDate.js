import classes from "./DropdownDate.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const variants = {
    closed: { opacity: 0, position: "absolute", pointerEvents: "none", background: "white", width: "100%", y: 0 },
    open: { opacity: 1, pointerEvents: "all", background: "white", width: "100%", y:20 }
}

const DropdownDate = (props) => {

    const { isOpen } = props;


    return (
        <AnimatePresence>
            {isOpen && <motion.ul
            initial={"closed"}
            animate={isOpen ? "open" : "closed"}
            variants={variants}
            exit={"closed"}
            >
                <li>2011</li>
                <li>2012</li>
                <li>2013</li>
                <li>2014</li>
                <li>2015</li>
                <li>2016</li>
                <li>2017</li>
                <li>2018</li>
            </motion.ul>}
        </AnimatePresence>
    )
}

export default DropdownDate;