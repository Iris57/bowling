import { unref } from "vue";
import { useGame } from "./use-game";

// in the best case, we would test the models, but to keep tests shorter, just standard and example/edge case tests are done here
describe('useGame', () => {
    const testGame = useGame()
    beforeEach(() => {
        testGame.reset();
    })

    test('limits maxInput based on previous roll', () => {
        const { input, roll, maxInput } = testGame
        input.value = 5
        roll()
        expect(unref(maxInput)).toBe(5)
    })

    test('calculates correct frame number for standards', () => {
        const { game, input, roll } = testGame
        input.value = 5
        roll()
        input.value = 3
        roll()
        expect(unref(game).frames[0].score).toBe(8)
    })

    test('has correct frame numbers after strike and spare', () => {
        const { game, input, roll } = testGame

        // round 1
        input.value = 10
        roll()
        expect(unref(game).frames[0].score).toBe(null)

        // round 2
        input.value = 7
        roll()
        expect(unref(game).frames[0].score).toBe(null)
        input.value = 3
        roll()
        expect(unref(game).frames[0].score).toBe(20)
        expect(unref(game).frames[1].score).toBe(null)

        // round 3
        input.value = 9
        roll()
        expect(unref(game).frames[0].score).toBe(20)
        expect(unref(game).frames[1].score).toBe(39)
        expect(unref(game).frames[2].score).toBe(null)
        input.value = 0
        roll()
        expect(unref(game).frames[0].score).toBe(20)
        expect(unref(game).frames[1].score).toBe(39)
        expect(unref(game).frames[2].score).toBe(48)

        // round 4
        input.value = 10
        roll()
        expect(unref(game).frames[0].score).toBe(20)
        expect(unref(game).frames[1].score).toBe(39)
        expect(unref(game).frames[2].score).toBe(48)
        expect(unref(game).frames[3].score).toBe(null)

        // round 5
        input.value = 0
        roll()
        expect(unref(game).frames[0].score).toBe(20)
        expect(unref(game).frames[1].score).toBe(39)
        expect(unref(game).frames[2].score).toBe(48)
        expect(unref(game).frames[3].score).toBe(null)
        expect(unref(game).frames[4].score).toBe(null)
        input.value = 8
        roll()
        expect(unref(game).frames[0].score).toBe(20)
        expect(unref(game).frames[1].score).toBe(39)
        expect(unref(game).frames[2].score).toBe(48)
        expect(unref(game).frames[3].score).toBe(66)
        expect(unref(game).frames[4].score).toBe(74)
    })

    test('last frame without strike', () => {
        const { game, input, roll, maxInput, isGameOver } = testGame
        for (let i = 0; i <= 8; i++) {
            input.value = 10
            roll()
        }

        input.value = 7
        roll()
        expect(unref(maxInput)).toBe(3)

        input.value = 2
        roll()

        expect(unref(game).frames[8].score).toBe(256)
        expect(unref(game).frames[9].score).toBe(265)
        expect(unref(isGameOver)).toBe(true)
    })

    test('last frame with strike', () => {
        const { game, input, roll, maxInput, isGameOver } = testGame
        for (let i = 0; i <= 9; i++) {
            input.value = 10
            roll()
        }

        input.value = 7
        roll()

        expect(unref(game).frames[8].score).toBe(267)
        expect(unref(maxInput)).toBe(3)

        input.value = 2
        roll()

        expect(unref(game).frames[9].score).toBe(286)
        expect(unref(isGameOver)).toBe(true)
    })

    test('golden game', () => {
        const { game, input, roll, isGameOver } = testGame
        for (let i = 0; i <= 12; i++) {
            input.value = 10
            roll()
        }
        expect(unref(game).frames[0].score).toBe(30)
        expect(unref(game).frames[1].score).toBe(60)
        expect(unref(game).frames[2].score).toBe(90)
        expect(unref(game).frames[3].score).toBe(120)
        expect(unref(game).frames[4].score).toBe(150)
        expect(unref(game).frames[5].score).toBe(180)
        expect(unref(game).frames[6].score).toBe(210)
        expect(unref(game).frames[7].score).toBe(240)
        expect(unref(game).frames[8].score).toBe(270)
        expect(unref(game).frames[9].score).toBe(300)
        expect(unref(isGameOver)).toBe(true)
    })
})