// async function makeReq() {

//     const res = await fetch(`/api`)
//     const data = await res.json()

//     console.log(data);
//     document.querySelector("#personName").textContent = data.name
//     document.querySelector("#personStatus").textContent = data.status
//     document.querySelector("#personOccupation").textContent = data.currentOccupation
// }

function getFetch() {
    const url = `http://localhost:3000`

    fetch(url + "/api")
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}
