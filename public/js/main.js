const socket = io();
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
//get users current timezone
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log(userTimeZone);
//get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

//output room name
roomName.innerText = room;


//join chatroom
socket.emit('joinRoom', {  username, room, userTimeZone });


socket.on('message', message => {
  console.log(message);
    outputMessage(message);

    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

const chatForm = document.getElementById('chat-form');

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;
  socket.emit('chatMessage', msg);

  //clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

//output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username } <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}