let axiosConfig = {
    headers: {
        Authorization: ''
    }
};

function setToken() {
    axiosConfig.headers.Authorization = localStorage.getItem('token');;    
}
setToken();

function loginUser(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let body = {email, password};
    axios.post("http://localhost:3000/auth",body).then((response) => {
        localStorage.setItem("token",response.data.token);
        setToken();
        alert("Auth successful");
        loadGames();
    }).catch((err) => {
        alert(err.message);
    })

}

function createGame(){
    let titleInput = document.getElementById("title");
    let yearInput = document.getElementById("year");
    let priceInput = document.getElementById("price");

    let game = {
        title: titleInput.value,
        year: yearInput.value,
        price: priceInput.value
    };

    axios.post("http://localhost:3000/game",game,axiosConfig).then((res)=>{
        if (res.status === 200){
            alert("Game created successfully!");
            loadGames();
        }else{
            alert(res.status);
        }
    }).catch((err) => {
        alert(err.message);
    })
}

function deleteGame(listItem){
    let id = listItem.getAttribute("data-id");
    axios.delete("http://localhost:3000/game/"+id,axiosConfig).then((res)=>{
        if (res.status=== 200) {
            alert("Game deleted successfully!");
            loadGames();
        }else{
            alert(res.status);
        }
    }).catch((err) => {
        alert(err.message);
    });
}

function updateGame(){
    let id = document.getElementById("idEdit").value;
    let title = document.getElementById("titleEdit").value;
    let year = document.getElementById("yearEdit").value;
    let price = document.getElementById("priceEdit").value;

    let game = {
        title: title,
        year: year,
        price: price
    };

    axios.put("http://localhost:3000/game/"+id,game,axiosConfig).then((res)=>{
        if (res.status=== 200) {
            alert("Game updated successfully!");
            loadGames();
        }else{
            alert(res.status);
        }
    }).catch((err) => {
        alert(err.message);
    });
}

function showGame(listItem){
    let id = listItem.getAttribute("data-id");
    let title = listItem.getAttribute("data-title");
    let year = listItem.getAttribute("data-year");
    let price = listItem.getAttribute("data-price");

    let textId = document.getElementById("idEdit");
    let textTitle = document.getElementById("titleEdit");
    let textYear = document.getElementById("yearEdit");
    let textPrice = document.getElementById("priceEdit");

    textId.value = id;
    textTitle.value = title;
    textYear.value = year;
    textPrice.value = price;
}

function loadGames(){
    axios.get("http://localhost:3000/games",axiosConfig).then((response) => {
        let games  = response.data;
        let list = document.getElementById("games");

        // CLEAR PREVIOUS LIST - Same as list.innerHtml = "";
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }

        games.forEach((game) => {

            let item = document.createElement("li");
            item.setAttribute("data-id",game.id);
            item.setAttribute("data-title",game.title);
            item.setAttribute("data-year",game.year);
            item.setAttribute("data-price",game.price);

            item.innerHTML = "(" + game.id + ")" + game.title + " year " + game.year + " R$" + game.price;

            let deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete";
            deleteButton.addEventListener("click",()=>{
                deleteGame(item);
            });
            item.appendChild(deleteButton);

            let editButton = document.createElement("button");
            editButton.innerHTML = "Edit";
            editButton.addEventListener("click",()=>{
                showGame(item);
            });
            item.appendChild(editButton);

            list.appendChild(item);
        });
    }).catch((err) => {
        console.log(err);
    });
}
loadGames();