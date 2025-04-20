const prompt = require('prompt-sync')({sigint: true});

enum SquareState {
  Empty
}

enum LinkState {
  Wall,
  Path
}

enum LinkDirection {
  Horizontal,
  Vertical,
  Diagonal
}

// enum Direction {
//   Up,
//   Down,
//   Left,
//   Right,
// }

type MazeNavigator = {
  currentSquare:Square
  pathsToExclude:Link[]
}

const getRandom = (choices:number) => {
  return Math.floor(Math.random()*choices);
}

class Square {
  // #explored:boolean=false
  #deadEnd:boolean=false
  #row:number
  #column:number
  #state:SquareState
  #links:Link[]
  
  constructor(row:number, column:number) {
    this.#row = row;
    this.#column = column;
    this.#state = SquareState.Empty;
    this.#links = []
  }

  draw() {
    if (this.deadEnd){
      return "*"
    } else if (this.#state === SquareState.Empty){
      return " "
    }
  }

  drawGraph() {
  //drawGraph(currentPosition:Square|undefined) {
    // if (this===currentPosition) {
    //   return "X"
    // } else if (this.#explored){
    //   return "o"
    // } else 
    if (this.#state === SquareState.Empty){
      return "."
    }
  }

  get row() {
    return this.#row;
  }

  get column() {
    return this.#column;
  }

  get links() {
    return this.#links;
  }

  get coordinates() {
    return `(${this.row}, ${this.column})`;
  }

  // set explored(explored:boolean) {
  //   this.#explored = explored;
  // }

  get deadEnd() {
    return this.paths.length===1;
  }

  addLink(link:Link) {
    this.#links.push(link);
  }

  get paths() {
    return this.#links.filter(link=>link.state===LinkState.Path);
  }

  getRandomPath({exclude}:{exclude:Link[]}={exclude:[]}) {
    
    const options:Link[] = this.paths.filter(link=>!exclude.includes(link));

    if (options.length===0) {
      return null;
    } else {
      return options[getRandom(options.length)];
    }
      
  }

}

class Link {
  #a:Square
  #b:Square
  #state:LinkState
  #direction:LinkDirection

  constructor(a:Square,b:Square) {
    this.#a = a;
    this.#b = b;
    this.#a.addLink(this);
    this.#b.addLink(this);
    this.#state = LinkState.Path;
    if (a.row === b.row && a.column !== b.column ) {
      this.#direction = LinkDirection.Horizontal;
    } else if (a.row !== b.row && a.column === b.column ) {
      this.#direction = LinkDirection.Vertical;
    } else {
      this.#direction = LinkDirection.Diagonal;
    }
  }

  get coordinates() {
    return `${this.#a.coordinates} -> ${this.#b.coordinates}`
  }

  drawGraph() {
    if (this.#state === LinkState.Path){
      if (this.#direction === LinkDirection.Horizontal){
        return "_";
      } else if (this.#direction === LinkDirection.Vertical){
        return "|";
      } else {
        return " ";
      }
    } else {
      return " ";
    }
  }

  draw() {
    if (this.#state === LinkState.Wall){
      if (this.#direction === LinkDirection.Horizontal){
        return "|";
      } else if (this.#direction === LinkDirection.Vertical){
        return "_";
      }
    } else {
      return " ";
    }
  }

  get state() {
    return this.#state;
  }

  set state(state:LinkState) {
    this.#state = state;
  }

  travelAlongPath({currentSquare}:{currentSquare:Square}) {
    if (this.#state===LinkState.Path) {
      if (currentSquare===this.#a) {
        return this.#b;
      } else if (currentSquare===this.#b) {
        return this.#a;
      } 
    }

    return currentSquare;
  }
}

