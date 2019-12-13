let collection;

async function popUpMatchingPeople() {
    const res = await fetch('/match/randomPeople')
    let matchingPeopleData = await res.json();
    collection = matchingPeopleData['randomPeople'];
    loopMatchingPeople();
}

popUpMatchingPeople();

function loopMatchingPeople() {

    let html = '';
    document.querySelector('.introductionList').innerHTML = html;

    for (let singlePeople of collection) {

        let averageScoreDisplay;
        if (singlePeople.average_score < 0) {
            averageScoreDisplay = "-";
        } else {
            averageScoreDisplay = singlePeople.average_score;
        }

        html += `<div class="userDetails">
       
                    <h4 class="userInfo">${singlePeople.name},
                        Age: ${getAge(singlePeople.date_of_birth)}, Rating: ${averageScoreDisplay}/5</h4>
                        <div class="VideoButton row">
                         <audio controls src="/user-pics/uploads/voiceTapes/${singlePeople.voice_path}"></audio>
                         <div class="tickCrossButton">
                         
                            <i data-tickid="${singlePeople.user_id}" class="tickButton fas fa-heart fa-4x"> </i>
                            
                            <i data-crossid="${singlePeople.user_id}"class="crossButton fas fa-dizzy fa-4x"></i>
                           
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

            let matchingRespond = await fetch('/match/like', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    userID
                })
            })

            let matchRespond = await matchingRespond.json()

            if (matchRespond.result && matchRespond.matchStatus) {
                swal("Matched!!!!");
                getMatchedChatroom();
            };


            collection = collection.filter(remainPeople => remainPeople.user_id != parseInt(userID));
            loopMatchingPeople();

        });


    });

    document.querySelectorAll(".crossButton").forEach(crossBtn => {
        crossBtn.addEventListener("click", function (e) {
            e.preventDefault();
            let userID = crossBtn.dataset.crossid;
            collection = collection.filter(remainPeople2 => remainPeople2.user_id != parseInt(userID));
            loopMatchingPeople();
        });
    });

}


let refreshList = document.getElementById('refresh-button');
refreshList.addEventListener("click", async function (e) {
    e.preventDefault();
    popUpMatchingPeople();
})

// Calculate People Age From Date Of Birth Function
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
    // console.log(contacts);
    loopMatchedChatroom(contacts);
}

async function loopMatchedChatroom(peopleContacts) {

    let html = '';
    let scoreHTML = '';
    for (let contact of peopleContacts) {
        const res = await fetch('/rating/rateScore/' + contact.user_id);
        submittedScore = await res.json();
        let theScore = submittedScore["result"].rows[0];
        html += `
                <div class="matchingPeopleContent row ">
                  
                    <img src="/user-pics/uploads/pictures/${contact.icon}" class="rounded float-left" alt="...">
                  
                    <h6 class="chatroomName">${contact.name}</h6>

                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary ratingButton" data-toggle="modal" data-target="#exampleModal${contact.user_id}">
                    Rating: ${theScore ? theScore.score : "-"}/5
                    </button>
    
                    <!-- Modal -->
                    <div class="modal fade " id="exampleModal${contact.user_id}" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModal${contact.user_id}Label" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModal${contact.user_id}Label">Give a Score to Him/Her!</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form class="rating-form" data-contact-id="${contact.user_id}" >
                                        <select class="form-control" name="form-rating" id="form-rating" required>
                                            <option value="">--- Rating ---</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary close-button" data-dismiss="modal">Close</button>
                                                <button type="submit" class="btn btn-primary submit-button">Submit</button>
                                            </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`



    }
    document.querySelector('.matchingPeopleList').innerHTML = html;

    const forms = document.querySelectorAll('.rating-form');
    for (let form of forms) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();


            let to_user_id = form.dataset.contactId;
            console.log(form.dataset);
            score = form.querySelector("#form-rating").value;

            let ratingStatus = await fetch('/rating/give', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    to_user_id,
                    score
                })
            })

            let rateStatus = await ratingStatus.json()

            if (rateStatus.result && rateStatus.likeStatus) {
                swal("The Score has been updated")
            } else {
                swal("Submitted!!")
            }
        })
    }

    let closeButtons = document.querySelectorAll('.close-button');
    for (let closeButton of closeButtons) {
        closeButton.addEventListener('click', async (e) => {
            getMatchedChatroom();
        })
    }


}
getMatchedChatroom();