import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
	const setToDos = useSetRecoilState(toDoState);
	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const {
			currentTarget: { name },
		} = event;
		setToDos((oldToDos) => {
			const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
			const newToDo = { text, id, category: name as IToDo["category"] };
			return [
				...oldToDos.slice(0, targetIndex),
				newToDo,
				...oldToDos.slice(targetIndex + 1),
			];
			// const newTodos = [...prevTodos]; // create new array
			// newTodos.splice(targetIndex, 1, newTodo);
			// return newTodos;
		});
		// setToDos((prevToDos) => {
		// 	return prevToDos.map((toDo) =>
		// 		toDo.id === id ?
		// 			{ ...toDo, category: name as IToDo["category"] } : toDo
		// 	);
		// });
	};
	// const onClick = (category: ToDo["category"]) => {
	// 	setToDos((prev) =>
	// 		prev.map((toDo) => {
	// 			if (toDo.id === id) {
	// 				return { ...toDo, category };
	// 			}
	// 			return toDo;
	// 		})
	// 	);
	// };
	return (
		<li>
			<span>{text}</span>
			{category !== Categories.DOING && (
				<button name={Categories.DOING} onClick={onClick}>
					Doing
				</button>
			)}
			{category !== Categories.TO_DO && (
				<button name={Categories.TO_DO} onClick={onClick}>
					To Do
				</button>
			)}
			{category !== Categories.DONE && (
				<button name={Categories.DONE} onClick={onClick}>
					Done
				</button>
			)}
		</li>
	);
}

export default ToDo;