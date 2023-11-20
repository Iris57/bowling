import type { RollInterface } from './roll'

export type FrameNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type FrameInterface = Pick<Frame, keyof Frame>

export class Frame {
    private _frameNumber: FrameNumber
    private _score: number | null = null
    private _rolls: RollInterface[] = []

    constructor(value: FrameNumber) {
        this._frameNumber = value
    }

    public addRoll(roll: RollInterface) {
        this._rolls.push(roll)
    }

    get rolls() {
        return this._rolls
    }

    get allRollsDone() {
        // extra check for last frame with strike
        if (this.isLastFrame && this.hasStrike) {
            return this._rolls.length === 3
        }
        return this.hasStrike || this._rolls.length === 2
    }

    set score(value: number | null) {
        this._score = value
    }

    get score() {
        return this._score
    }

    get sum() {
        let sum = 0
        this._rolls.forEach((roll) => {
            sum += roll.score
        })
        return sum
    }

    get frameNumber() {
        return this._frameNumber
    }

    get pinsLeft() {
        // extra check for last frame with strike
        if (this.isLastFrame && this.hasStrike) {
            const previosRoll = this._rolls[this._rolls.length - 1]
            return previosRoll.isStrike ? 10 : (10 - previosRoll.score)
        }
        return 10 - this.sum
    }

    get hasStrike() {
        return this._rolls.some((roll) => roll.isStrike)
    }

    get hasSpare() {
        return !this.hasStrike && this.pinsLeft === 0
    }

    get isLastFrame() {
        return this._frameNumber === 9
    }
}