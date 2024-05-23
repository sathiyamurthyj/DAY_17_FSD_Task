let container = document.createElement("div");
container.classList.add("container");
let heading = document.createElement("h1");
heading.id = "title";
heading.classList.add("text-center");
heading.innerText = "Countries Data with Weather Details";
container.appendChild(heading);
document.body.appendChild(container);

// function
function createCountryCards(countries){
    let row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);
    countries.forEach((item)=>{
        let col = document.createElement("div");
        col.classList.add("col-lg-4","col-sm-12");        

        let card = document.createElement("div");
        card.classList.add("card","text-center");
        let header = document.createElement("div");
        header.classList.add("card-header");
        header.innerText=item.name.common;
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        let image = document.createElement("img");
        image.classList.add("img-thumbnail");
        image.setAttribute("src",item["flags"]["png"]);
        image.setAttribute("alt",item["flags"]["alt"]);
        image.setAttribute("style","width:300px;height:200px");
        let capital = document.createElement("p");
        capital.classList.add("card-text");
        capital.innerText = "Capital: "+item["capital"];
        let region = document.createElement("p");
        region.classList.add("card-text");
        region.innerText = "Region: "+item.region;
        let code = document.createElement("p");
        code.classList.add("card-text");
        code.innerText = "Country Code: "+item.flag;
        let button = document.createElement("button");
        button.classList.add("btn","btn-primary");
        button.innerText = "Click for Weather";
        button.addEventListener("click",()=>{
            let lat = item["latlng"][0];
            let lon = item["latlng"][1];
            let appId = "f742b64eda7ad9be290e72a12cfe8e76";
            let urlhost = "https://api.openweathermap.org/data/2.5/weather?";
            let url = urlhost+"lat="+lat+"&lon="+lon+"&appid="+appId;
            console.log(url);
            fetch(url)
                .then(res=>{
                    if(!res.ok){
                        throw new Error("some error");
                    }
                    return res.json();
                })
                .then(data=>alert(JSON.stringify(data)))
                .catch(err=>console.log(err))
        });

        // assemble card
        cardBody.appendChild(image);
        cardBody.appendChild(capital);
        cardBody.appendChild(region);
        cardBody.appendChild(code);
        cardBody.appendChild(button);
        card.appendChild(header);
        card.appendChild(cardBody);
        col.appendChild(card);
        row.appendChild(col);
    })
}

// fetch rest countries
fetch("https://restcountries.com/v3.1/all")
    .then(res=>{
        if(!res.ok){
            throw new Error("some error");
        }
        return res.json();
    })
    .then((data)=>{
        let countries = data;
        createCountryCards(countries);
    })
    .catch((err) =>{
        console.error("fetch error", err);
    });