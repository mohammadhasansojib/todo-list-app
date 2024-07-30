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

        if(input_box.value.trim() == ''){

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

            item_num++;

            save_data();
        }
    }


function edit_fun(e){

    if(e.target.innerText == 'Edit' && e.target.tagName == 'BUTTON'){
        let edit_input = document.createElement('input');
        edit_input.type = "text";
        edit_input.placeholder = "type here";
        edit_input.classList.add('updation-input');
        let prev_element = e.target.parentElement;


        for(let i = 0; i < item_field.children.length; i++){
            if(item_field.children[i] == e.target.parentElement){

                let item_value = e.target.parentElement.childNodes[1].textContent;
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
                edit_input.value = e.target.parentElement.childNodes[1].textContent;
                
                edit_input.focus();

                cancel_btn.addEventListener('click', blur_fun);
                edit_input.addEventListener('blur', blur_fun);
                function blur_fun(e){
                    cancel_fun(e, prev_element);
                }
                edit_input.addEventListener('keydown', (e) => {
                    if(e.key == "Enter"){
                        edit_input.removeEventListener('blur', blur_fun);
                        save_fun(edit_input, save_btn, prev_element);
                    }
                });
                // save_btn.addEventListener('click', save_fun);
                save_btn.addEventListener('mousedown', (e) => {
                    if(e.button == 0){
                        edit_input.removeEventListener('blur', blur_fun);
                        save_fun(edit_input, save_btn, prev_element);
                    }
                });




            }
        }
    }

}




function cancel_fun(e, prev_element){
    for(let i = 0; i < item_field.children.length; i++){
        if(item_field.children[i] == e.target.parentElement){
            item_field.replaceChild(prev_element, item_field.children[i]);
        }
    }
}

function save_fun(edit_input, save_btn, prev_element){
    
    for(let i = 0; i < item_field.children.length; i++){
        if(item_field.children[i] == save_btn.parentElement){

            item_field.replaceChild(prev_element, item_field.children[i]);

            let new_node = document.createTextNode(edit_input.value);
            let label = document.createElement('label');
            label.appendChild(new_node);

            prev_element.replaceChild(label, item_field.children[i].children[1]);

            save_data();
        }
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
    if(e.target.innerHTML == "delete" && e.target.tagName == "BUTTON"){
        for(let i = 0; i < item_field.children.length; i++){
            if(e.target.parentElement == item_field.children[i]){
                item_field.removeChild(item_field.children[i]);
                save_data();
                // console.log(e.target.innerHTML);
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
        item_field.children[i].children[2].addEventListener('click', edit_fun);
    }
}

item_num = item_field.children.length;