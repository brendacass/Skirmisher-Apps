import React from 'react'
import PropTypes from 'prop-types'
import {Layer, Rect, Stage, Group} from 'react-konva';

class TavernRect{
  constructor(x,y,width,height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.corners = {
      topLeft:{x:x,y:y},
      topRight:{x:x+width,y:y},
      bottomLeft:{x:x,y:y+height},
      bottomRight:{ x:x+width,y:y+height}
    }
    this.neighbors = [];
  }

  contains(otherRect){
    return (otherRect.corners.topLeft.x >= this.corners.topLeft.x
      && otherRect.corners.topLeft.y >= this.corners.topLeft.y
      && otherRect.corners.topRight.x <= this.corners.topRight.x
      && otherRect.corners.topRight.y >= this.corners.topRight.y
      && otherRect.corners.bottomLeft.x >= this.corners.bottomLeft.x
      && otherRect.corners.bottomLeft.y <= this.corners.bottomLeft.y
      && otherRect.corners.bottomRight.x <= this.corners.bottomRight.x
      && otherRect.corners.bottomRight.y <= this.corners.bottomRight.y
    )
  }

  overlaps(otherRect){
    let overlap = false;
    for(let i in otherRect.corners){
      if (otherRect.corners[i].x >= this.corners.topLeft.x
        && otherRect.corners[i].y >= this.corners.topLeft.y
        && otherRect.corners[i].x <= this.corners.topRight.x
        && otherRect.corners[i].y >= this.corners.topRight.y
        && otherRect.corners[i].x >= this.corners.bottomLeft.x
        && otherRect.corners[i].y <= this.corners.bottomLeft.y
        && otherRect.corners[i].x <= this.corners.bottomRight.x
        && otherRect.corners[i].y <= this.corners.bottomRight.y
      )
      {
        overlap = true;
      }
    }
    return overlap
  }

  randomlyPlaceNeighbor(width,height){
    let side = Math.floor(Math.random() * 4)+1
    var x = 0;
    var y = 0;
    var miny = (this.y+this.height/2)-height;
    var maxy = (this.y+this.height/2);
    var minx = (this.x+this.width/2)-width;
    var maxx = (this.x+this.width/2);

    switch(side){
      case 1:
        x = this.x-width;
        y = Math.random() * (maxy-miny)+miny

        break;
      case 2:
        x = Math.random() * (maxx-minx)+minx
        y = this.y-height;
        break;
      case 3:
        x = this.x+this.width;
        y = Math.random() * (maxy-miny)+miny
        break;
      case 4:
        x = Math.random() * (maxx-minx)+minx
        y = this.y+this.height;
        break;
    }

    let neighbor = new TavernRect(x,y,width,height)
    for(let i in this.neighbors)
    {
      if(neighbor.overlaps(this.neighbors[i]) || this.neighbors[i].contains(neighbor))
      {
        return this.randomlyPlaceNeighbor(width,height)
      }
    }
    neighbor.neighbors.push(this);
    this.neighbors.push(neighbor);
    return neighbor;
  }

  render(){
    return (
      <Rect
        x={this.x} y={this.y} width={this.width} height={this.width}
        fill={'green'}
        shadowBlur={10}
      />
    )
  }
}

const TavernFloorplan = (props) => {
  let squareOne = new TavernRect(200,200,70,70);
  let squareTwo = squareOne.randomlyPlaceNeighbor(50,50);
  let squareThree = squareTwo.randomlyPlaceNeighbor(20,20);



  console.log(squareOne.overlaps(squareTwo));
  console.log(squareOne.contains(squareTwo));
  return (
    <Stage width={700} height={700}>
      <Layer>
        {squareOne.render()}
        {squareTwo.render()}
        {squareThree.render()}
      </Layer>
    </Stage>
  )
}

export default TavernFloorplan;
