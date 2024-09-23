let submit = document.getElementById("submit");
let submit1 = document.getElementById("submit1");

get_data_h = () =>{
    let so_dinh = document.getElementById("so_dinh").value;
    let ds_dinh = document.getElementsByName("dinh");
    let heuristic = document.getElementsByName("khoang_cach_h");
    let h = [];
    for (let i=0; i<so_dinh; i++){
        h[i] = {
            "dinh": ds_dinh[i].value,
            "heuristic": Number(heuristic[i].value)
        }
    }
    return h;
}

get_matrix = () => {
    let so_cung = document.getElementById("so_cung").value;
    let from = document.getElementsByName("tu");
    let to = document.getElementsByName("den");
    let g = document.getElementsByName("khoang_cach");
    let h = get_data_h();
    let matrix = [];
    for (let i = 0; i< so_cung; i++ ){
        matrix[i] = {
            "from": from[i].value,
            "to": to[i].value,
            "g": Number(g[i].value),
            "h": h.find(h => h.dinh === to[i].value).heuristic,
            "f": Number(g[i].value) + h.find(h => h.dinh === to[i].value).heuristic,
            "check": 0
        }
    }
    return matrix;
}



let find_open = (matrix, start) => {
    let Open_List = [];
    let j = 0;
    for (let i = 0; i< matrix.length; i++){
        if((matrix[i].from === start) && matrix[i].check === 0 ){
            Open_List[j] = matrix[i];
            j++;
        }
    }
    return Open_List;
}

let find_node_min = (Open_List) =>{
    let A = Open_List[0];
    for(let i = 1; i<Open_List.length; i++){
        if (Open_List[i].f <= A.f){
            A = Open_List[i];
        }
    }
    return A;
}

Leo_doi = () => {
    let start = document.getElementById("begin").value;
    let end = document.getElementById("end").value;
    let table_result1 = document.getElementById("table_result1");   
    let table_result2 = document.getElementById("table_result2");
    let table_result3 = document.getElementById("table_result3"); 
    let matrix = get_matrix();
    if (start === end){ 
        table_result1.innerHTML += 
        `
        <tr>
            <td>0</td>
            <td>${start}</td>
            
            
        </tr>
        `
        table_result2.innerHTML +=
        `
        <tr>
            <td>(${start}, 0, 0, 0, ${end})</td>
        </tr>
        `
        table_result3.innerHTML +=
        `
        <tr>
            <td>${start}</td>
        </tr>
        `
    }
    else {
        let i = 0;
        let Open_List = find_open(matrix, start);
        let A = find_node_min(Open_List);   
        A.check = 1;
        while ((A.to != end || A.from != end) && Open_List.length != 0){
            table_result1.innerHTML += 
            `
            <tr>
                <td>${i+1}</td>
                <td>(${A.from})</td>
            </tr>
            `
            table_result3.innerHTML += 
            `
            <tr>
                <td>(${A.from})</td>
            </tr>
            `
            for (let j = 0; j<Open_List.length; j++){
                table_result1.innerHTML += 
                `<tr>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                </tr>`
                table_result3.innerHTML += 
                `<tr>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                </tr>`
                table_result2.innerHTML +=
                `
                <tr>                        
                    (${Open_List[j].from}, ${Open_List[j].g}, ${Open_List[j].h}, ${Open_List[j].f}, ${Open_List[j].to})
                </tr>
                `            
            }
            

            Open_List = find_open(matrix, A.to);
            for (let j = 0; j<Open_List.length; j++){
                Open_List[j].g = A.g + Open_List[j].g;
                Open_List[j].f = Open_List[j].g + Open_List[j].h;             
            }
            A = find_node_min(Open_List);
            A.check = 1;
            i++;
        }
    }
}

// let graphObj = {};  // Biến để lưu đối tượng đồ thị

//   document.getElementById('file').addEventListener('change', function(event) {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = function(e) {
//         const fileContent = e.target.result;
        
//         // Chuyển đổi nội dung tệp sang đối tượng
//         graphObj = parseGraph(fileContent);
//         console.log(graphObj);  // Hiển thị đối tượng trong console
//       };
//       reader.readAsText(file);
//     } else {
//       console.log('Không có tệp nào được chọn.');
//     }
//   });

//   // Hàm để chuyển đổi nội dung tệp sang đối tượng
//   function parseGraph(text) {
//     let lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
//     let graph = {
//       vertices: 0,
//       edges: 0,
//       start: '',
//       end: '',
//       heuristics: {},
//       adjacencyList: []
//     };
    
//     lines.forEach((line, index) => {
//       if (index === 0) {
//         // Đọc số lượng đỉnh và cung
//         let [vertices, edges] = line.split('  ').map(item => parseInt(item.split(': ')[1]));
//         graph.vertices = vertices;
//         graph.edges = edges;
//       } else if (index === 1) {
//         // Đọc điểm bắt đầu và kết thúc
//         let [start, end] = line.split(' ').map(item => item.split(': ')[1]);
//         graph.start = start;
//         graph.end = end;
//       } else if (line.includes('H(')) {
//         // Đọc giá trị heuristic
//         let [node, heuristic] = line.split(': ');
//         let vertex = node.match(/\(([^)]+)\)/)[1];  // Trích xuất ký tự trong ngoặc đơn
//         graph.heuristics[vertex] = parseInt(heuristic);
//       } else {
//         // Đọc các cạnh và trọng số
//         let [from, to, weight] = line.split(' ');
//         graph.adjacencyList.push({ from, to, weight: parseInt(weight) });
//       }
//     });

//     refromrn graph;
//   }



// let submit1_click = () =>{
//     let file = document.getElementById('file');
//     get_data_file(file);
// }
// submit1.addEventListener("click", submit1_click);


let submit_click = () =>{
    let h = get_data_h();
    let matrix = get_matrix();
    console.log(h);
    console.log(matrix);

    Leo_doi();
    // const fileUpload = document.querySelector("file");
    // console.log(fileUpload);
    // fileUpload.addEventListener("change", (event) => {
    //     const { files } = event.target;	
    //     console.log("files", files)
    // })
}
submit.addEventListener("click", submit_click);
