import { boardService } from "../services/board-service"


export const boardStore = {
    state: {
        boards: [],
        selectedBoard: null,
        currTask: null
    },
    getters: {
        selectedBoard({ selectedBoard }) {
            return JSON.parse(JSON.stringify(selectedBoard))
        },
        boards({ boards }) {
            return boards
        },
        currTask({currTask}){
            return currTask
        }
    },
    mutations: {
        setTask(state,{groupId,taskId}){
            const task = state.selectedBoard.groups.find(g => g.id === groupId).tasks.find(t => t.id === taskId)
            state.currTask = task
        },
        setBoards(state, { boards }) {
            state.boards = boards
        },
        setBoard(state, { board }) {
            state.selectedBoard = board
            if(!board) return;
            state.boards = state.boards.map(b => b._id !== board._id ? b : board)
        },
        setBoardById(state,  boardId ) {
            const board = state.boards.find(b => b._id === boardId)
            state.selectedBoard = board
        },
        addBoard(state, {savedBoard}){
            state.boards.push(savedBoard)
            state.selectedBoard = savedBoard
        },
        removeBoard(state, {boardId}){
            const idx = state.boards.findIndex(b => b._id === boardId)
            if(idx !== -1) state.boards.splice(idx,1)
            state.selectedBoard = state.boards[0]
        }
    },
    actions: {
        setTask({commit},{groupId,taskId}){
            commit({type:'setTask',groupId,taskId})
        },  
        async loadBoards({ commit, state ,rootGetters}) {
            try {
                const userId = rootGetters.loggedInUser._id
                const boards = await boardService.loadBoards(userId)
                commit({ type: 'setBoards', boards })
                if (!state.selectedBoard) {
                    commit({ type: 'setBoard', board:boards[0] })
                }
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
        async updateBoard({ commit, state, rootGetters }, { board }) {
            const prevBoard = state.selectedBoard
            commit({ type: 'setBoard', board })
            if(rootGetters.loggedInUser.email === 'guest@guest.com') return
            try {
                const updatedBoard = await boardService.save(board)
                return updatedBoard
            } catch (err) {
                console.log(`couldn't save board ${board._id} , ${err}`);
                commit({ type: 'setBoard', prevBoard })
            }
        },
        async createBoard({commit}){
            const board = boardService.getEmptyBoard()
            try {
               const savedBoard = await boardService.save(board)
               commit({type:'addBoard',savedBoard})
               return savedBoard
            } catch(err){
                console.log(err, 'Failed to create board');
            }
        },
        async removeBoard({commit,state},{boardId}){
            const prevBoards = state.boards
            try{
                await boardService.removeBoard(boardId)
                commit({type:'removeBoard',boardId})
            } catch(err){
                console.log('Failed to delete board');
                commit({type:'setBoards', boards:prevBoards})
            }
        }
    }
}