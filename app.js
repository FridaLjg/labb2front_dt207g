const url = "http://localhost:3000/workexperience";

function getWorkExperience() {
    const list = document.getElementById("workexperience-list");
    if (!list) return;

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

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const companyname = document.getElementById("companyname").value;
        const jobtitle = document.getElementById("jobtitle").value;
        const location = document.getElementById("location").value;
        const errorList = document.getElementById("error-messages");
        errorList.innerHTML = "";
        let Errors = false;


        if (!companyname) {
            const li = document.createElement("li");
            li.textContent = "Arbetsgivare måste fyllas i!";
            errorList.appendChild(li);
            Errors = true;
        }

        if (!jobtitle) {
            const li = document.createElement("li");
            li.textContent = "Arbetsroll måste fyllas i!";
            errorList.appendChild(li);
            Errors = true;
        }

        if (!location) {
            const li = document.createElement("li");
            li.textContent = "Plats måste fyllas i!";
            errorList.appendChild(li);
            Errors = true;
        }

        if (Errors) {
            return;
        }

        const newWorkExperience = {
            companyname,
            jobtitle,
            location
        };

        fetch("http://localhost:3000/workexperience", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newWorkExperience)
        })
            .then(res => {
                if (!res.ok) throw new Error("Kunde inte spara");
                window.location.href = "index.html";
            })
            .catch(err => console.error(err));
    });
}

//Delete
function deleteWorkExperience(id) {
    fetch(`http://localhost:3000/workexperience/${id}`, {
        method: "DELETE"
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("Kunde inte radera!");
            }

            return res.json();
        })
        .then(() => {
            getWorkExperience();
        })
        .catch(err => console.error(err));
}