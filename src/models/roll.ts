import type { FrameInterface } from "./frame"

export type Score = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export type RollInterface = Pick<Roll, keyof Roll>

export class Roll {
    private _score: Score
    private _frame: FrameInterface

    assertIsValidScore(val: any): asserts val is Score {
        if (typeof val !== "number" || val < 0 || val > 10) {
            throw new Error('Score is invalid')
        }
    }

    constructor(value: Score, frame: FrameInterface) {
        this.assertIsValidScore(value)
        this._score = value
        this._frame = frame
    }

    set score(value: Score) {
        this._score = value
    }

    get score() {
        return this._score
    }

    get frame() {
        return this._frame
    }


    get isStrike() {
        return this._score === 10
    }

    get isMiss() {
        return this._score === 0
    }
}