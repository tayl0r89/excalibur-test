import * as ex from "excalibur";
import { Color } from "excalibur";

export class Firework extends ex.Actor {

    constructor(xPos: number) {
        super({
            pos: new ex.Vector(xPos, 800),
            width: 10,
            height: 10,
            vel: new ex.Vector(0,-50),
        });

        this.graphics.use(new ex.Circle({radius:5, color: ex.Color.Red}));
    }

    onInitialize(engine:ex.Engine){
        const emitter = new ex.ParticleEmitter({
            width: 10,
            height: 10,
            isEmitting: true,
            minVel: 40,
            maxVel: 50,
            acceleration: this.acc,
            pos: this.pos,
            minAngle: 0,
            maxAngle: Math.PI,
            emitRate: 10,
            particleLife: 500,
            opacity: 1,
            startSize: 5,
            endSize: 1,
            minSize: 1,
            maxSize: 5,
            beginColor: ex.Color.Yellow,
            endColor: ex.Color.Yellow,
            emitterType: ex.EmitterType.Rectangle,
            radius: 5,
        })
        emitter.on("preupdate", () => {
            emitter.pos = new ex.Vector(this.pos.x - (this.width / 2), this.pos.y + this.height)
        })
        this.addChild(emitter)
        engine.add(emitter)
    }

}