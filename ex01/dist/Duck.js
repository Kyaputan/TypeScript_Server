"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlackDuck = exports.Duck = void 0;
;
class Duck {
    swim() {
        return "fus fus!";
    }
    quack() {
        return "Quack!";
    }
}
exports.Duck = Duck;
;
class BlackDuck extends Duck {
    swim() {
        return "Black duck swimming!";
    }
    quack() {
        return "Black duck quacking!";
    }
}
exports.BlackDuck = BlackDuck;
;
