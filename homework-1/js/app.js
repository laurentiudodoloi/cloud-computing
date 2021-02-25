var msgInput = document.getElementById('msg-input');
var sendBtn = document.getElementById('btn-send');
var chatEl = document.getElementById('chat');

sendBtn.addEventListener('click', async function (evt) {
    evt.preventDefault();

    if (!msgInput.value) {
        return false;
    }

    await axios
        .post('/message', {
            content: msgInput.value
        })
        .then(r => {
            console.log(r.data);

            message(msgInput.value);
        })
        .catch(e => {
            alert('Error occured.');
        })

    msgInput.value = '';
});

function message(content, side = 'right') {
    var msg = document.createElement('p');
    msg.classList = 'msg msg-' + side;

    var msgText = document.createElement('span');
    msgText.classList = 'msg-text';
    msgText.textContent = content;

    msg.appendChild(msgText);
    chatEl.appendChild(msg);
}
