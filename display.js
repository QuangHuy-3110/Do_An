let reset_2 = document.getElementById("reset_2");
let table_h = document.getElementById("table_h");
let table_g = document.getElementById("table_g");

div_2.style.display = 'block';
div_3.style.display = 'none';

let form_of_calculate = () =>{
    let math = document.getElementById("math").value;
    if (math === "UCS"){
        table_h.style.display = 'none';
        table_g.style.display = 'block';

    }
    else if(math === "Gready"){
        table_h.style.display = 'block';
        table_g.style.display = 'none';
    }
    else {
        table_h.style.display = 'block';
        table_g.style.display = 'block';
    }
}
addEventListener("change", form_of_calculate);

let form_change = () =>{
    let type_data = document.getElementById("type_of_data").value;
    if(type_data === "write" ){
        div_2.style.display = 'block';
        div_3.style.display = 'none';        
    }

    else{
        div_2.style.display = 'none';
        div_3.style.display = 'block';
    }
}
addEventListener("change", form_change);

const input_top =  document.getElementById("so_dinh");
function changeTableInput_Top () {
    let table_h = document.getElementById("table_h");
    let dinh = document.getElementById("so_dinh").value;
    for (let i = 0; i<dinh; i++){
        table_h.innerHTML +=
            `<tr>
                <td><input type="text" name="dinh"></td>
                <td><input type="number" name="khoang_cach_h"></td>
            </tr>`
    }   
}
input_top.addEventListener("change", changeTableInput_Top, {once : true});

const input_road =  document.getElementById("so_cung");
function changeTableInput_Road () {
    let table_g = document.getElementById("table_g");
    let cung = document.getElementById("so_cung").value;
    for(let i = 0; i<cung; i++){
        table_g.innerHTML +=
            `<tr>
                <td><input type="text" name="tu"></td>
                <td><input type="text" name="den"></td>
                <td><input type="number" name="khoang_cach"></td>
            </tr>`
    }
}
input_road.addEventListener("change", changeTableInput_Road, {once : true});


let reset_2_click = () => {
    table_h.innerHTML = 
    `<tr>
        <th>Dinh</th>
        <th>Khoang cach (h)</th>
    </tr>`;
    table_g.innerHTML = 
    `<tr>
        <th>Tu</th>
        <th>Den</th>
        <th>Khoang cach</th>
    </tr>`;
}
reset_2.addEventListener("click", reset_2_click);
