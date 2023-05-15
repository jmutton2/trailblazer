import React, { useEffect, useState } from "react";
import { dijkstra } from "../algorithms/dijkstra.js";
import { astar } from "../algorithms/astar.js";
import { getNodesInShortestPathOrder } from "../algorithms/backtracking.js";

import Node from "./node";

let START_NODE_ROW = 10;
let START_NODE_COL = 5;
let FINISH_NODE_ROW = 2;
let FINISH_NODE_COL = 47;

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        aStarDistance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};

const createEmptyGrid = (rows = 20, cols = 50) => {
    const grid = [];
    for (let row = 0; row < rows; row++) {
        const currentRow = [];
        for (let col = 0; col < cols; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

const addWallToGrid = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};

const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(
                `node-${node.row}-${node.col}`
            ).className = `${
                document.getElementById(`node-${node.row}-${node.col}`)
                    .className
            } animate-node-quickest bg-tertiary`;
        }, 50 * i);
    }
};

const visualize = (inOrderVisitedNodes, nodesInShortestPathOrder) => {
    for (let i = 1; i < inOrderVisitedNodes.length; i++) {
        let node = inOrderVisitedNodes[i];

        if (i === inOrderVisitedNodes.length - 1) {
            setTimeout(() => {
                animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
        }

        setTimeout(() => {
            document.getElementById(
                `node-${node.row}-${node.col}`
            ).className = `${
                document.getElementById(`node-${node.row}-${node.col}`)
                    .className
            } animate-node-visited bg-secondary`;
        }, i * 9);
    }
};

const calculateDijkstra = (matrix) => {
    let grid = matrix;
    let startNode = grid[START_NODE_ROW][START_NODE_COL];
    let endNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let inOrderVisitedNodes = dijkstra(grid, startNode, endNode);
    let nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    visualize(inOrderVisitedNodes, nodesInShortestPathOrder);
};

const calculateAStar = (matrix) => {
    let grid = matrix;
    let startNode = grid[START_NODE_ROW][START_NODE_COL];
    let endNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let inOrderVisitedNodes = astar(grid, startNode, endNode);
    let nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    visualize(inOrderVisitedNodes, nodesInShortestPathOrder);
};

const Grid = () => {
    const [grid, setGrid] = useState([]);
    const [mouseDown, setMouseDown] = useState(false);

    const handleMouseDown = (row, col) => {
        setGrid(addWallToGrid(grid, row, col));
        setMouseDown(!mouseDown);
    };

    const handleMouseUp = () => {
        setMouseDown(false);
    };

    const handleMouseHover = (row, col) => {
        if (!mouseDown) {
            return;
        }
        setGrid(addWallToGrid(grid, row, col));
    };

    const clearBoard = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const cols = Math.floor(screenWidth / 40); // assuming 25px width
        const rows = Math.floor(screenHeight / 40); // assuming 25px height

        START_NODE_ROW = Math.floor(rows / 2);
        START_NODE_COL = Math.floor(cols / 5);
        FINISH_NODE_ROW = Math.floor(rows / 2);
        FINISH_NODE_COL = cols - START_NODE_COL;

        const grid = createEmptyGrid(rows, cols);
        setGrid(grid);

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                let node = document.getElementById(`node-${i}-${j}`).classList;

                node.remove("animate-node-quickest");
                node.remove("bg-tertiary");
                node.remove("animate-node-visited");
                node.remove("bg-secondary");
                node.remove("bg-secondary_dark");
                node.remove("animate-node-clicked");
            }
        }
    };

    useEffect(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const cols = Math.floor(screenWidth / 40); // assuming 25px width
        const rows = Math.floor(screenHeight / 40); // assuming 25px height

        START_NODE_ROW = Math.floor(rows / 2);
        START_NODE_COL = Math.floor(cols / 5);
        FINISH_NODE_ROW = Math.floor(rows / 2);
        FINISH_NODE_COL = cols - START_NODE_COL;

        const grid = createEmptyGrid(rows, cols);
        setGrid(grid);
    }, []);

    return (
        <div className="">
            <div className="flex flex-col justify-center h-[10%] w-full">
                <div className="flex flex-row px-10 justify-between items-center bg-secondary_dark top-0">
                    <h1 className="flex justify-center items-center text-white bold text-[40px]">
                        Trailblazer
                    </h1>
                    <div className="flex justify-between w-[50%] items-center px-20">
                        <button
                            onClick={() => calculateDijkstra(grid)}
                            className="items-center h-[50px] bg-secondary hover:bg-secondary_dark text-black font-bold py-2 px-4 border-b-4 border-secondary_dark hover:border-secondary_dark rounded hover:text-white"
                        >
                            Compute Dijkstra!
                        </button>

                        <button
                            onClick={() => calculateAStar(grid)}
                            className="items-center h-[50px] bg-secondary hover:bg-secondary_dark text-black font-bold py-2 px-4 border-b-4 border-secondary_dark hover:border-secondary_dark rounded hover:text-white"
                        >
                            Compute A*!
                        </button>
                        <button
                            onClick={() => clearBoard()}
                            className="items-center h-[50px] bg-secondary hover:bg-secondary_dark text-black font-bold py-2 px-4 border-b-4 border-secondary_dark hover:border-secondary_dark rounded hover:text-white"
                        >
                            Clear Board!
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1  h-[90%] w-full p-5">
                {grid.length > 2 ? (
                    grid.map((row, rowIndex) => (
                        <div
                            className="flex flex-row justify-evenly items-center h-full w-full"
                            key={rowIndex}
                        >
                            {row.map((col, colIndex) => {
                                return (
                                    <Node
                                        key={
                                            "node-" + rowIndex + "-" + colIndex
                                        }
                                        col={col.col}
                                        row={col.row}
                                        isWall={col.isWall}
                                        isStart={col.isStart}
                                        isEnd={col.isFinish}
                                        handleMouseHover={(row, col) =>
                                            handleMouseHover(row, col)
                                        }
                                        handleMouseDown={(row, col) =>
                                            handleMouseDown(row, col)
                                        }
                                        handleMouseUp={() => handleMouseUp()}
                                    />
                                );
                            })}
                        </div>
                    ))
                ) : (
                    <div>loading...</div>
                )}
            </div>
        </div>
    );
};

export default Grid;
