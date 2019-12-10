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

            await fetch('/match/like', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(
                    parseInt(userID)  //???? {} 
                )
            })
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
    const res = await fetch('/chatroom/findContactInfo');
    contacts = await res.json();
    console.log(contacts);
    loopMatchedChatroom(contacts);
}

function loopMatchedChatroom(peopleContacts) {

    let html = '';
    for (let contact of peopleContacts) {
        html += `
                <div class="matchingPeopleContent row ">
                    <img src="/user-pics/pictures/${contact.icon}" class="rounded float-left" alt="...">
                    <h6 class="chatroomName">${contact.name}</h6>
                    <button type="button" class="btn" data-toggle="button" aria-pressed="false">Chat</button>
                </div>`
    }
    document.querySelector('.matchingPeopleList').innerHTML = html;
}

getMatchedChatroom ();