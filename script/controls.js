/**
 * Created by Konrad on 15.10.2015.
 */
var directions = {
    right: false,
    up: false,
    left: false,
    down: false
};
function press(event) {
    var code = event.keyCode;
    if(code == 37){
        directions.left = true;
        directions.right = false;
    }
    if(code == 38){
        directions.up = true;
    }
    if(code == 39){
        directions.right = true;
        directions.left = false;
    }
    if(code == 40){
        directions.down = true;
    }

}
function release(event) {
    var code = event.keyCode;
    if(code == 37){
        directions.left = false;
    }
    if(code == 38){
        directions.up = false;
    }
    if(code == 39){
        directions.right = false;
    }
    if(code == 40){
        directions.down = false;
    }
}
