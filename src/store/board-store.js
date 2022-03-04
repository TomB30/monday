import { boardService } from "../services/board-service"


export const boardStore = {
    state: {
        boards: [],
        selectedBoard: null
    },
    getters: {
        selectedBoard({ selectedBoard }) {
            return JSON.parse(JSON.stringify(selectedBoard))
        },
        boards({ boards }) {
            return boards
        }
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards
        },
        setBoard(state, { board }) {
            state.boards = state.boards.map(b => b._id !== board._id ? b : board)
            state.selectedBoard = board
        }
    },
    actions: {
        async loadBoards({ commit, state }) {
            try {
                const boards = await boardService.loadBoards()
                if (!state.selectedBoard) {
                    commit({ type: 'setBoard', board:boards[0] })
                }
                commit({ type: 'setBoards', boards })
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
                const updatedBoard = await boardService.save(board)
            } catch (err) {
                console.log(`couldn't save board ${board._id} , ${err}`);
                commit({ type: 'setBoard', prevBoard })
            }
        }
    }
}