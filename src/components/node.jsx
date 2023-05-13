import React, { useEffect, useState } from "react";
import "./node.css";

const Node = ({ isWall, isStart, isEnd, mouseDown, handleMouseDown }) => {
    const [colorClass, setColorClass] = useState("bg-primary");
    const [animationClass, setAnimationClass] = useState("");
    const [state, setState] = useState({
        isWall: false,
        isStart: false,
        isEnd: false,
    });

    useEffect(() => {
        setState({ isWall, isStart, isEnd });
    }, []);

    const handleHover = (e, clicked = false) => {
        e.preventDefault();

        if (mouseDown || clicked) {
            if (colorClass == "bg-primary") {
                setColorClass("bg-secondary_dark");
                setAnimationClass("animate-node-clicked");
            } else {
                setColorClass("bg-primary");
                setAnimationClass("animate-node-unclicked");
            }
        }
    };

    return (
        <div
            onMouseEnter={(e) => handleHover(e)}
            onClick={(e) => {
                handleMouseDown(e);
                handleHover(e, true);
            }}
            className={`${colorClass} ${animationClass} ${
                isStart ? "bg-tertiary opacity-[50%]" : colorClass
            } h-[100%] w-full outline outline-[1px] outline-primary_dark inline-block`}
        ></div>
    );
};

export default Node;
