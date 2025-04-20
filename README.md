# Maze generator code

## About

A simple maze generator code example, written using Typescript and run using Node.js

## How to Maze Algorithm Works

The aim behind this algorithm is to create a maze in which only one direct path exists between any two points.

The algorithm starts at a random point on a grid and then travels across the grid in random directions. If a square the algorithm will travel to next has been travelled to before, then it has travelled in a loop. The existence of a loop means there are two paths you can follow to reach any other point on that loop. We don't want that to happen, and so a wall is placed along this route to prevent there being a loop.

The algorithm continues exploring all unexplored paths, putting up walls along the way, until it runs out of paths to explore and the algorithm is complete.

Using this algorithm generates random paths through the grid while ensuring that 
1. Every square is reachable from every other square on the grid
2. No loops are created (ensuring that only one direct path exists between any two squares)

The result of this means that wherever you decide to put the start and end point, there will only ever be one route you can follow to solve the maze.

The code for generating the maze can be found on the `#generateMaze()` method of the `MazeMap` class.

### Psuedocode

1.  Create a grid of squares, thinking of each square as if it is a node on a graph
2.  Create an edge between every square and it's directly horizontal and vertical neighbours 
3.  Pick a random square from the grid of squares
4.  Add the square a list of squares that have been visited
5.  Create an empty list which will be used to store the path we follow
6.  Pick a random edge that is connected to this square that is not a wall and hasn't already been travelled along
7.  Are there any random edges left to explore?
    1.  If there are edges left to explore (connected to this square):
        1.  Examine the square at the other side of this edge
        2.  Has this new square been visted before?
            1.  If the new square has been visited before:
                1. Put up a wall on the edge between the current square at the new square
                2. Go back to step 5 from the current square
            2.  If not:
                1. Add the current square to our path list
                2. And now go to step 5 starting from the new square.
    2.  If there are no edges left to explore (connected to this square):
        1. Check to see if you can go backwards (i.e. check if there are still squares on our path list)
            1.  If you can go backwards:
                1.  Pop the last square added to the path list
                2.  Go back to step 5 starting from this square
            2.  If not:
                1. All the edges in the graph have been explored

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

