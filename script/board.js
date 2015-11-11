/**
 * Created by Konrad on 15.10.2015.
 */
function Board(width, height) {

    this.width = width;
    this.height = height;

    this.roadWidth = 190;
    this.laneWidth = 60;
    this.stripsWidth = 5;
    this.stripsDy = 0;
    this.stripsHeight = 15;
    this.stripsDistance = 40;
    this.topEdgeOfRoad = 15;

    this.grassWidth = (this.width - this.roadWidth) / 2;
    this.rightShoulder = this.roadWidth + this.grassWidth;
    this.leftLane = this.grassWidth + this.laneWidth;
    this.rightLane = this.leftLane + this.laneWidth + this.stripsWidth;

    this.carStartingPositionX1 =
        this.grassWidth + (.5 * this.laneWidth) - this.stripsWidth;
    this.carStartingPositionX2 =
        this.grassWidth + (.5 * this.laneWidth) + this.laneWidth;
    this.carStartingPositionX3 =
        this.grassWidth + (.5 * this.laneWidth) + (2 * this.stripsWidth) + (2 * this.laneWidth);

    this.busyLane = {
        left: 0,
        middle: 0,
        right: 0
    };


    this.colors = {
        grass: '#0B610B',
        road: '#333333',
        divider: '#f7f7f7'
    };

    return this;
}