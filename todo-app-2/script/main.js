window.onload = function(){

    // get reference to element containing toppings checkboxes
var el = document.getElementById('kontrol');

// get reference to input elements in toppings container element
var tops = el.getElementsByTagName('input');

// assign function to onclick property of each checkbox
for (var i=0, len=tops.length; i<len; i++) {
    if ( tops[i].type == 'checkbox' ) {
        tops[i].onclick = function() {
            alert("wwerwerewr");
        }
    }
}
    
    var add_item = document.querySelector("input");
    var button_add_item = document.querySelector("span");
    

    add_item.onkeypress = function(add){
        if(add.which == 13){
            var todo_element = document.createElement("LI");
            var input_element = document.createElement("INPUT");

            var date = new Date();
            var now = date.getDate() + " / " + date.getDate() + " / " + date.getFullYear();

            input_element.setAttribute("type", "checkbox");
            input_element.setAttribute("value", "x");
            var item_val = document.createTextNode(this.value);
            var create_time_item = document.createTextNode(now);
        
            //add elements
            var in_span_val = document.createElement("SPAN");
            var in_small_val = document.createElement("SMALL");
            
            in_span_val.appendChild(item_val);
            in_small_val.appendChild(create_time_item);

            todo_element.appendChild(input_element);
            todo_element.appendChild(in_span_val);
            todo_element.appendChild(in_small_val);
            document.getElementsByClassName("readyItems")[0].appendChild(todo_element);
        
            this.value = "";
        }
    }

    button_add_item.onclick = function(clicked){
        var todo_element = document.createElement("LI");
        var item_val = document.createTextNode(add_item.value);
        var input_element = document.createElement("INPUT");

        var date = new Date();
        var now = date.getDate() + " / " + date.getDate() + " / " + date.getFullYear();

        input_element.setAttribute("type", "checkbox");
        input_element.setAttribute("value", "x");
        var create_time_item = document.createTextNode(now);

        //add elements
        var in_span_val = document.createElement("SPAN");
        var in_small_val = document.createElement("SMALL");

        in_span_val.appendChild(item_val);
        in_small_val.appendChild(create_time_item);
        
        todo_element.appendChild(input_element);
        todo_element.appendChild(in_span_val);
        todo_element.appendChild(in_small_val);
        document.getElementsByClassName("readyItems")[0].appendChild(todo_element);
       
        document.querySelector("input").value = "";
    }
    
}
