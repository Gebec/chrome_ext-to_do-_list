window.onload = function() {
	//document.cookie =  '[]; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	renderer();

	document.getElementById('add_new').addEventListener("click", function(){
		let value_to_add = document.getElementById("text_of_new").value;

		let list = []
		list = get_cookies();
		save_cookies(
			list,
			{
				"name": value_to_add,
				"checked": false
			}
		);
	});

	document.getElementById('uncheck_selected').addEventListener("click", function(){
		uncheck_all(get_cookies());
	});

	document.getElementById('remove_selected').addEventListener("click", function(){
		let input_list = document.querySelectorAll('input[type=checkbox]');
		remove_selected(input_list);
	});

}

let renderer = function() {
	clear_list();

	append_list(get_cookies());
};

let clear_list = function() {
	let actual_list = document.getElementById("to_do_list");
	while (actual_list.firstChild) {
		actual_list.removeChild(actual_list.firstChild);
	}
}

let append_list = function(list) {
	for (to_do in list) {
		append_element(list[to_do]['name'], list[to_do]['checked']);
	}
}

let append_element = function(value, checked) {
	let parent = document.getElementById("to_do_list");

	let new_input = document.createElement("input");
	new_input.setAttribute("type", "checkbox");
	new_input.setAttribute("value", value);
	checked && new_input.setAttribute("checked");

	let input_placeholder = document.createTextNode(value);
	let new_line = document.createElement("br");

	parent.appendChild(new_input);
	parent.appendChild(input_placeholder);
	parent.appendChild(new_line);
}

let get_cookies = function() {
	let test = document.cookie;
	if (test) {
		return JSON.parse(test);
	}
	return '';
};

let uncheck_all = function(list) {
	for (let input in list) {
		list[input].checked && (list[input].checked = false);
	}

	save_cookies(list);
};

let save_cookies = function(list, new_input){
	document.cookie = format_cookies(list, new_input);
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

	for (to_do in list) {
		if (!list[to_do]['checked']) {
			new_list.push(list[to_do]);
		};
	};

	save_cookies(new_list);
}