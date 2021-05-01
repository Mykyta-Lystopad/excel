import {ActiveRoute} from "@core/routes/ActiveRoute";

export class Page{
    constructor(params) {
        this.params = ActiveRoute.param

    }

    getRoot(){
        throw new Error('Method "getRoot" should be implemented')
    }

    afterRender(){

    }

    destroy(){

    }

}