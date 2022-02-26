import { boardService } from "../services/board-service"


export const boardStore = {
    state: {
        boardIds: [],
        selectedBoard: null
    },
    getters: {
        selectedBoard({ selectedBoard }) {
            return selectedBoard
        },
        boards({ boardIds }) {
            return boardIds
        }
    },
    mutations: {
        setBoards(state, { boardIds }) {
            state.boardIds = boardIds
        },
        setBoard(state, { board }) {
            state.selectedBoard = board
        }
    },
    actions: {
        async loadBoards({ commit, state }) {
            try {
                const boardIds = await boardService.loadBoards()
                if (!state.selectedBoard) {
                    const board = await boardService.getBoardById(boardIds[0])
                    commit({ type: 'setBoard', board })
                }
                commit({ type: 'setBoards', boardIds })
            } catch (err) {
                console.log('Couldn\'t load boards', err);
            }
        },
        async loadBoard({ commit }, { boardId }) {
            try {
                const board = await boardService.getBoardById(boardId)
                commit({ type: 'setBoard', board })
            } catch (err) {
                console.log(`Couldn't load board ${boardId}`);
            }
        },
        async updateBoard({ commit, state }, { board }) {
            const prevBoard = state.selectedBoard
            commit({ type: 'setBoard', board })
            try {
                const updatedBoard = await boardService.save(JSON.parse(JSON.stringify(board)))
            } catch (err) {
                console.log(`couldn't save board ${board._id} , ${err}`);
                commit({ type: 'setBoard', prevBoard })
            }
        }
    }
}