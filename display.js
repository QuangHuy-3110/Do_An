
let next_1 = document.getElementById("next_1");
let next_2 = document.getElementById("next_2");
let table_g = document.getElementById("table_g");
let table_h = document.getElementById("table_h");
let cung = document.getElementById("so_cung").value;
let dinh = document.getElementById("so_dinh").value;
let reset_2 = document.getElementById("reset_2");

div_2.style.display = 'block';
div_3.style.display = 'none';

let next_1_click = () =>{
    let type_data = document.getElementById("type_of_data").value;
    let math = document.getElementById("math").value;
    if (math === "UCS" || math === "Gready"){
        table_h.style.display = 'none';
    }
    else{
        table_h.style.display = 'block';
    }

    if(type_data === "write" ){
        div_2.style.display = 'block';
        div_3.style.display = 'none';        
    }

    else{
        div_2.style.display = 'none';
        div_3.style.display = 'block';
    }
}
next_1.addEventListener("click", next_1_click);

let next_2_click = () =>{
    cung = document.getElementById("so_cung").value;
    dinh = document.getElementById("so_dinh").value;
    for (let i = 0; i<dinh; i++){
        table_h.innerHTML +=
            `<tr>
                <td><input type="text" name="dinh"></td>
                <td><input type="number" name="khoang_cach_h"></td>
            </tr>`
    }
    for(let i = 0; i<cung; i++){
        table_g.innerHTML +=
            `<tr>
                <td><input type="text" name="tu"></td>
                <td><input type="text" name="den"></td>
                <td><input type="number" name="khoang_cach"></td>
            </tr>`
    }
}
next_2.addEventListener("click", next_2_click);

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