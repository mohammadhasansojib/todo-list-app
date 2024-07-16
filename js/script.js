

let input_box = document.getElementById("input-box");
let add_btn = document.getElementById("add-btn");
let reset_btn = document.getElementById("reset-btn");

let item_field = document.getElementById("item-field");


add_btn.addEventListener('click', add_fun);
reset_btn.addEventListener('click', reset_fun);

input_box.addEventListener('keydown', (e) => {
    if(e.key == "Enter"){
        add_fun();
    }
});





function add_fun(){

        if(input_box.value == ''){

            let warning_msg = document.createElement('p');
            warning_msg.class = "warning-text";
            warning_msg.style = "background-color : lightyellow; color : black;";
            let msg_text = document.createTextNode('type something');
            warning_msg.appendChild(msg_text);

            let warning_text = document.getElementsByClassName('warning-text');
            for(let i = 0; i < item_field.children.length; i++){
                for(let j = 0; j < item_field.children.length; j++){
                    if(item_field.children[i] == warning_text[j]){
                        item_field.removeChild(item_field.children[i]);
                    }
                }
            }

            item_field.insertAdjacentHTML('beforeend', warning_msg.textContent);


        }else{
            let warning_text = document.getElementsByClassName('warning-text');
            for(let i = 0; i < item_field.children.length; i++){
                for(let j = 0; j < item_field.children.length; j++){
                    if(item_field.children[i] == warning_text[j]){
                        item_field.removeChild(item_field.children[i]);
                    }
                }
            }

            let element = document.createElement('p');

            let label = document.createElement('label');
            let text = document.createTextNode(input_box.value);

            label.appendChild(text);
            element.appendChild(label);

            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';

            let dlt_btn = document.createElement('button');
            let dlt_text = document.createTextNode('delete');
            dlt_btn.appendChild(dlt_text);
            dlt_btn.addEventListener('click', dlt_fun);

            function dlt_fun(){
                for(let i = 0; i < item_field.children.length; i++){
                    if(dlt_btn.parentElement == item_field.children[i]){
                        item_field.removeChild(item_field.children[i]);
                    }
                }
            }


            
            

            let edit_btn = document.createElement('button');
            let edit_text = document.createTextNode('edit');
            edit_btn.appendChild(edit_text);
            edit_btn.addEventListener('click', edit_fun);

            function edit_fun(){

                let edit_input = document.createElement('input');
                edit_input.type = "text";
                edit_input.placeholder = "type here";
                edit_input.classList.add('updation-input');


                for(let i = 0; i < item_field.children.length; i++){
                    if(item_field.children[i] == edit_btn.parentElement){
                        let item_value = edit_btn.parentElement.childNodes[1].textContent;
                        console.log(item_value);

                        let edit_field = document.createElement('p');
                        edit_field.appendChild(edit_input);

                        let cancel_btn = document.createElement('button');
                        let cancel_text = document.createTextNode('cancel');
                        cancel_btn.appendChild(cancel_text);
                        let save_btn = document.createElement('button');
                        let save_text = document.createTextNode('save');
                        save_btn.appendChild(save_text);
                        edit_field.insertAdjacentElement('beforeend', cancel_btn);
                        edit_field.insertAdjacentElement('beforeend', save_btn);
                        
                        
                        item_field.replaceChild(edit_field, item_field.children[i]);
                        edit_input.value = edit_btn.parentElement.childNodes[1].textContent;

                        
                        cancel_btn.addEventListener('click', cancel_fun);
                        function cancel_fun(){
                            for(let i = 0; i < item_field.children.length; i++){
                                if(item_field.children[i] == cancel_btn.parentElement){
                                    // let element = document.createElement('p');
                                    // let text = document.createTextNode(item_value);
                                    // element.appendChild(text);

                                    // let checkbox = document.createElement('input');
                                    // checkbox.type = "checkbox";
                                    // element.insertAdjacentElement('afterbegin', checkbox);

                                    // let edit_btn = document.createElement('button');
                                    // let edit_text = document.createTextNode('edit');
                                    // edit_btn.appendChild(edit_text);
                                    // let delete_btn = document.createElement('button');
                                    // let delete_text = document.createTextNode('delete');
                                    // delete_btn.appendChild(delete_text);


                                    // edit_btn.appendChild(edit_text);
                                    // element.insertAdjacentElement('beforeend', edit_btn);
                                    // element.insertAdjacentElement('beforeend', dlt_btn);


                                    item_field.replaceChild(element, item_field.children[i]);
                                    // edit_btn.addEventListener('click', edit_fun);
                                }
                            }
                        }
                        
                        

                        
                        edit_input.addEventListener('keydown', (e) => {
                            if(e.key == "Enter"){
                                save_fun();
                            }
                        });
                        // save_btn.addEventListener('click', save_fun);
                        save_btn.addEventListener('mousedown', (e) => {
                            if(e.button == 0){
                                save_fun();
                            }
                        });
                        function save_fun(){
                            edit_input.removeEventListener('blur', blur_fun);
                            for(let i = 0; i < item_field.children.length; i++){
                                if(item_field.children[i] == save_btn.parentElement){
                                    

                                    item_field.replaceChild(element, item_field.children[i]);
                                    
                                    let new_node = document.createTextNode(edit_input.value);
                                    label.replaceChild(new_node, label.childNodes[0]);
                                    
                                    item_field.children[i].replaceChild(label, item_field.children[i].children[1]);
                                }
                            }
                            
                        }

                        

                        edit_input.addEventListener('blur', blur_fun);
                        function blur_fun(){
                            cancel_fun();
                        }
                        
                        
                        
                        


                        edit_input.focus();
                    }
                }
            }

            element.insertAdjacentElement('afterbegin', checkbox);
            element.insertAdjacentElement('beforeend', edit_btn);
            element.insertAdjacentElement('beforeend', dlt_btn);
            item_field.insertAdjacentElement("beforeend", element);

            input_box.value = "";
            input_box.focus();
            }

    }






function reset_fun(){
    item_field.innerHTML = "";
    input_box.focus();
}




// function testing(){
//     let element = document.createElement('button');
//     let text = document.createTextNode('console');
//     element.appendChild(text);

//     document.getElementsByTagName('main')[0].insertAdjacentElement('beforeend', element);

//     element.addEventListener('click', testing);
// }


// testing();