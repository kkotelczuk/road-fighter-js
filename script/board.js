/**
 * Created by Konrad on 15.10.2015.
 */
function Board(width, height) {

    this.width = width;
    this.height = height;


    this.laneWidth = 110;
    this.stripsWidth = 7;
    this.stripsDy = 0;
    this.stripsHeight = 15;
    this.stripsDistance = 40;
    this.topEdgeOfRoad = 15;
    this.laneSeparator = 30;

    this.roadWidth = (this.laneWidth * 6) + (this.stripsWidth * 4) + this.laneSeparator;
    this.grassWidth = (this.width - this.roadWidth) / 2;
    this.rightShoulder = this.roadWidth + this.grassWidth;
    this.oppositeRightLane = this.grassWidth + this.laneWidth;
    this.oppositeLeftLane = this.oppositeRightLane + this.laneWidth + this.stripsWidth;
    this.separatorXposition = this.width -  this.grassWidth - (this.roadWidth/2) - (this.laneSeparator/2);
    this.leftLane = this.separatorXposition + this.laneSeparator + this.laneWidth;
    this.rightLane = this.leftLane + this.laneWidth + this.stripsWidth;



    this.carStartingPositionX1 =
        this.grassWidth + (.5 * this.laneWidth) - this.stripsWidth;
    this.carStartingPositionX2 =
        this.grassWidth + (.5 * this.laneWidth) + this.laneWidth;
    this.carStartingPositionX3 =
        this.grassWidth + (.5 * this.laneWidth) + (2 * this.stripsWidth) + (2 * this.laneWidth);
    this.carStartingPositionX4 =
        this.grassWidth + (.5 * this.laneWidth) + (3 * this.stripsWidth) + (3 * this.laneWidth) + this.laneSeparator;
    this.carStartingPositionX5 =
        this.grassWidth + (.5 * this.laneWidth) + (4 * this.stripsWidth) + (4 * this.laneWidth) + this.laneSeparator;
    this.carStartingPositionX6 =
        this.grassWidth + (.5 * this.laneWidth) + (5 * this.stripsWidth) + (5 * this.laneWidth) + this.laneSeparator;



    this.busyLane = {
        left: 0,
        middle: 0,
        right: 0,
        oppositeLeft: 0,
        oppositeRight: 0,
        oppositeMiddle: 0
    };


    this.colors = {
        grass: '#0B610B',
        road: '#333333',
        divider: '#f7f7f7'
    };

    this.grassImg = new Image();
    this.grassImg.src = 'img/grass_S.png';
    this.grassDy = 0;

    return this;
}