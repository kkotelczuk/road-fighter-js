/**
 * Created by Konrad on 15.10.2015.
 */
function Board(width, height) {

    this.roadWidth = 190;
    this.grassWidth = (width - this.roadWidth)/2;
    this.rightShoulder = this.roadWidth + this.grassWidth;
    this.laneWidth = 60;
    this.stripsWidth = 5;
    this.leftLane = this.grassWidth + this.laneWidth;
    this.rightLane  = this.leftLane + this.laneWidth + this.stripsWidth;
    this.width = width;
    this.height = height;
    this.stripsDy = 0;

    this.middleRoadPoint = width/2;	//mid-width point of road, also this is the mid-width of game screen point
    this.quartOfTheRoad = (width /3);	//half of the width of road
    this.shiftFrameFactor = 15;	//shift the game frame by this factor
    this.lanesWidth = 5;	//width of divider
    this.lanesHeight = 15;	//height of divider
    this.lanesDistance = 40;	//distance between two dividers (height)
    this.colors = {
        grass: '#0B610B',
        road: '#333333',
        divider: '#f7f7f7'
    };

    return this;
}