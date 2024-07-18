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
item_field.addEventListener('click', dlt_fun);







function add_fun(){

        if(input_box.value == ''){

            alert('Text Field in empty!!');

        }else{

            
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
                        edit_input.addEventListener('blur', blur_fun);
                        function blur_fun(){
                            cancel_fun();
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

                                    save_data();
                                }
                            }
                        }
                    }
                }
            }

            item_num++;

            save_data();
        }
    }









function reset_fun(){
    item_field.innerHTML = "";
    input_box.focus();
    item_num = 0;
    console.clear();
    save_data();
}


let item_selector = 0;


function dlt_fun(e){
    if(e.target.innerHTML == "delete"){
        for(let i = 0; i < item_field.children.length; i++){
            if(e.target.parentElement == item_field.children[i]){
                item_field.removeChild(item_field.children[i]);
                save_data();
                // console.log(e.target.innerHTML);
            }
        }
    }else if(e.target.innerHTML == "edit"){
        for(let i = 0; i < item_field.children.length; i++){
            if(e.target.classList[0] == `edit${i}`){
                item_selector = i;
                external_edit_fun();
            }
        }
    }
}



function external_edit_fun(){

    let edit_input = document.createElement('input');
    edit_input.type = "text";
    edit_input.placeholder = "type here";
    edit_input.classList.add('updation-input');


    for(let i = 0; i < item_field.children.length; i++){

    }
    


    let element = item_field.children[item_selector];
    let label = item_field.children[item_selector].children[1];
    let edit_btn = item_field.children[item_selector].children[2];

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
            edit_input.addEventListener('blur', blur_fun);
            function blur_fun(){
                cancel_fun();
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

                        save_data();
                    }
                }
            }
        }
    }
}


function save_data(){
    localStorage.setItem('data', item_field.innerHTML);
}
function show_data(){
    item_field.innerHTML = localStorage.getItem('data');
}
show_data();


for(let i = 0; i < item_field.children.length; i++){
    item_field.children[i].children[2].classList.add(`edit${i}`);
    if(item_field.children[i].children[2].innerHTML == 'edit'){
        item_field.children[i].children[2].addEventListener('click', external_edit_fun);
    }
}