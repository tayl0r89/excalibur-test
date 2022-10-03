import * as ex from "excalibur";
import { Color } from "excalibur";

const colors: ex.Color[] = [ex.Color.Blue, ex.Color.Green, ex.Color.Rose, ex.Color.Orange, ex.Color.Violet, ex.Color.Chartreuse]

export class Firework extends ex.Actor {

    private readonly targetY: number;
    private readonly speed: number

    constructor(xPos: number, targetY: number, speed:number) {
        super({
            pos: new ex.Vector(xPos, 800),
            width: 10,
            height: 10,
        });

        this.targetY = 800 - targetY
        this.speed = speed
        this.graphics.use(new ex.Circle({radius:5, color: ex.Color.Red}));
    }

    onInitialize(engine:ex.Engine){
        const flightEmitter = createFlightEmitter(new ex.Vector(this.pos.x - (this.width / 2), this.pos.y), this.acc)

        const explodeEmitter = createExplodeEmitter(new ex.Vector(this.pos.x, this.targetY))

        flightEmitter.on("preupdate", () => {
            flightEmitter.pos = new ex.Vector(this.pos.x - (this.width / 2), this.pos.y + this.height)
        })
        this.addChild(flightEmitter)
        engine.add(flightEmitter)

        this.actions.moveTo(new ex.Vector(this.pos.x, this.targetY), this.speed)
            .callMethod(() => {
                this.removeChild(flightEmitter)
                engine.remove(flightEmitter)
                this.color = ex.Color.Black

                this.addChild(explodeEmitter)
                engine.add(explodeEmitter)
            })
            .delay(1500)
            .callMethod(() => {
                engine.remove(explodeEmitter),
                this.kill()
            })
    }

}

const random = new ex.Random(1)
function selectRandom<T>(arr: T[]): T {
    const index = random.integer(0, arr.length - 1)
    return arr[index]
}

function createFlightEmitter(pos: ex.Vector, acc: ex.Vector): ex.ParticleEmitter {
    return new ex.ParticleEmitter({
        width: 10,
        height: 10,
        isEmitting: true,
        minVel: 40,
        maxVel: 50,
        acceleration: acc,
        pos: pos,
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
}

function createExplodeEmitter(pos: ex.Vector): ex.ParticleEmitter {
    return new ex.ParticleEmitter({
        width: 10,
        height: 10,
        isEmitting: true,
        minVel: 40,
        maxVel: 50,
        acceleration: ex.Vector.Zero,
        pos: pos,
        minAngle: 0,
        maxAngle: 360,
        emitRate: 10,
        particleLife: 200,
        opacity: 1,
        startSize: 5,
        endSize: 20,
        minSize: 5,
        maxSize: 20,
        beginColor: selectRandom(colors),
        endColor: selectRandom(colors),
        emitterType: ex.EmitterType.Rectangle,
        radius: random.integer(40, 100),
    })
}