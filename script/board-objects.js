/**
 * Created by Konrad on 2015-11-18.
 */
function BoardObject(type, num) {
    this.model = new Image();
    this.xLocation = 0;
    this.yLocation = 0;

    if (type == 'grass') {
        this.model.src = 'img/grass_small.png';
        this.width = 320;
        this.height = 320;

    }else if (type == 'road') {
        this.model.src = 'img/asphalt.png';
        this.width = 256;
        this.height = 256;

    }else if (type == 'tree', num) {
        this.model.src = 'img/trees/'+num+'.png';
        this.width = 53;
        this.height = 120;

    } else if (type == 'rock', num) {
        this.model.src = 'img/rocks/'+num+'.png';
        this.width = 53;
        this.height = 120;

    }
    return this;

}