import { Frame, type FrameNumber, type FrameInterface } from "./frame"
import { Roll, type Score, type RollInterface } from "./roll"

export type GameInterface = Pick<Game, keyof Game>

export class Game {
    private _frames: FrameInterface[] = []
    private _rolls: RollInterface[] = []
    private _round: number = 0
    private _rollsToTriggerSpareFrame: Map<number, FrameInterface> = new Map()
    private _rollsToTriggerStrikeFrame: Map<number, FrameInterface> = new Map()

    private init() {
        this._frames = []
        let i: FrameNumber = 0
        while (i < 10) {
            this._frames.push(new Frame(i as FrameNumber))
            i++
        }
        this._rollsToTriggerSpareFrame = new Map()
        this._rollsToTriggerStrikeFrame = new Map()

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
    }

    get activeFrame() {
        return this._frames[this._round]
    }

    get rolls() {
        return this._rolls
    }

    private addStrikesAndSpares(currentRollNumber: number) {
        if (this.activeFrame.hasSpare) {
            this._rollsToTriggerSpareFrame.set(currentRollNumber + 1, this.activeFrame)
        }
        if (this.activeFrame.hasStrike) {
            this._rollsToTriggerStrikeFrame.set(currentRollNumber + 2, this.activeFrame)
        }
    }

    private updateStrikesAndSpares(currentRollNumber: number) {
        const possibleSpareFrame = this._rollsToTriggerSpareFrame.get(currentRollNumber)
        const possibleStrikeFrame = this._rollsToTriggerStrikeFrame.get(currentRollNumber)

        if (possibleSpareFrame !== undefined) {
            possibleSpareFrame.score = this.score + possibleSpareFrame.sum + this._rolls[currentRollNumber].score
            this._rollsToTriggerSpareFrame.delete(currentRollNumber)
        }

        if (possibleStrikeFrame !== undefined) {
            const scoresToAdd = possibleStrikeFrame.isLastFrame ? 0 : this._rolls[currentRollNumber - 1].score + this._rolls[currentRollNumber].score
            possibleStrikeFrame.score = this.score + possibleStrikeFrame.sum + scoresToAdd
            this._rollsToTriggerStrikeFrame.delete(currentRollNumber)
        }
    }

    public addRoll(value: Score) {
        if (!this.activeFrame.allRollsDone) {
            const frame = this.activeFrame
            const roll = new Roll(value)
            this._rolls.push(roll)
            frame.addRoll(roll)
            if (frame.hasSpare) {
                roll.spare = true
            }

            const currentRollNumber = this._rolls.length - 1
            this.addStrikesAndSpares(currentRollNumber)
            this.updateStrikesAndSpares(currentRollNumber)

            if (!(frame.hasSpare || frame.hasStrike) && frame.allRollsDone) {
                frame.score = this.score + frame.sum
            }
        }

        if (this.activeFrame.allRollsDone) {
            this.nextFrame()
        }
    }

    get score() {
        return this._frames.findLast((frame) => frame.score)?.score ?? 0
    }

    get isGameOver() {
        return this.activeFrame.isLastFrame && this.activeFrame.allRollsDone
    }

    public reset() {
        this.init()
    }
}