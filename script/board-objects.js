/**
 * Created by Konrad on 2015-11-18.
 */
function BoardObject(type) {
    this.model = new Image();
    this.xLocation = 0;
    this.yLocation = 0;

    if (type == 'grass') {
        this.model.src = 'img/grass_S.png';
        this.width = 320;
        this.height = 320;

    }else if (type == 'road') {
        this.model.src = 'img/grass_S.png';
        this.width = 320;
        this.height = 320;

    }else if (type == 1) {
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