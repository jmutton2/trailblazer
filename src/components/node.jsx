import React, { useEffect, useState } from "react";

const Node = ({
    row,
    col,
    isWall,
    isStart,
    isEnd,
    handleMouseHover,
    handleMouseDown,
    handleMouseUp,
}) => {
    let specialStyles = isWall
        ? "bg-secondary_dark animate-node-clicked"
        : isStart
        ? "bg-start-node bg-contain bg-no-repeat bg-center"
        : isEnd
        ? "bg-end-node bg-contain bg-no-repeat bg-center"
        : "";

    return (
        <div
            onMouseUpCapture={() => handleMouseUp()}
            onMouseEnter={() => handleMouseHover(row, col)}
            onMouseDownCapture={(e) => {
                handleMouseDown(e);
            }}
            id={`node-${row}-${col}`}
            className={`${specialStyles} h-[100%] w-full outline outline-[1px] outline-primary_dark inline-block`}
        ></div>
    );
};

export default Node;
