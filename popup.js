window.onload = function() {
	//document.cookie =  '[]; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	renderer();

	document.getElementById('text_of_new').addEventListener("keydown", function(){
		(event.key === 'Enter') && new_input_submited();
	});

	document.getElementById('add_new').addEventListener("click", function(){
		new_input_submited();
	});

	document.getElementById('uncheck_selected').addEventListener("click", function(){
		uncheck_all(get_cookies());
	});

	document.getElementById('remove_selected').addEventListener("click", function(){
		let input_list = document.querySelectorAll('input[type=checkbox]');
		remove_selected(input_list);
	});

}

let new_input_submited = function() {
	let text_box = document.getElementById("text_of_new");
	text_box.value && add_new_input(text_box.value);

	text_box.value = '';
};

let add_new_input = function(value) {
	let list = get_cookies();
	save_cookies(
		list,
		{
			"name": value,
			"checked": false
		}
	);
}

let renderer = function() {
	clear_list();

	append_list(get_cookies());

	add_check_listener();
};

let clear_list = function() {
	let actual_list = document.getElementById("to_do_list");
	while (actual_list.firstChild) {
		actual_list.removeChild(actual_list.firstChild);
	}
}

let append_list = function(list) {
	for (to_do in list) {
		append_element(list[to_do]['name'], list[to_do]['checked'], to_do);
	}
}

let append_element = function(value, checked, id) {
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

let add_check_listener = function() {
	let checkbox_list = document.querySelectorAll("input[type=checkbox]");

	for (let checkbox of checkbox_list) {
		checkbox.addEventListener('change', function() {
			change_check_state(this.id, this.checked);
		});
	}
}

let change_check_state = function(id, state) {
	let list = get_cookies();
	list[id]['checked'] = state;

	save_cookies(list);
}

let get_cookies = function() {
	let cookies = document.cookie;
	if (cookies) {
		return JSON.parse(cookies);
	}
	return [];
};

let uncheck_all = function(list) {
	for (let input in list) {
		list[input].checked && (list[input].checked = false);
	}

	save_cookies(list);
};

let save_cookies = function(list, new_input){
	new_input && list.push(new_input);

	document.cookie = format_cookies(list);
	renderer();
}

let format_cookies = function(list, new_input) {
	let formated_list = [];

	for (let input in list) {
		formated_list.push({
			"name": list[input].name,
			"checked": list[input].checked
		});
	};

	new_input && formated_list.push(new_input);

	return JSON.stringify(formated_list);
};

let remove_selected = function(list) {
	let new_list = [];

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