import BattleScene from "./battle-scene";

export class Phase {
  protected scene: BattleScene;

  constructor(scene: BattleScene) {
    this.scene = scene;
  }

  start() {
    console.log(`%cStart Phase ${this.constructor.name}`, "color:green;");
    if (this.scene.abilityBar.shown) {
      this.scene.abilityBar.resetAutoHideTimer();
    }
  }

  end() {
    const phase = this.scene.getCurrentPhase();
    console.log("this is the phase", phase);
    this.scene.shiftPhase();
  }
}
