var ChatterName = 'Visitor' ;
var Connection = new signalR.HubConnectionBuilder()
.withUrl('ChatHub')
.build();
Connection.on('RecieveMessage' , renderMessage);
Connection.start();
function ShowChatDialog() {
  var elDialog = document.getElementById('chatDialog');
  elDialog.style.display = 'block';
}
function ready() {
    setTimeout(ShowChatDialog , 750);
}
function sendMessage (text)
{
  if (text && text.length) {
    Connection.invoke('sendMessage' , ChatterName , text);
  }
}
var ChatFormEL = document.getElementById('chatForm');
ChatFormEL.addEventListener('submit' , function (e) {
  e.preventDefault();
  var text = e.target[0].value;
  e.target[0].value = '';
  sendMessage(text);
});
function renderMessage(name, time, message) {
  var nameSpan = document.createElement("span");
  nameSpan.className = "name";
  nameSpan.textContent = name;

  var timeSpan = document.createElement("span");
  timeSpan.className = "time";
  var friendlyTime = moment(time).format("H:mm");
  timeSpan.textContent = friendlyTime;

  var headerDiv = document.createElement("div");
  headerDiv.appendChild(nameSpan);
  headerDiv.appendChild(timeSpan);

  var messageDiv = document.createElement("div");
  messageDiv.className = "message";
  messageDiv.textContent = message;

  var newItem = document.createElement("li");
  newItem.appendChild(headerDiv);
  newItem.appendChild(messageDiv);

  var chatHistoryEl = document.getElementById("chatHistory");
  chatHistoryEl.appendChild(newItem);
  chatHistoryEl.scrollTop =
    chatHistoryEl.scrollHeight - chatHistoryEl.clientHeight;
}
document.addEventListener('DOMContentLoaded' , ready);