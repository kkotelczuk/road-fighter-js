/**
 * Created by Konrad on 15.10.2015.
 */


function RoadFighter(canvas, width, height, inputBuffer) {

    this.board = new Board(width, height);
    this.canvas = canvas;
    this.keysPressed = inputBuffer;
    this.shiftFrameFactor = 10;
    this.minimumShiftFrameFactor = this.shiftFrameFactor;
    this.maxShiftFrameFactor = 25;
    this.scoreMultipler = 1;


    this.player = new Car('player');
    this.player.xLocation =
        parseInt(this.board.grassWidth + (.5 * this.board.laneWidth) - (.5 * this.player.width) - this.board.stripsWidth);
    this.player.yLocation =
        this.player.defaultPosition = parseInt(this.board.height - this.player.height * 2);

    this.cars = [];
    this.boardObjectSide = true;
    this.boardObjects = [];
    this.cars.push(this.player);
    this.gameOver = false;
    this.gameBegin = false;
    var counter = 0;


    this.update = function () {



        if (!this.gameOver) {
            this.removeCars();
            if(this.gameBegin){
                this.addCars();
                this.countDistance();
            }
        }

        this.drawBoard();
        this.drawStrips();
        this.drawCars();
        this.removeBoardObjects();
        this.addBoardObjects();
        this.drawBoardObjects();
        this.drawStats();

        if (!this.gameOver) {
            this.carSteering();
            this.collisionsDetection();
        }else{
            this.carAccident();
            this.drawDisplay();
        }

        if(!this.gameBegin){
            this.loading();
        }

    };

    this.loading = function(){
        var grd = this.canvas.createLinearGradient(0, 0, this.board.width, this.board.height);
        grd.addColorStop(0, "aqua");
        grd.addColorStop(1, "blue");

        t = this.canvas
        t.fillStyle = grd;
        t.fillRect(0, 0, this.board.width, this.board.height);
        t.beginPath();
        this.canvas.font = "bold 170px Arial";
        this.canvas.fillStyle = "red";
        this.canvas.textAlign = "center";
        this.canvas.fillText("Road", this.board.width/2, this.board.height/2 - 200);
        this.canvas.fillText("Fighter", this.board.width/2, this.board.height/2 - 30);
        this.canvas.fillStyle = "black";
        this.canvas.font = "50px Arial";
        this.canvas.fillText("Loading", this.board.width/2, this.board.height/2+160);

        for(var i = 0; i <= 100; i++){
            var newObject;
            var rand = Math.floor((Math.random() * 4) + 1);

            newObject = new BoardObject('tree', rand);

            if(this.boardObjectSide){
                rand = Math.floor((Math.random() * this.board.grassWidth- 50) + 1);
                this.boardObjectSide = false;
            }else{
                rand = Math.floor((Math.random() *  ( this.board.grassWidth))+(this.board.width -this.board.grassWidth));
                this.boardObjectSide = true;
            }

            newObject.xLocation = rand;
            newObject.yLocation = Math.floor((Math.random() * this.board.height) - 300) + newObject.height;
            this.boardObjects.push(newObject);
        }
        this.gameBegin = true;
    };

    this.addCars = function () {
        if (this.cars.length <= 100) {
            var newCar;

            rand = Math.floor((Math.random() * 6) + 1);

            if (rand == 1) {
                var rand = Math.floor((Math.random() * (9-5)) + 5);
                newCar = new Car(rand);
                newCar.yLocation = -(newCar.height + this.board.busyLane.oppositeLeft);
                newCar.xLocation = this.board.carStartingPositionX1 - parseInt(.5 * newCar.width);
                this.board.busyLane.oppositeLeft += newCar.height + Math.floor((Math.random() * 400) + 150);
            } else if (rand == 2) {
                var rand = Math.floor((Math.random() * (9-5)) + 5);
                newCar = new Car(rand);
                newCar.yLocation = -(newCar.height + this.board.busyLane.oppositeMiddle);
                newCar.xLocation = this.board.carStartingPositionX2 - parseInt(.5 * newCar.width);
                this.board.busyLane.oppositeMiddle += newCar.height + Math.floor((Math.random() * 300) + 100);
                newCar.carSpeedFactor = 0.6;
            } else if(rand == 3){
                var rand = Math.floor((Math.random() * (9-5)) + 5);
                newCar = new Car(rand);
                newCar.yLocation = -(newCar.height + this.board.busyLane.oppositeRight);
                newCar.xLocation = this.board.carStartingPositionX3 - parseInt(.5 * newCar.width);
                this.board.busyLane.oppositeRight += newCar.height + Math.floor((Math.random() * 200) + 50);
            } else if(rand == 4){
                var rand = Math.floor((Math.random() * 4) + 1);
                newCar = new Car(rand);
                newCar.yLocation = -(newCar.height + this.board.busyLane.left);
                newCar.xLocation = this.board.carStartingPositionX4 - parseInt(.5 * newCar.width);
                this.board.busyLane.left += newCar.height + Math.floor((Math.random() * 250) + 50);
                newCar.carSpeedFactor = 0.2;
            } else if(rand == 5){
                var rand = Math.floor((Math.random() * 4) + 1);
                newCar = new Car(rand);
                newCar.yLocation = -(newCar.height + this.board.busyLane.middle);
                newCar.xLocation = this.board.carStartingPositionX5 - parseInt(.5 * newCar.width);
                this.board.busyLane.middle += newCar.height + Math.floor((Math.random() * 350) + 100);
                newCar.carSpeedFactor = 0.6;
            } else if(rand == 6){
                var rand = Math.floor((Math.random() * 4) + 1);
                newCar = new Car(rand);
                newCar.yLocation = -(newCar.height + this.board.busyLane.right);
                newCar.xLocation = this.board.carStartingPositionX6 - parseInt(.5 * newCar.width);
                this.board.busyLane.right += newCar.height + Math.floor((Math.random() * 500) + 150);
            }

            this.cars.push(newCar);

        }
    };

    this.addBoardObjects = function () {
        if (this.boardObjects.length <= 200) {

            var newObject;
            var rand = Math.floor((Math.random() * 4) + 1);

                 newObject = new BoardObject('tree', rand);

            if(this.boardObjectSide){
                rand = Math.floor((Math.random() * this.board.grassWidth- 50) + 1);
                this.boardObjectSide = false;
            }else{
                rand = Math.floor((Math.random() *  ( this.board.grassWidth))+(this.board.width -this.board.grassWidth));
                this.boardObjectSide = true;
            }

            newObject.xLocation = rand;
            newObject.yLocation = -(Math.floor((Math.random() * 600) + 50) + newObject.height);
            this.boardObjects.push(newObject);

        }
    };

    this.removeBoardObjects = function () {
        if (this.boardObjects.length > 200) {
            for (var i = 1; i < this.boardObjects.length; i++) {
                var object = this.boardObjects[i];
                if (object.yLocation > (this.board.height + 200)) {
                    this.boardObjects.splice(i, 1);
                }
            }
        }
    };

    this.drawBoardObjects = function () {
        for (var i = 0; i < this.boardObjects.length; i++) {

            var object = this.boardObjects[i];
            object.yLocation +=  parseInt(this.shiftFrameFactor / 2);
            this.canvas.drawImage(object.model, object.xLocation, object.yLocation, object.width * 0.8, object.height * 0.8);
            if(object.yLocation > this.board.height - this.board.height/2){
                this.gameBegin = true;
            }
        }
    };

    this.removeCars = function () {
        if (this.cars.length > 90) {
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
        this.canvas.fillStyle = this.board.colors.grass;
        this.canvas.fillRect(0, 0, this.board.width, this.board.height);
        this.canvas.fillStyle = this.board.colors.road;
        this.canvas.fillRect(this.board.grassWidth, 0, this.board.roadWidth, this.board.height);
        this.canvas.fillStyle = this.board.colors.grass;
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
        var speedCounter = document.getElementById('speedCounterLevel');
        speedCounter.style.height = this.countersMappingValue(
                this.shiftFrameFactor,
                this.minimumShiftFrameFactor,
                this.maxShiftFrameFactor,
                90,0)+'%';
        var fuelCounter = document.getElementById('fuelCounterLevel');
        fuelCounter.style.height
            = this.countersMappingValue(this.player.distance, 0, this.player.maxDistance, 0, 100)+'%';

        var scoreCounter = document.getElementById('score');
        scoreCounter.innerText = this.player.score;

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

        this.player.score +=
            parseInt(((this.player.distance * 0.0003)+this.shiftFrameFactor * 0.0002)*this.scoreMultipler);

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
                    this.setHighScore();
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

        if((this.player.xLocation + this.player.width) >= this.board.separatorXposition
            && (this.player.xLocation) <= (this.board.separatorXposition+this.board.laneSeparator))
        {
            this.player.yLocation += parseInt(this.shiftFrameFactor * (this.player.accelerationFactor * 2));
            if (this.shiftFrameFactor > this.minimumShiftFrameFactor) {
                this.shiftFrameFactor -= 0.8;
            } else {
                this.shiftFrameFactor = this.minimumShiftFrameFactor;
            }
            this.scoreMultipler = 0;
        }else{
            this.scoreMultipler = 0.8;
        }


    };

    this.countersMappingValue = function(value, inMin, inMax, outMin, outMax) {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    };

    this.countDistance = function(){
        this.player.distance += this.shiftFrameFactor;
        if(this.player.distance >= this.player.maxDistance) {
            this.gameOver = true;
            var button = document.getElementById('again');
            button.style.display = 'block';
            button.style.zIndex = 2;
        }
    };

    this.setHighScore = function(){
        var highScore = localStorage.getItem("highScore");
        console.log(highScore);
        if(parseInt(highScore) < this.player.score){
            localStorage.setItem("highScore", this.player.score);
        }
        document.getElementById("highScore").innerText = localStorage.getItem("highScore");
    }

}
