import { Game, type GameInterface } from "../models/game"
import { Score } from "@/models/roll"
import { Ref, computed, ref, unref } from "vue"

const game = ref(new Game())

const input: Ref<Score> = ref(0)

interface UseGameInterface {
    roll: () => void
    reset: () => void
    input: Ref<Score>
    game: Readonly<Ref<GameInterface>>
    isGameOver: Readonly<Ref<boolean>>
    maxInput: Readonly<Ref<number>>
}

export function useGame(): UseGameInterface {

    const maxInput = computed(() => {
        return unref(game).activeFrame.pinsLeft
    })

    function roll() {
        if (unref(game).isGameOver) {
            return
        }

        unref(game).addRoll(unref(input))
        input.value = 0
    }

    function reset() {
        unref(game).reset()
    }

    const isGameOver = computed(() => unref(game).isGameOver)


    return {
        roll,
        reset,
        game: computed(() => unref(game)),
        input,
        isGameOver,
        maxInput,
    }

}