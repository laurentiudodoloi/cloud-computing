var msgInput = document.getElementById('msg-input');
var sendBtn = document.getElementById('btn-send');

sendBtn.addEventListener('click', function (evt) {
    evt.preventDefault();

    if (!msgInput.value) {
        return false;
    }
});