/**
 * Created by Konrad on 15.10.2015.
 */
function Car(type){
    this.model = new Image();
    if(type == 'player'){
        this.model.src = 'img/player.png';
        this.default_car_padding = {
            left : 20,
            bottom : 67
        };
        this.car_padding_from_b = 10;	//left and right padding of car from road margins
        this.car_l_r_turn_factor = 10;	//left and right turn factor of car
        this.max_car_inertia = 10;	//maximum inertia of car
        this.max_car_width = 41;	//width of car graphics being displayed on game
        this.startPositionY = this.default_car_padding.bottom;


    }else if(type == 'bus'){
        this.model.src = 'img/bus.png';
        this.default_car_padding = {
            left : 20,
            bottom : 120
        };
        this.car_padding_from_b = 10;	//left and right padding of car from road margins
        this.car_l_r_turn_factor = 10;	//left and right turn factor of car
        this.max_car_inertia = 10;	//maximum inertia of car
        this.max_car_width = 53;	//width of car graphics being displayed on game
        this.startPositionY = this.default_car_padding.bottom;

    }else if(type == 'car1'){
        this.model.src = 'img/car1.png';
        this.default_car_padding = {
            left : 20,
            bottom : 66
        };
        this.car_padding_from_b = 10;	//left and right padding of car from road margins
        this.car_l_r_turn_factor = 20;	//left and right turn factor of car
        this.max_car_inertia = 30;	//maximum inertia of car
        this.max_car_width = 37;	//width of car graphics being displayed on game
        this.startPositionY = this.default_car_padding.bottom;

    }else if(type == 'car2'){
        this.model.src = 'img/car2.png';
        this.default_car_padding = {
            left : 20,
            bottom : 51
        };
        this.car_padding_from_b = 10;	//left and right padding of car from road margins
        this.car_l_r_turn_factor = 10;	//left and right turn factor of car
        this.max_car_inertia = 10;	//maximum inertia of car
        this.max_car_width = 36;	//width of car graphics being displayed on game
        this.startPositionY = this.default_car_padding.bottom;

    }else if(type == 'car3'){
        this.model.src = 'img/car3.png';
        this.default_car_padding = {
            left : 20,
            bottom : 107
        };
        this.car_padding_from_b = 10;	//left and right padding of car from road margins
        this.car_l_r_turn_factor = 10;	//left and right turn factor of car
        this.max_car_inertia = 10;	//maximum inertia of car
        this.max_car_width = 47;	//width of car graphics being displayed on game
        this.startPositionY = this.default_car_padding.bottom;

    }
    return this;

}