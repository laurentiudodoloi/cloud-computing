var msgInput = document.getElementById('msg-input');
var sendBtn = document.getElementById('btn-send');

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
        });

    msgInput.value = '';
});
