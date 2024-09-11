import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("")
	const [taskList, setTaskList] = useState([])

	const addTask = (task) => {
		if (task.trim() != "") {

			setTaskList(taskList.concat(task))
		}
		setInputValue("")
	}
	const removeTask = (index) => {
		setTaskList(taskList.filter((_, i) => i !== index));
	};
	return (
		<div className=" my-5 container">
			<h1 className="text-center">TODOS</h1>
			<input value={inputValue} onKeyDown={(e) => {
				if (e.key == "Enter") {
					addTask(inputValue)
				}
			}} onChange={(e) => setInputValue(e.target.value)} className="form-control form-control-lg" type="text" placeholder="What is your task?" aria-label=".form-control-lg example"></input>
			<ul className="list-group">
				{taskList.map((item,index) => {
					return (
						<li className="list-group-item d-flex justify-content-between align-items-center" key={index}>{item}
						
						<button type="button" onClick={() => removeTask(index) }  class="btn-close justify-end  " aria-label="Close"></button>
					
						</li>
						
					)
				})}
		
	
			
			<span className="card-footer text-muted">
				{taskList.length} items left
			</span>
			</ul>
		

	
		</div>
	);
};

export default Home;
