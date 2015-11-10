/**
 * Created by Konrad on 15.10.2015.
 */


function RoadFighter(canvas, width, height, inputBuffer) {

    this.gameStarted = true;

    this.board = new Board(width, height);
    this.canvas = canvas;
    this.keysPressed = inputBuffer;

    this.player = new Car('player');

    this.carLocation = {
        X : (this.board.middleRoadPoint - this.board.quartOfTheRoad + this.player.default_car_padding.left),
        Y : (this.board.height - this.player.default_car_padding.bottom)
    };

    this.player.startPositionY = this.carLocation.Y;

    this.inertia = 0;

    this.update = function () {
        this.drawBoard();
        this.drawStrips();

        this.canvas.drawImage(this.player.model, this.carLocation.X, this.carLocation.Y);

        this.processInput();
    };

    this.drawStrips = function(){
        this.canvas.fillStyle = this.board.colors.divider;
        for (var i= this.board.stripsDy; i< this.board.height; i+=(this.board.lanesHeight+this.board.lanesDistance)) {
            this.canvas.fillRect( this.board.leftLane - (this.board.lanesWidth * .5), i, this.board.lanesWidth, this.board.lanesHeight);
            this.canvas.fillRect( this.board.rightLane - (this.board.lanesWidth * .5), i, this.board.lanesWidth, this.board.lanesHeight);
        }
        this.board.stripsDy = (this.board.stripsDy+this.board.shiftFrameFactor)%(this.board.lanesHeight+this.board.lanesDistance);
        console.log(this.board.stripsDy)
    };

    this.drawBoard = function(){
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

    this.processInput = function() {
        this.idle = true;

        if (this.keysPressed.left) {
            this.idle = false;

            if((this.inertia - 1) > 0){
                this.inertia--;
                this.carLocation.X = ((this.carLocation.X - this.player.car_l_r_turn_factor) > (this.board.middleRoadPoint - this.board.quartOfTheRoad + this.player.car_padding_from_b)) ? (this.carLocation.X - this.player.car_l_r_turn_factor) : this.carLocation.X;
            }
            else{
                this.inertia = 0;
            }
        }

        if (this.keysPressed.right) {
            this.idle = false;

            if((this.inertia - 1) > 0){
                this.inertia--;
                this.carLocation.X = ((this.carLocation.X + this.player.car_l_r_turn_factor) < (this.board.middleRoadPoint + this.board.quartOfTheRoad - this.player.car_padding_from_b - this.player.max_car_width)) ? (this.carLocation.X + this.player.car_l_r_turn_factor) : this.carLocation.X;
            }
            else{
                this.inertia = 0;
            }
        }

        if (this.keysPressed.up) {
            this.carLocation.Y -= 4;
            this.idle = false;
            this.inertia = (this.inertia + 1) <= this.player.max_car_inertia ? (this.inertia + 1) : this.inertia;
        }

        if (this.keysPressed.down) {
            this.carLocation.Y +=3;
            this.idle = false;
            if((this.inertia - 1) > 0){
                this.inertia  -= 3;

                if (this.inertia < 0) {
                    this.inertia = 1;
                }
            }
            else{
                this.inertia = 0;
            }
        }

        if (this.carLocation.Y <= this.player.startPositionY && !this.keysPressed.up && !this.keysPressed.down && !this.keysPressed.left && !this.keysPressed.right) {
            this.idle = false;
            if(this.carLocation.Y >= this.board.h - this.player.default_car_padding.bottom){
                this.carLocation.Y = this.board.h - this.player.default_car_padding.bottom;
                this.inertia = (this.inertia - 1) >= 0 ? (this.inertia - 1) : 0;
            }else{
                console.log(this.inertia);

                this.carLocation.Y +=1;

            }

        }

    };

}
