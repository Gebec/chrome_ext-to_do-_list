window.onload = () => {
	//document.cookie =  '[]; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	renderer();

	document.getElementById('text_of_new').addEventListener("keydown", () => {
		(event.key === 'Enter') && new_input_submited();
	});

	document.getElementById('add_new').addEventListener("click", () => {
		new_input_submited();
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

renderer = () => {
	clear_list();

	append_list(get_cookies());

	add_check_listener();
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

	let new_input = document.createElement("input");
	new_input.setAttribute("type", "checkbox");
	new_input.setAttribute("value", value);
	new_input.setAttribute("id", id);
	checked && new_input.setAttribute("checked", true);

	let input_label = document.createElement("label");
	input_label.setAttribute("for", id);
	input_label.innerHTML = value;

	let new_line = document.createElement("br");

	parent_div.appendChild(new_input);
	parent_div.appendChild(input_label);
	parent_div.appendChild(new_line);

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
	renderer();
}

format_cookies = (list, new_input) => {
	const formated_list = [];

	for (let input in list) {
		formated_list.push({
			"name": list[input].name,
			"checked": list[input].checked
		});
	};

	new_input && formated_list.push(new_input);

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