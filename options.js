$(function(){

	$('#add_new').click(function(){
        let value_to_add = document.getElementById("text_of_new").value;
        let new_input = document.createElement("input");
        let input_placeholder = document.createTextNode(value_to_add);
        new_input.setAttribute("type", "checkbox");
        new_input.setAttribute("value", value_to_add);
        let new_line = document.createElement("br");

        let to_do_list = document.getElementById("to_do_list");
        to_do_list.appendChild(input_placeholder);
        to_do_list.appendChild(new_input);
        to_do_list.appendChild(new_line);
	});

    document.getElementById("remove").onclick = function() {
        let input_list = document.querySelectorAll('input[type=checkbox]');
        let length = input_list.length;
        let new_list = [];

        for (let i = 0; i < length; i++) {
          if (!input_list[i].checked) {
            new_list.push(input_list[i]);
          }
        }

        let renderer = document.getElementById("to_do_list");
        while (renderer.firstChild) {
          renderer.removeChild(renderer.firstChild);
        }

        for (let input of new_list) {
            let text_node = document.createTextNode(input.value);
            let new_line = document.createElement("br");

            renderer.appendChild(text_node);
            renderer.appendChild(input);
            renderer.appendChild(new_line);
        }
      }
});