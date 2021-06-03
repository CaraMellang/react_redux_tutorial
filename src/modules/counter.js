import { createAction, handleAction, handleActions } from "redux-actions";

//액션 타입 정의.(대문자로 정의)
const INCREASE = "counter/INCREASE"; //문자열 내용은 '모듈이름/액션이름' 형태로 작성
const DECREASE = "counter/DECREASE";

//액션 생성 함수 생성
export const increase = () => ({ type: INCREASE });
export const decrease = createAction(DECREASE); //redux-actions라이브러리로 대체가능

//초기 상태 및 리듀서 함수 생성
const initialState = {
  //초기상태
  number: 0,
};

// function counter(state = initialState, action) {
//   switch (action.type) {
//     case INCREASE:
//       return {
//         number: state.number + 1,
//       };
//     case DECREASE:
//       return {
//         number: state.number - 1,
//       };
//     default:
//       return state;
//   }
// }

const counter = handleActions(
  //대체가능
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  }, //각 액션에 대한 업데이트 함수
  initialState //초기상태
);

export default counter; //리듀서를 default로 내보냄
