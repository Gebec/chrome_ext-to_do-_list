window.onload = () => {
	//document.cookie =  '[]; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	renderer(get_cookies());

	document.getElementById('text_of_new').addEventListener("keydown", () => {
		(event.key === 'Enter') && new_input_submited();
	});

	document.getElementById('text_of_new').addEventListener("keyup", () => {
		let input = document.getElementById('text_of_new');
		input.value = input.value.replace(/;*=*/g,"");
	});

	document.getElementById('add_new').addEventListener("click", () => {
		new_input_submited();
	});

	document.getElementById('show_finished').addEventListener("click", () => {
		show_finished(get_cookies());
	});

	document.getElementById('show_unfinished').addEventListener("click", () => {
		show_unfinished(get_cookies());
	});

	document.getElementById('show_all').addEventListener("click", () => {
		renderer(get_cookies());
	});

	document.getElementById('uncheck_selected').addEventListener("click", () => {
		uncheck_all(get_cookies());
	});

	document.getElementById('remove_selected').addEventListener("click", () => {
		const input_list = document.querySelectorAll('input[type=checkbox]');
		remove_selected(input_list);
	});

}

new_input_submited = () => {
	const text_box = document.getElementById("text_of_new");
	text_box.value && add_new_input(text_box.value);

	text_box.value = '';
};

add_new_input = value => {
	const list = get_cookies();
	save_cookies(
		list,
		{
			"name": value,
			"checked": false
		}
	);
}

renderer = (list) => {
	clear_list();

	append_list(list);

	add_check_listener();
	add_change_order_listener();
};

clear_list = () => {
	const actual_list = document.getElementById("to_do_list");
	while (actual_list.firstChild) {
		actual_list.removeChild(actual_list.firstChild);
	}
}

append_list = list => {
	for (to_do in list) {
		append_element(list[to_do]['name'], list[to_do]['checked'], to_do);
	}
}

append_element = (value, checked, id) => {
	let list = document.getElementById("to_do_list");

	let  parent_div = document.createElement("div");
	parent_div.setAttribute("class", "input-container");

	let new_input = document.createElement("input");
	new_input.setAttribute("type", "checkbox");
	new_input.setAttribute("value", value);
	new_input.setAttribute("id", id);
	checked && new_input.setAttribute("checked", true);

	let input_label = document.createElement("label");
	input_label.setAttribute("for", id);
	input_label.innerHTML = value;

	let change_up_button = document.createElement("button");
	change_up_button.setAttribute("class", "button button__arrow");
	change_up_button.innerHTML = "&#11205;";
	change_up_button.setAttribute("data-row", id);
	change_up_button.setAttribute("data-direction", 'up');

	let change_down_button = document.createElement("button");
	change_down_button.setAttribute("class", "button button__arrow button__arrow--left");
	change_down_button.innerHTML = "&#11206;";
	change_down_button.setAttribute("data-row", id);
	change_down_button.setAttribute("data-direction", 'down');


	parent_div.appendChild(new_input);
	parent_div.appendChild(input_label);
	parent_div.appendChild(change_up_button);
	parent_div.appendChild(change_down_button);

	list.appendChild(parent_div);
}

add_check_listener = () => {
	const checkbox_list = document.querySelectorAll("input[type=checkbox]");

	for (let checkbox of checkbox_list) {
		checkbox.addEventListener('change', function() {
			change_check_state(this.id, this.checked);
		});
	}
}

change_check_state = (id, state) => {
	const list = get_cookies();
	list[id]['checked'] = state;

	save_cookies(list);
}

add_change_order_listener = () => {
	const change_order_button_list = document.querySelectorAll("button[data-row]");

	for (let button of change_order_button_list) {
		button.addEventListener('click', function() {
			move_input(this.getAttribute('data-row'), this.getAttribute('data-direction'));
		});
	}
}

move_input = (row, direction) => {
	let input_list = get_cookies();
	direction === 'up' ? move_input_one_up(row) : move_input_one_down(row);
}

move_input_one_down = (row) => {
	let input_list = get_cookies();

	// For some reason [row + 1] throws an error. So I have to do row++ and use [row - 1]
	row++;
	if (input_list[row]) {
		let temp = input_list[row];
		input_list[row] = input_list[row - 1];
		input_list[row - 1] = temp;

		save_cookies(input_list);
		renderer(get_cookies());
	}
}

move_input_one_up = (row) => {
	let input_list = get_cookies();

	if (input_list[row-1]) {
		let temp = input_list[row];
		input_list[row] = input_list[row - 1];
		input_list[row - 1] = temp;


		save_cookies(input_list);
		renderer(get_cookies());
	}
}

get_cookies = () => {
	const cookies = document.cookie;
	if (cookies) {
		return JSON.parse(cookies);
	}
	return [];
};

uncheck_all = (list) => {
	for (let input in list) {
		list[input].checked && (list[input].checked = false);
	}

	save_cookies(list);
};

save_cookies = (list, new_input) => {
	new_input && list.push(new_input);

	document.cookie = format_cookies(list);
	renderer(get_cookies());
}

format_cookies = (list) => {
	const formated_list = list.map(input => {
		return {
			"name": input.name,
			"checked": input.checked
		}
	});

	return JSON.stringify(formated_list);
};

remove_selected = list => {
	const new_list = [];

	for (let to_do of list) {
		if (!to_do.checked) {
			new_list.push({
				"name": to_do.value,
				"checked": to_do.checked
			});
		};
	};

	save_cookies(new_list);
}

show_finished = () => {
	const list = get_cookies();

	const finished_list = list.filter(input => {
		return input.checked;
	});

	renderer(finished_list);
}

show_unfinished = () => {
	const list = get_cookies();

	const unfinished_list = list.filter(input => {
		return !input.checked;
	});

	renderer(unfinished_list);
}