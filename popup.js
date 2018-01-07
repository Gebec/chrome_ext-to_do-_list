window.onload = function() {
    (function () {
        let input_list = JSON.parse(localStorage.getItem('to_do_list'));
        let parent = document.getElementById('to_do_list');
        let list_length = input_list.length;

        console.log(input_list);

        for (let i = 0; i < list_length; i++) {
            let input = document.createElement("input");
            input.setAttribute("type", "checkbox");
            input.setAttribute("value", input_list[i]);
            let input_placeholder = document.createTextNode(input_list[i]);
            let new_line = document.createElement("br");

            parent.appendChild(input);
            parent.appendChild(input_placeholder);
            parent.appendChild(new_line);
        }
    })();

	document.getElementById('uncheck').onclick = function() {
		let input_list = document.querySelectorAll('input[type=checkbox]');
		let length = input_list.length;
		for (let i = 0; i < length; i++) {
			if (input_list[i].checked) {
				input_list[i].checked = false;
			}
		}
	};
}

