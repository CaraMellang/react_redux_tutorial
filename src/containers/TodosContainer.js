import React, { useCallback } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { changeInput, insert, toggle, remove } from "../modules/todos";
import Todos from "../components/Todos";
import useActions from "../lib/useActions";

const TodosContainer = () => {
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }));

  const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
    [changeInput, insert, toggle, remove],
    []
  );

  // const dispatch = useDispatch();
  // const onChangeInput = useCallback(
  //   (input) => dispatch(changeInput(input)),
  //   [dispatch]
  // );
  // const onInsert = useCallback((text) => dispatch(insert(text)), [dispatch]);
  // const onToggle = useCallback((id) => dispatch(toggle(id)), [dispatch]);
  // const onRemove = useCallback(
  //   (id) => {
  //     dispatch(remove(id));
  //     console.log(todos);
  //   },
  //   [dispatch, todos]
  // );
  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};

//connect(mapStateToProps,mapDispatchToProps)(연동할 컴포넌트)
//  useSelector를 사용해 리덕스상태 조회시 React.memo로 최적화(리렌더링 방지)
// 해줘야함(connect는 자동으로 리렌더링 방지)
export default React.memo(TodosContainer);
//이렇게 바로 즉석으로 해줄수도 있음
// mapDispatchToProps에 함수형태 파라미터가 아닌
// 액션생성함수로 이루어진 객체형태로 넣으면 connect함수가
// 내부적으로 bindActionCreators작업을 해줌
