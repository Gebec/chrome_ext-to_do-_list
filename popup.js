window.onload = function() {
	renderer();

	document.getElementById('add_new').addEventListener("click", function(){
		let value_to_add = document.getElementById("text_of_new").value;
		console.log(value_to_add);

		let list = []
		list = get_cookies();
		console.log(list);
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

// DONE
let renderer = function() {
	clear_list();

	append_list(get_cookies());
};

// DONE
let clear_list = function() {
	let actual_list = document.getElementById("to_do_list");
	while (actual_list.firstChild) {
		actual_list.removeChild(actual_list.firstChild);
	}
}

// DONE
let append_list = function(list) {

	for (to_do in list) {
		console.log(list[to_do]);
		append_element(list[to_do]['name'], list[to_do]['checked']);
	}
}

// DONE
let append_element = function(value, checked) {
	let parent = document.getElementById("to_do_list");

	let new_input = document.createElement("input");
	new_input.setAttribute("type", "checkbox");
	new_input.setAttribute("value", value);
	new_input.setAttribute("checked", checked);

	let input_placeholder = document.createTextNode(value);
	let new_line = document.createElement("br");

	parent.appendChild(new_input);
	parent.appendChild(input_placeholder);
	parent.appendChild(new_line);
}

// DONE
let get_cookies = function() {
	console.log(document.cookie);
	let test = document.cookie;
	if (test) {
		return JSON.parse(test);
	}
	return '';
};

// DONE
let uncheck_all = function(list) {
	let length = list.length;

	for (let i = 0; i < length; i++) {
		if (list[i].checked) {
			list[i].checked = false;
		}
	}

	save_cookies(list);

};

// DONE
let save_cookies = function(list, new_input){
	document.cookie = format_cookies(list, new_input);
	renderer(); // render after save
}

// DONE
let format_cookies = function(list, new_input) {
	let formated_list = [];

	for (input in list) {
		formated_list.push({
			"name": input.value,
			"checked": input.checked
		});
	};
	formated_list.push(new_input);
	return JSON.stringify(formated_list);
};

// DONE
let remove_selected = function(list) {
	let new_list = [];

	for (to_do in list) {
		if (!list[to_do]['checked']) {
			new_list.push(list[to_do]);
		};
	};

	save_cookies(new_list);
}