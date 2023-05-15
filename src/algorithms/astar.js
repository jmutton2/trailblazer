export function astar(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    let unvisitedNodes = getAStarDistance(getAllNodes(grid), finishNode);

    while (unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();

        if (closestNode.isWall) {
            continue;
        }

        if (closestNode.distance === Infinity) {
            return visitedNodesInOrder;
        }

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);

        if (closestNode === finishNode) {
            return visitedNodesInOrder;
        }

        updateUnvisitedNeighbors(closestNode, grid);
    }
}
function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort(
        (nodeA, nodeB) =>
            nodeA.distance +
            nodeA.aStarDistance -
            (nodeB.distance + nodeB.aStarDistance)
    );
    let temp = [];
    for (let i = 0; i < 100; i++) {
        temp.push(unvisitedNodes[i].aStarDistance + unvisitedNodes[i].distance);
    }
}

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

    for (let neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;

    if (row > 0) {
        neighbors.push(grid[row - 1][col]);
    }
    if (row < grid.length - 1) {
        neighbors.push(grid[row + 1][col]);
    }
    if (col > 0) {
        neighbors.push(grid[row][col - 1]);
    }
    if (col < grid[0].length - 1) {
        neighbors.push(grid[row][col + 1]);
    }

    return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function getAllNodes(grid) {
    const nodes = [];

    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }

    return nodes;
}

function getAStarDistance(nodesList, endNode) {
    for (let i = 0; i < nodesList.length; i++) {
        nodesList[i].aStarDistance = Math.sqrt(
            (endNode.col - nodesList[i].col) ** 2 +
                (endNode.row - nodesList[i].row) ** 2
        );
    }

    return nodesList;
}
