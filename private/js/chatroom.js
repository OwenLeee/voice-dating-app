
// function send(id, message) {
//     socket.emit("serverReceive", { userID: id, message });
// };
const socket = io.connect('localhost:8080');



class Chatroom {
    async loadContacts() {
        const res = await fetch('/chatroom/findContactInfo');
        this.contacts = await res.json();
        const selfResponse = await fetch('/chatroom/me')
        this.selfInfo = await selfResponse.json();
        this.renderContacts();
    };

    renderContacts() {
        let selfIcon = ''
        selfIcon += `
            <h1>SPright</h1>
            <img class="senderIcon" src="/user-pics/uploads/pictures/${this.selfInfo[0].icon}">
            `
        document.querySelector('.self').innerHTML = selfIcon;

        let html = '';
        // let receiverIcon = '';
        for (let contact of this.contacts) {
            html += `
                <div class="contact" data-id="${contact.user_id}" data-icon="${contact.icon}" data-name="${contact.name}">
                <img src="/user-pics/uploads/pictures/${contact.icon}">
                <div>${contact.name}</div>
                </div>
                `
            // receiverIcon += `
            // <div class="receiverIcon">${contact.icon}
            // </div>
            // `
        };

        document.querySelector('.contacts').innerHTML = html;
        // document.querySelector('.receiver').innerHTML = receiverIcon;

        let receiverId;
        let contactButtons = document.querySelectorAll('.contact');
        for (let contactButton of contactButtons) {

            contactButton.addEventListener('click', async (event) => {
                event.preventDefault();
                receiverId = contactButton.dataset.id;
                // console.log(receiverId);
                let receiverIcon = contactButton.dataset.icon;
                // console.log(receiverIcon);
                let receiverName = contactButton.dataset.name;
                // console.log(receiverName);

                let inputBar = '';
                inputBar += `
                <input type="text" placeholder="Type a message" name="message" class="input" autocomplete="off">
                `;
                document.querySelector('.inputBar').innerHTML = inputBar;

                let icon = '';
                icon += `
                <a href="/portfolio.html?id=${receiverId}" target="_blank">
                <img class="receiverIcon" src="/user-pics/uploads/pictures/${receiverIcon}">
                </a>
                <div>${receiverName}</div>
                `
                document.querySelector('.receiver').innerHTML = icon;


                // let query = new URLSearchParams(location.search);
                // let receiverId = parseInt(query.get('id'));
                // console.log(receiverId);
                const res = await fetch('/chatroom/' + receiverId);
                this.messages = await res.json();
                let html = '';
                // html += `<div class="message-area">`;
                for (let message of this.messages) {
                    // console.log(typeof(message.to_user_id), message.to_user_id);
                    // console.log(typeof(receiverId), receiverId);                    
                    if (message.to_user_id == parseInt(receiverId)) {
                        html += `
                        <div class="right-box">
                        <div class="right-text">${message.message_text}</div>
                        </div>
                        `
                    } else {
                        html += `
                        <div class="left-box">
                        <div class="left-text">${message.message_text}</div>
                        </div>
                        `
                    }
                }
                // html += `</div>`
                //     html += `
                //             <div class="input-box">
                //             <form class="inputBar"> 
                //             <input type="text" placeholder="Type a message" name="message" class="input" autocomplete="off"> 
                //             </form>
                //             </div>`
                document.querySelector('.message-area').innerHTML = html;
                document.querySelector('.message-area').scrollTop = document.querySelector('.message-area').scrollHeight;


                ////////////// socket //////////////
                socket.on("clientReceive", async (data) => {
                    receiverId = contactButton.dataset.id;
                    const res = await fetch('/chatroom/' + receiverId);
                    this.messages = await res.json();
                    let html = '';
                    // html += `<div class="message-area">`;
                    for (let message of this.messages) {
                        // console.log(typeof(message.to_user_id), message.to_user_id);
                        // console.log(typeof(receiverId), receiverId);                    
                        if (message.to_user_id == parseInt(receiverId)) {
                            html += `
                            <div class="right-box">
                            <div class="right-text">${message.message_text}</div>
                            </div>
                            `
                        } else {
                            html += `
                            <div class="left-box">
                            <div class="left-text">${message.message_text}</div>
                            </div>
                            `
                        }
                    }
                    // html += `</div>`
                    // html += `
                    //         <div class="input-box">
                    //         <form class="inputBar"> 
                    //         <input type="text" placeholder="Type a message" name="message" class="input" autocomplete="off"> 
                    //         </form>
                    //         </div>`
                    // console.log(data);
                    document.querySelector('.message-area').innerHTML = html;
                    document.querySelector('.inputBar').reset();
                    document.querySelector('.message-area').scrollTop = document.querySelector('.message-area').scrollHeight;
                });
            });
        };





        document.querySelector('.inputBar').addEventListener('submit', async (event) => {
            event.preventDefault();

            // let html = '';
            // if (event) {
            //     html += `
            //     <input type="text" placeholder="Type a message" name="message" class="input" autocomplete="off">
            //     `
            // }
            // document.querySelector('.inputBar').innerHTML = html;

            // let query = new URLSearchParams(location.search);
            // let receiverId = parseInt(query.get('id'));
            let message = event.currentTarget.message.value
            // console.log(receiverId);
            // socket.emit("serverReceive", { receiverId, message });
            if (message == "" ||
                message == null ||
                message == "undefinied") {

                return;
            }
            else if (/^\s*$/.test(message)) {
                return;
            }
            else {
                await fetch('/chatroom/', {
                    method: 'POST',
                    headers: {
                        // Specify any HTTP Headers Here
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: JSON.stringify({
                        message: message,
                        userID: receiverId
                    })
                });
            };

            // await fetch('/chatroom/', {
            //     method: 'POST',
            //     headers: {
            //         // Specify any HTTP Headers Here
            //         "Content-Type": "application/json; charset=utf-8",
            //     },
            //     body: JSON.stringify({
            //         message: message,
            //         userID: receiverId
            //     })
            // })
        })
    };


};

// const messages = document.getElementById('chat-area');

// function appendMessage() {
// 	const message = document.getElementsByClassName('wrap')[0];
//   const newMessage = message.cloneNode(true);
//   messages.appendChild(newMessage);
// }

// function getMessages() {
// 	// Prior to getting your messages.
//   shouldScroll = messages.scrollTop + messages.clientHeight === messages.scrollHeight;
//   /*
//    * Get your messages, we'll just simulate it by appending a new one syncronously.
//    */
//   appendMessage();
//   // After getting your messages.
//   if (!shouldScroll) {
//     scrollToBottom();
//   }
// }

// function scrollToBottom() {
//   messages.scrollTop = messages.scrollHeight;
// }

// scrollToBottom();

const chatroom = new Chatroom();
chatroom.loadContacts();


