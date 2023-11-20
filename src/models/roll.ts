export type Score = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export type RollInterface = Pick<Roll, keyof Roll>

export class Roll {
    private _score: Score
    private _spare: boolean = false

    assertIsValidScore(val: any): asserts val is Score {
        if (typeof val !== "number" || val < 0 || val > 10) {
            throw new Error('Score is invalid')
        }
    }

    constructor(value: Score) {
        this.assertIsValidScore(value)
        this._score = value
    }

    set score(value: Score) {
        this._score = value
    }

    get score() {
        return this._score
    }

    set spare(value: boolean) {
        this._spare = value
    }

    get isSpare() {
        return this._spare
    }


    get isStrike() {
        return this._score === 10
    }

    get isMiss() {
        return this._score === 0
    }
}