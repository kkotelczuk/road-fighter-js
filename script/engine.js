/**
 * Created by Konrad on 15.10.2015.
 */


function RoadFighter(canvas, width, height, inputBuffer) {

    this.board = new Board(width, height);
    this.canvas = canvas;
    this.keysPressed = inputBuffer;
    this.shiftFrameFactor = 10;
    this.minimumShiftFrameFactor = this.shiftFrameFactor;


    this.player = new Car('player');
    this.player.xLocation =
        parseInt(this.board.grassWidth + (.5 * this.board.laneWidth) - (.5 * this.player.width) - this.board.stripsWidth);
    this.player.yLocation =
        this.player.defaultPosition = parseInt(this.board.height - this.player.height * 2);

    this.cars = [];
    this.boardBackground = [];
    this.cars.push(this.player);
    this.gameOver = false;
    var counter = 0;

    this.update = function () {


        //if (!this.gameOver) {
        //    this.removeCars();
        //    this.addCars();
        //}
        //this.drawBoard();
        //this.drawStrips();
        //this.drawCars();
        //this.drawStats();
        //if (!this.gameOver) {
        //    this.carSteering();
        //    this.collisionsDetection();
        //}else{
        //    this.carAccident();
        //    this.drawDisplay();
        //}
        this.addBoardObjects();
        this.drawBoardObjects();



    };

    this.addCars = function () {
        if (this.cars.length <= 12) {

            var rand = Math.floor((Math.random() * 4) + 1);
            var newCar = new Car(rand);

            rand = Math.floor((Math.random() * 3) + 1);


            if (rand == 1) {
                newCar.yLocation = -(newCar.height + this.board.busyLane.left);
                newCar.xLocation = this.board.carStartingPositionX1 - parseInt(.5 * newCar.width);
                this.board.busyLane.left += newCar.height + Math.floor((Math.random() * 200) + 50);
                newCar.carSpeedFactor = 0.2;
            } else if (rand == 2) {
                newCar.yLocation = -(newCar.height + this.board.busyLane.middle);
                newCar.xLocation = this.board.carStartingPositionX2 - parseInt(.5 * newCar.width);
                this.board.busyLane.middle += newCar.height + Math.floor((Math.random() * 300) + 100);
                newCar.carSpeedFactor = 0.6;
            } else {
                newCar.yLocation = -(newCar.height + this.board.busyLane.right);
                newCar.xLocation = this.board.carStartingPositionX3 - parseInt(.5 * newCar.width);
                this.board.busyLane.right += newCar.height + Math.floor((Math.random() * 400) + 150);
            }

            this.cars.push(newCar);

        }
    };

    this.addBoardObjects = function(){
        var boardObject;
        for(var i = 0; i <= this.board.width+320; i+= 320){
            lastObjectHeight = 320;
            if(640 < i <= 1200){
                 boardObject = new BoardObject('road');
            }else{
                 boardObject = new BoardObject('grass');
            }

            this.boardBackground[i] = [];
            for(var j = 0; j < this.board.height+320 ; j+= 320){
                boardObject.xLocation = i;
                boardObject.yLocation = j;
                this.boardBackground[i][j] = boardObject;
            }
        }

    };

    this.drawBoardObjects = function(){
        for (var i = 0; i < this.board.width+320; i+=320) {
            lastObjectHeight = 320;
            for(var j = 0; j < this.board.height+320; j+= 320){
                var boardObject = this.boardBackground[i][j];
                boardObject.yLocation -= (this.shiftFrameFactor / 2);
                this.canvas.drawImage(boardObject.model, boardObject.xLocation, boardObject.yLocation);
                console.log( boardObject.xLocation, boardObject.yLocation);
            }
        }
    };

    this.removeCars = function () {
        if (this.cars.length > 9) {
            for (var i = 1; i < this.cars.length; i++) {
                var car = this.cars[i];
                if (car.yLocation > (this.board.height + 200)) {
                    this.cars.splice(i, 1);
                }
            }
        }
    };

    this.drawCars = function () {
        for (var i = 0; i < this.cars.length; i++) {

            var car = this.cars[i];

            if (i != 0) {
                car.yLocation += parseInt((car.carSpeed + parseInt(this.shiftFrameFactor / 2)) * (car.carSpeedFactor ));
            }

            if (this.gameOver && (i == 0 || i == this.player.accidentId )) {
                i == 0 ? car.xLocation += 5: car.xLocation -= 5;
                this.canvas.save();
                this.canvas.translate(car.xLocation, car.yLocation);
                this.canvas.rotate(counter * Math.PI / 180);
                this.canvas.drawImage(car.model, -(car.width / 2), -(car.height / 2));
                this.canvas.restore();
                counter += 25;
            } else {
                this.canvas.drawImage(car.model, car.xLocation, car.yLocation);
            }


        }
    };

    this.drawStrips = function () {

        this.canvas.fillStyle = this.board.colors.divider;
        for (var i = this.board.stripsDy;
             i < this.board.height;
             i += (this.board.stripsHeight + this.board.stripsDistance)
        ) {
            this.canvas.fillRect(this.board.oppositeRightLane - this.board.stripsWidth, i,
                this.board.stripsWidth, this.board.stripsHeight);
            this.canvas.fillRect(this.board.oppositeLeftLane - this.board.stripsWidth, i,
                this.board.stripsWidth, this.board.stripsHeight);
            this.canvas.fillRect(this.board.leftLane - this.board.stripsWidth, i,
                this.board.stripsWidth, this.board.stripsHeight);
            this.canvas.fillRect(this.board.rightLane - this.board.stripsWidth, i,
                this.board.stripsWidth, this.board.stripsHeight);
        }
        this.board.stripsDy = (this.board.stripsDy + this.shiftFrameFactor) %
            (this.board.stripsHeight + this.board.stripsDistance);
    };

    this.drawBoard = function () {
        this.canvas.clearRect(0, 0, this.board.width, this.board.height);
        //this.canvas.fillStyle = this.board.colors.grass;
        //this.canvas.fillRect(0, 0, this.board.width, this.board.height);
        this.grassPattern = this.canvas.createPattern(this.board.grassImg, 'repeat');
        //for (var i = this.board.grassDy;
        //     i < this.board.height;
        //     i += 320
        //) {
        //    this.canvas.rect(0, i, 320, 320);
        //    this.canvas.fillStyle=this.grassPattern;
        //    this.canvas.fill();
        //}
        //this.board.grassDy = (this.board.grassDy + this.shiftFrameFactor) %
        //    320;


        this.canvas.rect(0, 0, this.board.width, this.board.height);
            this.canvas.fillStyle=this.grassPattern;
            this.canvas.fill();

        this.canvas.fillStyle = this.board.colors.road;
        this.canvas.fillRect(this.board.grassWidth, 0, this.board.roadWidth, this.board.height);
        this.canvas.fillStyle = this.grassPattern;
        this.canvas.fillRect(this.board.separatorXposition, 0, this.board.laneSeparator, this.board.height);
        this.canvas.beginPath();
        this.canvas.moveTo(this.board.grassWidth, 0);
        this.canvas.lineTo(this.board.grassWidth, this.board.height);
        this.canvas.stroke();
        this.canvas.beginPath();
        this.canvas.moveTo(this.board.rightShoulder, 0);
        this.canvas.lineTo(this.board.rightShoulder, this.board.height);
        this.canvas.stroke();
    };

    this.drawStats = function(){
        this.canvas.font = "15px Arial";
        this.canvas.fillText(parseInt(this.shiftFrameFactor)*10+" km/h", 10, this.board.height-10);
    };

    this.drawDisplay = function(){
        this.canvas.fillStyle = "rgba(73, 73, 73, 0.65)";
        this.canvas.fillRect(0, 0, this.board.width, this.board.height);
        this.canvas.beginPath();
        this.canvas.font = "bold 40px Arial";
        this.canvas.fillStyle = "red";
        this.canvas.textAlign = "center";
        this.canvas.fillText("Game Over", this.board.width/2, this.board.height/2);
        this.canvas.fillText("Score: "+this.player.score, this.board.width/2, this.board.height/2+40);
    };

    this.carSteering = function () {
        if (this.keysPressed.up) {
            this.player.yLocation -= parseInt(this.shiftFrameFactor * this.player.accelerationFactor);
            if (this.shiftFrameFactor < this.player.topSpeed) {
                this.shiftFrameFactor += this.player.accelerationFactor;
            }
        } else {
            this.player.yLocation += parseInt(this.shiftFrameFactor / 4);
            if (this.shiftFrameFactor > this.minimumShiftFrameFactor) {
                this.shiftFrameFactor -= 0.2;
            } else {
                this.shiftFrameFactor = this.minimumShiftFrameFactor;
            }
        }
        if (this.keysPressed.down) {
            this.player.yLocation += parseInt(this.shiftFrameFactor * this.player.accelerationFactor);
            if (this.shiftFrameFactor > this.minimumShiftFrameFactor) {
                this.shiftFrameFactor -= this.player.accelerationFactor * 0.5;
            } else {
                this.shiftFrameFactor = this.minimumShiftFrameFactor;
            }
        }
        if (this.keysPressed.right) {
            this.player.xLocation += this.player.turningFactor * this.shiftFrameFactor;
        }
        if (this.keysPressed.left) {
            this.player.xLocation -= this.player.turningFactor * this.shiftFrameFactor;
        }

    };
    this.carAccident = function(){
        if (this.shiftFrameFactor > this.minimumShiftFrameFactor) {
            this.shiftFrameFactor -= this.player.accelerationFactor * 0.5;
        } else {
            this.shiftFrameFactor = this.minimumShiftFrameFactor;
        }
    };
    this.collisionsDetection = function () {

        for (var i = 1; i < this.cars.length; i++) {
            var car = this.cars[i];

            if (car.yLocation > 0 && car.yLocation < this.board.height) {
                if (car.xLocation <= this.player.xLocation + this.player.width &&
                    car.xLocation + car.width >= this.player.xLocation &&
                    car.yLocation <= this.player.yLocation + this.player.height &&
                    car.height + car.yLocation >= this.player.yLocation) {
                    this.gameOver = true;
                    this.player.accidentId = i;
                    var button = document.getElementById('again');
                    button.style.display = 'block';
                    button.style.zIndex = 2;
                }
            }

        }

        if (this.player.yLocation <= this.board.topEdgeOfRoad) {
            this.player.yLocation = this.board.topEdgeOfRoad;
        }

        if (this.player.yLocation >= this.player.defaultPosition) {
            this.player.yLocation = this.player.defaultPosition;
        }

        if (this.player.xLocation <= this.board.grassWidth) {
            this.player.xLocation = this.board.grassWidth;
        }
        if (this.player.xLocation >= this.board.rightShoulder - this.player.width) {
            this.player.xLocation = this.board.rightShoulder - this.player.width;
        }

        this.player.score += parseInt(this.shiftFrameFactor / 12.5);
    };

}
