import { makeAutoObservable } from "mobx";

class Category {
    categories = [];

    constructor() {
        makeAutoObservable(this);
    }

    setCategories(new_arr) {
        this.categories = new_arr;
    }
}

export default new Category();
