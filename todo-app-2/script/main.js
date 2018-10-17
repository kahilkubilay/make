window.onload = function(){

   
    
    var add_item = document.querySelector("input");
    var button_add_item = document.querySelector("span");
    
    add_item.onkeypress = function(add){
        if(add.which == 13){
            //create element
            var todo_element = document.createElement("LI");
            var in_span = document.createElement("SPAN");
            var in_small = document.createElement("SMALL");
            //create element input checkbox and value 
            var in_input = document.createElement("INPUT");
            in_input.setAttribute("type", "checkbox");
            in_input.setAttribute("value", "x");

            //create date items
            var date = new Date();
            var now = date.getDate() + "/" + date.getDate() + "/" + date.getFullYear();
            
            //in input value
            
            var create_time_item = document.createTextNode(now);
            var item_val = document.createTextNode(this.value);
            
            in_small.appendChild(create_time_item);
            in_span.appendChild(item_val);
            in_span.appendChild(in_small);

            //pasta values
            todo_element.appendChild(in_input);
            todo_element.appendChild(in_span);
            document.getElementsByClassName("readyItems")[0].appendChild(todo_element);

            //reset input box
            this.value = "";
        }
    }

    button_add_item.onclick = function(clicked){
        var todo_element = document.createElement("LI");
       
        var in_span = document.createElement("SPAN");
        var in_small = document.createElement("SMALL");
        var input_element = document.createElement("INPUT");
        input_element.setAttribute("type", "checkbox");
        input_element.setAttribute("value", "x");

        var date = new Date();
        var now = date.getDate() + " / " + date.getDate() + " / " + date.getFullYear();

       
        var create_time_item = document.createTextNode(now);
        var item_val = document.createTextNode(add_item.value);
        //add elements
       
        in_small.appendChild(create_time_item);
        in_span.appendChild(item_val);
        in_span.appendChild(in_small);
        
        //paste values
        todo_element.appendChild(input_element);
        todo_element.appendChild(in_span);
        document.getElementsByClassName("readyItems")[0].appendChild(todo_element);
       
        //reset input
        document.querySelector("input").value = "";
    }
    
}
