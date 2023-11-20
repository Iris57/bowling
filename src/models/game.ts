import { Frame, type FrameNumber, type FrameInterface } from "./frame"
import { Roll, type Score, type RollInterface } from "./roll"

export type GameInterface = Pick<Game, keyof Game>

export class Game {
    private _frames: FrameInterface[] = []
    private _rolls: RollInterface[] = []
    private _round: number = 0

    private init() {
        this._frames = []
        let i: FrameNumber = 0
        while (i < 10) {
            this._frames.push(new Frame(i as FrameNumber))
            i++
        }

        this._rolls = []
        this._round = 0
    }

    constructor() {
        this.init()
    }

    get frames() {
        return this._frames
    }

    private nextFrame() {
        if (this._round < 9) {
            this._round++
        }
        return this._frames[this._round]
    }

    get activeFrame() {
        return this._frames[this._round]
    }

    get rolls() {
        return this._rolls
    }

    private handleStrike() {
        const rollNumber = this._rolls.length
        if (rollNumber < 3) {
            return
        }

        const possibleSpikeRoll = this._rolls[rollNumber - 3]
        if (possibleSpikeRoll.isStrike) {
            const scoresToAdd = possibleSpikeRoll.frame.isLastFrame ? 0 : this._rolls[rollNumber - 2].score + this._rolls[rollNumber - 1].score
            possibleSpikeRoll.frame.score = this.score + possibleSpikeRoll.frame.sum + scoresToAdd
        }
    }

    private handleSpare() {
        const rollNumber = this._rolls.length
        if (this._round > 0) {
            const previousFrame = this._frames[this._round - 1]

            if (previousFrame.hasSpare && !previousFrame.score) {
                previousFrame.score = this.score + previousFrame.sum + this._rolls[rollNumber - 1].score
            }
        }
    }

    public addRoll(value: Score) {
        if (!this.activeFrame.isMaxRolls) {
            const frame = this.activeFrame
            const roll = new Roll(value, frame)
            this._rolls.push(roll)
            frame.addRoll(roll)
            this.handleStrike()
            this.handleSpare()

            if (!(frame.hasSpare || frame.hasStrike) && frame.isMaxRolls) {
                frame.score = this.score + frame.sum
            }
        }

        if (this.activeFrame.isMaxRolls) {
            this.nextFrame()
        }
    }

    get score() {
        return this._frames.findLast((frame) => frame.score)?.score ?? 0
    }

    get isGameOver() {
        return this.activeFrame.isLastFrame && this.activeFrame.isMaxRolls
    }

    public reset() {
        this.init()
    }
}