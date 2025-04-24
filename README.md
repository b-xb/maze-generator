# Maze generator code

## Summary

A simple maze generator code example, written using Typescript and run using Node.js

## How the Maze Algorithm Works

The aim behind this algorithm is to generate a maze in which there is only one direct path between any two squares on the grid.

The algorithm starts at a random square on a grid, and then travels around the grid (randomly) along previously unexplored connections between adjacent squares. If, while travelling along a path, the algorithm ends up at a square that it has visited before, then this means that the algorithm has travelled in a loop. The existence of a path that loops back to a previously visited square means that two paths can be followed to reach any other square on that loop. We don't want that to happen, and so the last connection travelled along is blocked with a wall, removing the looping path from the grid.

The algorithm will continues exploring all unexplored paths, putting up walls along the way, until it runs out of paths to explore and the algorithm is complete.

Using this algorithm generates random paths throughout the grid while ensuring that:
1. Every square is reachable from every other square on the grid
2. No loops are created (ensuring that only one direct path exists between any two squares)

The result of this means that wherever you decide to put the start and end point, there will only ever be one path you can follow to solve the maze.

The code for generating the maze can be found on the `#generateMaze()` method of the `MazeMap` class.

### Pseudocode

The current algorithm that is implemented uses a depth-first approach when exploring the graph tree.

1.  Create a grid of squares, thinking of each square as if it is a node on a graph
2.  Create an edge between every square and it's directly horizontal and vertical neighbours 
3.  Pick a random square from the grid of squares
4.  Add this square to a list of squares that have been visited already
5.  Create an empty list which will be used to store the path we follow
6.  Pick a random edge connected to this square that is not a wall and hasn't already been travelled along
7.  Was a random edge found?
    1.  If an edge was found:
        1.  Examine the square at the other side of this edge
        2.  Has this new square been visted before?
            1.  If the new square has been visited before:
                1. Put up a wall on the edge between the current square and the new square
                2. Go back to step 5 from the current square
            2.  If not:
                1. Add the current square to our path list
                2. And now go to step 5 starting from the new square
    2.  If an edge was not found:
        1. Check to see if you can go backwards (i.e. check if there are still squares on our path list)
            1.  If you can go backwards:
                1.  Pop the last square added to the path list
                2.  Go back to step 5 starting from this square
            2.  If not:
                1. All the edges in the graph have been explored

Other alternative algorithm options could be added that take a breadth-first approach instead, or have a completely randomised search priority.

## How to run this code

### Prerequisites

Stuff you need to install first

- node
- pnpm (or some other package manager like npm)

### What next?

After cloning the repository do the following...

1.  Install dependencies

    ```
    #npm
    npm install

    #pnpm
    pnpm install
    ```

2.  Run the code

    ```
    #npm
    npm run start

    #pnpm
    pnpm start
    ```

