const url = "http://localhost:3000/workexperience";


function getWorkExperience() {
    const list = document.getElementById("workexperience-list");

    fetch(url)
        .then(res => res.json())
        .then(data => {
            list.innerHTML = "";

            if (data.length === 0) {
                list.innerHTML = "<li>Inget hittades hittades.</li>";
                return;
            }

            data.forEach(item => {
                const li = document.createElement("li");

                li.innerHTML = `
                    ${item.companyname}<br>
                    ${item.jobtitle}<br>
                    ${item.location}<br>
                    <button data-id="${item.id}">Ta bort</button>
                `;

                li.querySelector("button").addEventListener("click", () => {
                    deleteWorkExperience(item.id);
                });

                list.appendChild(li);
            });
        })
        .catch(() => {
            list.innerHTML = "<li>Kunde inte hämta data.</li>";
        });
}

getWorkExperience();


const form = document.getElementById("workexperience-form");

form.addEventListener("submit", function (e) {
    
    const companyname = document.getElementById("companyname").value;
    const jobtitle = document.getElementById("jobtitle").value;
    const location = document.getElementById("location").value;

});



