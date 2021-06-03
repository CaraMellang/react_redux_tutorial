import { createAction, handleActions } from "redux-actions";
import produce from "immer";

//액션 타입 정의
const CHANGE_INPUT = "todos/CHANGE_INPUT"; //인풋값을 변경
const INSERT = "todos/INSERT"; // 새로운 todo를 등록
const TOGGLE = "todos/TOGGLE"; // todo체크/체크를 해제
const REMOVE = "todos/REMOVE"; // todo를 제거

//액션 함수 생성

// export const changeInput = (input) => ({
//   type: CHANGE_INPUT,
//   input,
// });

export const changeInput = createAction(CHANGE_INPUT, (input) => input);

let id = 3; // insert가 호출될 때마다 1씩 더해짐(밑에 2개 미리 만들기에 값을 3으로 해놈)

export const insert = createAction(INSERT, (text) => ({
  id: id++,
  text,
  done: false,
}));

// export const insert = (text) => ({
//   type: INSERT,
//   todo: {
//     id: id++,
//     text,
//     done: false,
//   },
// });

export const toggle = createAction(TOGGLE, (id) => id);

// export const toggle = (id) => ({
//   type: TOGGLE,
//   id,
// });

export const remove = createAction(REMOVE, (id) => id);

// export const remove = (id) => ({
//   type: REMOVE,
//   id,
// });

//초기상태 및 리듀서 함수 만들기
const initialState = {
  input: "",
  todos: [
    {
      id: 1,
      text: "리덕스 기초 배우기",
      done: true,
    },
    {
      id: 2,
      text: "리액트와 리덕스 사용하기",
      done: false,
    },
  ],
};

//리듀서
const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input }),
    [INSERT]: (state, { payload: todo }) => ({
      ...state,
      todos: state.todos.concat(todo),
    }),
    //immer 라이브러리 사용코드 toggle제외 코드는 안쓰는게 더 짧음
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, (draft) => {
        const todo = draft.todos.find((todo) => todo.id === id);
        todo.done = !todo.done;
      }),
    // [TOGGLE]: (state, { payload: id }) => ({
    //   ...state,
    //   todos: state.todos.map((todo) =>
    //     todo.id === id ? { ...todo, done: !todo.done } : todo
    //   ),
    // }),
    [REMOVE]: (state, { payload: id }) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id),
    }),
  },
  initialState
);

// function todos(state = initialState, action) {
//   switch (action.type) {
//     case CHANGE_INPUT:
//       return {
//         ...state,
//         input: action.input,
//       };
//     case INSERT:
//       return {
//         ...state,
//         todos: state.todos.concat(action.todo),
//       };
//     case TOGGLE:
//       return {
//         ...state,
//         todos: state.todos.map((todo) =>
//           todo.id === action.id ? { ...todo, done: !todo.done } : todo
//         ),
//       };
//     case REMOVE:
//       return {
//         ...state,
//         todos: state.todos.filter((todo) => todo.id !== action.id),
//       };
//     default:
//       return state;
//   }
// }

export default todos;
