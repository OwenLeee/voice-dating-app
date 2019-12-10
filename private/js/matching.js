async function popUpMatchingPeople() {
    const res = await fetch('/match/randomPeople')
    let matchingPeopleData = await res.json();
    loopMatchingPeople(matchingPeopleData['randomPeople']);
}

popUpMatchingPeople();

function loopMatchingPeople(singleCollection) {
    let html = '';
    for (let singlePeople of singleCollection) {
        html += `<div class="userDetails">
       
                    <h4 class="userInfo">${singlePeople.name},
                        Age: ${getAge(singlePeople.date_of_birth)}, Rating: ${singlePeople.average_score}/5</h4>
                        <div class="VideoButton row">
                         <audio controls src="/user-pics/voiceTapes/${singlePeople.voice_path}"></audio>
                         <div class="tickCrossButton">
                        
                            <i data-tickid="${singlePeople.id}" class="tickButton far fa-check-circle"> </i>
                            
                            <i data-crossid="${singlePeople.id}"class="crossButton far fa-times-circle"></i>
                           
                        </div>
                    </div>
                 
                   </div>`
    }
    document.querySelector('.introductionList').innerHTML = html;

    document.querySelectorAll(".tickButton").forEach(tickBtn => {
        tickBtn.addEventListener("click", async function (e) {
            e.preventDefault();
            let userID = tickBtn.dataset.tickid;
            console.log(userID);
            console.log(tickBtn.dataset); 
            
            console.log(await(await fetch('/match/like', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    parseInt(userID); 
                })
            })).json())
        });
    });

    document.querySelectorAll(".crossButton").forEach(crossBtn => {
        crossBtn.addEventListener("click", function (e) {
// TO BE ADD DISLIKE FUNCTION! 
        });
    });
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

async function getMatchedChatroom() {
    const res = await fetch ('/')

}

function loopMatchedChatroom ()