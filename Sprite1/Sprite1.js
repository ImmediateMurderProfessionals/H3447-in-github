/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Sprite1/costumes/costume1.svg", {
        x: 8.405039999999985,
        y: 6.303779999999989,
      }),
      new Costume("costume2", "./Sprite1/costumes/costume2.svg", {
        x: 46,
        y: 53,
      }),
    ];

    this.sounds = [new Sound("Meow", "./Sprite1/sounds/Meow.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(-230, 0);
    while (true) {
      if (this.touching(Color.rgb(0, 0, 0))) {
        this.clearPen();
        this.goto(-230, 0);
      }
      if (
        this.keyPressed("up arrow") ||
        this.keyPressed("space") ||
        this.mouse.down
      ) {
        this.direction = 45;
      } else {
        this.direction = 135;
      }
      this.move(5);
      if (this.compare(this.x, 230) > 0) {
        yield* this.sayAndWait("You win!", 2);
        return;
      }
      yield;
    }
  }
}
