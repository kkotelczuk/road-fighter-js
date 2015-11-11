/**
 * Created by Konrad on 15.10.2015.
 */
function Car(type) {
    this.model = new Image();
    this.xLocation = 0;
    this.yLocation = 0;
    this.carSpeedFactor = 0.8;
    this.carSpeed = 3;

    if (type == 'player') {
        this.model.src = 'img/player.png';
        this.width = 41;
        this.height = 67;
        this.defaultPosition = 0;
        this.turningFactor = 0.5;
        this.topSpeed = 25;
        this.accelerationFactor = 0.4;
        this.accidentId = -1;
        this.score = 0;

    } else if (type == 1) {
        this.model.src = 'img/bus.png';
        this.width = 53;
        this.height = 120;

    } else if (type == 2) {
        this.model.src = 'img/car1.png';
        this.width = 37;
        this.height = 66;

    } else if (type == 3) {
        this.model.src = 'img/car2.png';
        this.width = 36;
        this.height = 51;

    } else if (type == 4) {
        this.model.src = 'img/car3.png';
        this.width = 47;
        this.height = 107;

    }
    return this;

}