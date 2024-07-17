let input_box = document.getElementById("input-box");
let add_btn = document.getElementById("add-btn");
let reset_btn = document.getElementById("reset-btn");
let item_field = document.getElementById("item-field");

let item_num = 0;








input_box.addEventListener('keydown', (e) => {
    if(e.key == "Enter"){
        add_fun();
    }
});
add_btn.addEventListener('click', add_fun);
reset_btn.addEventListener('click', reset_fun);







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
            element.classList.add(`item`, `item${item_num}`);
            let label = document.createElement('label');
            let text = document.createTextNode(input_box.value);
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            let dlt_btn = document.createElement('button');
            let dlt_text = document.createTextNode('delete');
            let edit_btn = document.createElement('button');
            let edit_text = document.createTextNode('edit');



            label.appendChild(text);
            element.appendChild(label);
            dlt_btn.appendChild(dlt_text);
            edit_btn.appendChild(edit_text);

            
            dlt_btn.addEventListener('click', dlt_fun);
            edit_btn.addEventListener('click', edit_fun);

            
            

            

            element.insertAdjacentElement('afterbegin', checkbox);
            element.insertAdjacentElement('beforeend', edit_btn);
            element.insertAdjacentElement('beforeend', dlt_btn);
            item_field.insertAdjacentElement("beforeend", element);

            input_box.value = "";
            input_box.focus();






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
                        
                        

                        edit_input.focus();




                        cancel_btn.addEventListener('click', cancel_fun);
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
                        edit_input.addEventListener('blur', blur_fun);
                        function blur_fun(){
                            cancel_fun();
                        }



                        
                        function cancel_fun(){
                            for(let i = 0; i < item_field.children.length; i++){
                                if(item_field.children[i] == cancel_btn.parentElement){
                                    item_field.replaceChild(element, item_field.children[i]);
                                }
                            }
                        }

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
                    }
                }
            }

            function dlt_fun(){
                for(let i = 0; i < item_field.children.length; i++){
                    if(dlt_btn.parentElement == item_field.children[i]){
                        item_field.removeChild(item_field.children[i]);
                    }
                }
            }


            item_num++;
            }



    }


function reset_fun(){
    item_field.innerHTML = "";
    input_box.focus();
    item_num = 0;
}