class MazeMap {
  // #position: Square | undefined
  #width: number
  #height: number
  #squares: Square[][]
  #paths: {
    x:Link[][]
    y:Link[][]
  }

  constructor(width:number=8,height:number=8) {
    this.#width = width;
    this.#height = height;
    this.#squares = [];
    this.#paths = {x:[],y:[]};

    for (let i=0;i<height;i++) {
      this.#squares[i] = [];
      for (let j=0;j<width;j++) {
        this.#squares[i][j] = new Square(i,j);
      }
    }

    for (let i=0;i<height;i++) {
      this.#paths.x[i] = [];
      for (let j=0;j<width-1;j++) {
        this.#paths.x[i][j] = new Link(this.#squares[i][j],this.#squares[i][j+1])
      }
    }

    for (let i=0;i<height-1;i++) {
      this.#paths.y[i] = [];
        for (let j=0;j<width;j++) {
        this.#paths.y[i][j] = new Link(this.#squares[i][j],this.#squares[i+1][j])
      }
    }

    this.#generateMaze();
  }

  get deadEnds() {
    let output:Square[] = [];
    for (let i=0;i<this.#height;i++) {
      for (let j=0;j<this.#width;j++) {
        if (this.#squares[i][j].deadEnd) {
          output.push(this.#squares[i][j]);
        }
      }
    }
    return output;
  }

  drawGraph() {
    let output = "\n";

    for (let i=0;i<this.#height;i++) {

      let rows = "";
      let columns = "";

      for (let j=0;j<this.#width;j++) {
        
        rows += this.#squares[i][j].drawGraph()

        if (j<this.#width-1) {
          rows += this.#paths.x[i][j].drawGraph();
        }
          
        if (i<this.#height-1) {
          columns += this.#paths.y[i][j].drawGraph();
        }

        if (j<this.#width-1 && i<this.#height-1) {
          columns += " ";
        }
      }

      output += `${rows}\n${columns}\n`

    }
    return output;
  }

  draw() {
    let output = "\n.";

    for (let i=0;i<this.#width;i++) {
      output += "-."
    }

    output += "\n"

    for (let i=0;i<this.#height;i++) {

      let rows = "";
      let columns = "";

      for (let j=0;j<this.#width;j++) {
        
        rows += this.#squares[i][j].draw()

        if (j<this.#width-1) {
          rows += this.#paths.x[i][j].draw();
        }
          
        if (i<this.#height-1) {
          columns += this.#paths.y[i][j].draw();
        } else {
          columns += "-";
        }

        if (j<this.#width-1) {
          columns += ".";
        }


      }



      output += `|${rows}|\n.${columns}.\n`

    }
    return output;
  }

  #generateMaze() {
    let row = getRandom(this.#height);
    let col = getRandom(this.#width);

    let navigator:MazeNavigator = {
      currentSquare: this.#squares[row][col],
      pathsToExclude: [],
    }

    // this.#position = navigator.currentSquare;

    let exploredSquares:Square[] = [navigator.currentSquare];
    //navigator.currentSquare.explored = true;

    let pathTrail:MazeNavigator[] = []

    let explorationComplete = false;

    while (!explorationComplete) {
      let randomPath = navigator.currentSquare.getRandomPath({exclude:navigator.pathsToExclude});
      if (randomPath !== null) {
        let newSquare = randomPath.travelAlongPath({currentSquare:navigator.currentSquare});
        if (exploredSquares.includes(newSquare)) {
          randomPath.state = LinkState.Wall;          
        } else {
          //newSquare.explored = true;
          navigator.pathsToExclude.push(randomPath);
          pathTrail.push({...navigator});
          exploredSquares.push(newSquare);
          navigator = {
            currentSquare: newSquare,
            pathsToExclude: [randomPath]
          }
          // this.#position = navigator.currentSquare;
        }
      } else {
        if (pathTrail.length === 0) {
          explorationComplete = true;
        } else {
          navigator = pathTrail.pop();

          // this.#position = navigator.currentSquare;
        }
      }

      // console.log(maze.drawGraph());

      // console.log("currentSquare; ",navigator.currentSquare.coordinates);

      // console.log("pathsToExclude: [")

      // for (const path of navigator.pathsToExclude) {
      //   console.log(path.coordinates,",");
      // }

      // console.log("]")

      // prompt('Continue?: ');

    }
    
  }
}

const maze = new MazeMap(30,14);

console.log(maze.drawGraph());

console.log(maze.draw());

console.log(maze.deadEnds.length," dead ends");