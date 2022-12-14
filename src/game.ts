import * as ex from 'excalibur';
import { Firework } from './actors/firework';7


export class Game extends ex.Scene {
    random = new ex.Random(1337); // seeded random

    constructor() {
        super();
    }

    onInitialize(engine: ex.Engine) {
        const random = new ex.Random()
        const fireworkTimer = new ex.Timer({
            fcn: () => {
                const pos = random.integer(0, 1000)
                const target = random.integer(200, 800)
                const speed = random.integer(40, 160)
                engine.add(new Firework(pos, target, speed))
            },
            randomRange:[0, 500],
            interval: 500,
            repeats: true
        })
        
        // const firework = new Firework()
        engine.add(fireworkTimer)
        fireworkTimer.start()
    }

}