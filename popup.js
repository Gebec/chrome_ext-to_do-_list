window.onload = function() {
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

