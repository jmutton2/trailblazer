import React, { useEffect, useState } from "react";

import Node from "./node";

const createNode = (col, row) => {
    return 0;
};

const createEmptyGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

const Grid = () => {
    const [grid, setGrid] = useState([]);
    const [mouseDown, setMouseDown] = useState(false);

    const handleMouseDown = () => {
        setMouseDown(!mouseDown);
    };

    useEffect(() => {
        const grid = createEmptyGrid();
        setGrid(grid);
    }, []);

    return (
        <div className="flex flex-col justify-evenly items-center h-[90%] w-full">
            {grid.length > 2 ? (
                grid.map((row, rowIndex) => (
                    <div className="flex flex-row justify-evenly items-center h-full w-full">
                        {row.map((col, colIndex) => {
                            console.log("here", rowIndex, colIndex);
                            return rowIndex == 10 && colIndex == 5 ? (
                                <Node
                                    isWall={false}
                                    isStart={true}
                                    isEnd={false}
                                    mouseDown={mouseDown}
                                    handleMouseDown={() => handleMouseDown()}
                                />
                            ) : (
                                <Node
                                    mouseDown={mouseDown}
                                    handleMouseDown={() => handleMouseDown()}
                                />
                            );
                        })}
                    </div>
                ))
            ) : (
                <div>loading...</div>
            )}
        </div>
    );
};

export default Grid;
