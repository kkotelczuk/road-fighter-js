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
        this.board.grassWidth + (.5 * this.board.laneWidth) - parseInt(.5 * this.player.width) - this.board.stripsWidth;
    this.player.yLocation =
        this.player.defaultPosition = this.board.height - this.player.height * 2;

    this.cars = [];
    this.cars.push(this.player);
    this.gameOver = false;

    this.update = function () {
        if (!this.gameOver) {
            this.removeCars();
            this.addCars();
            this.drawBoard();
            this.drawStrips();
            this.drawCars();
            this.carSteering();
            this.collisionsDetection();
        }
    };

    this.addCars = function () {
        if (this.cars.length <= 100) {

            var rand = Math.floor((Math.random() * 4) + 1);
            var newCar = new Car(rand);

            if (this.cars.length <= 80) {
                rand = Math.floor((Math.random() * 3) + 2);
            }
            else {
                rand = Math.floor((Math.random() * 3) + 1);
            }

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

    this.removeCars = function () {
        if (this.cars.length > 100) {
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

            this.canvas.drawImage(car.model, car.xLocation, car.yLocation);

            this.canvas.rect(car.xLocation, car.yLocation, car.width, car.height);
            this.canvas.stroke();

            if (i != 0) {
                car.yLocation += (car.carSpeed + parseInt(this.shiftFrameFactor / 2)) * (car.carSpeedFactor );
            }
        }
    };

    this.drawStrips = function () {
        this.canvas.fillStyle = this.board.colors.divider;
        for (var i = this.board.stripsDy;
             i < this.board.height;
             i += (this.board.stripsHeight + this.board.stripsDistance)
        ) {
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
        this.canvas.fillStyle = this.board.colors.grass;
        this.canvas.fillRect(0, 0, this.board.width, this.board.height);
        this.canvas.fillStyle = this.board.colors.road;
        this.canvas.fillRect(this.board.grassWidth, 0, this.board.roadWidth, this.board.height);
        this.canvas.beginPath();
        this.canvas.moveTo(this.board.grassWidth, 0);
        this.canvas.lineTo(this.board.grassWidth, this.board.height);
        this.canvas.stroke();
        this.canvas.beginPath();
        this.canvas.moveTo(this.board.rightShoulder, 0);
        this.canvas.lineTo(this.board.rightShoulder, this.board.height);
        this.canvas.stroke();
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
    this.collisionsDetection = function () {

        for (var i = 1; i < this.cars.length; i++) {
            var car = this.cars[i];
            if((this.player.yLocation <= (car.yLocation - car.height)) &&
                (this.player.xLocation)){
                this.gameOver = true;
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
    };

}
