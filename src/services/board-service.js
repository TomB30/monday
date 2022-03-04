import { utilService } from "./util-service.js"
import { storageService } from "./async-storage-service.js"
import { httpService } from "./http-service.js"
import { end } from "cheerio/lib/api/traversing"
const BOARDS_KEY = 'boardsDB'
const endpoint = 'board/'

export const boardService = {
    getEmptyBoard,
    getEmptyGroup,
    getEmptyTask,
    loadBoards,
    save,
    getBoardById
}

function loadBoards() {
    return httpService.get(endpoint).then(boards=> {
        if(!boards || !boards.length){
            console.log('no boards found');
            const board = _createBoard()
            return httpService.post(endpoint,{board}).then(board => [board])
        }else {
            return boards
        }
    })
}

function getBoardById(boardId) {
    return storageService.get(BOARDS_KEY, boardId)
}

function save(board) {
    if (board._id) return httpService.put(endpoint, {board})
    else return httpService.post(endpoint, {board})
}


function _createBoard() {
    return {
        "title": "Robot dev proj",
        "description": "Add a description",
        "createdAt": 1589983468418,
        "createdBy": {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "labels": [
            {
                "id": "l101",
                "title": "Done",
                "color": "#61bd4f"
            }
        ],
        "members": [
            {
                "_id": "u101",
                "fullname": "Tal Tarablus",
                "imgUrl": "https://www.google.com"
            }
        ],
        "groups": [
            {
                "id": "g101",
                "title": "Group 1",
                "tasks": [
                    {
                        "id": "c101",
                        "title": "Replace logo"
                    },
                    {
                        "id": "c102",
                        "title": "Add Samples"
                    }
                ],
                "style": {},
                "color": 'orange'
            },
            {
                "id": "g102",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Do that"
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "description": "description",
                        "comments": [
                            {
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436.0,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            }
                        ],
                        "checklists": [
                            {
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [
                                    {
                                        "id": "212jX",
                                        "title": "To Do 1",
                                        "isDone": false
                                    }
                                ]
                            }
                        ],
                        "members": [
                            {
                                "_id": "u101",
                                "username": "Shuki",
                                "fullname": "Chopo Sami",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            },
                            {
                                "_id": "u101",
                                "username": "Muki",
                                "fullname": "Muki Shakshuka",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            },
                            {
                                "_id": "u101",
                                "username": "Tal",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        ],
                        "labelIds": ["l101", "l102"],
                        "createdAt": 1590999730348,
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "bgColor": "#26de81"
                        }
                    }
                ],
                "style": {},
                "color": 'turquoise'
            }
        ],
        "activities": [
            {
                "id": "a101",
                "txt": "Changed Color",
                "createdAt": 154514,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "task": {
                    "id": "c101",
                    "title": "Replace Logo"
                }
            }
        ],
        "colors": ['#037f4c', '#00c875', '#9cd326', '#cab641', '#ffcb00', '#784bd1', '#a25ddc', '#0086c0', '#579bfc', '#bb3354', '#e2445c', '#ff158a', '#ff5ac4', '#ff642e', '#fdab3d', '#7f5347', '#c4c4c4', '#808080'],
        // for monday
        "cmpsOrder": [{ type: "status-picker", width: 130, minWidth: 90 }, { type: "member-picker", width: 140, minWidth: 100 }, { type: 'timeline-picker', width: 180, minWidth: 180 }, { type: "date-picker", width: 130, minWidth: 100 }]
    }
}



function getEmptyBoard() {
    return {
        title: '',
        description: '',
        createdAt: null,
        updatedAt: null,
        createdBy: null,
        labels: [],
        members: [],
        groups: [],
        activities: [],
    }
}

function getEmptyGroup() {
    return {
        id: utilService.makeId(),
        title: 'New Group',
        tasks: [],
        color: '',
    }
}

function getEmptyTask() {
    return {
        id: utilService.makeId(),
        title: 'New Task',
        members: []
    }
}

function saveBoards(boards = gBoards) {
    storageService.saveToStorage(BOARDS_KEY, boards)
}

function loadBoardsFromStorage() {
    return storageService.loadFromStorage(BOARDS_KEY)
}