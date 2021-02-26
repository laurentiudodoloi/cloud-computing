var input = document.getElementById('input-name');
var loading = document.getElementById('loading');
var btnSubmit = document.getElementById('btn-submit');
var resultImg = document.getElementById('result-img');
var resultText = document.getElementById('result-text');

btnSubmit.addEventListener('click', async function (evt) {
    loading.style.display = 'block';
    input.classList.remove('input-required');

    evt.preventDefault();

    resultImg.style.display = 'none';
    resultText.style.display = 'none';

    if (!input.value) {
        input.classList.add('input-required');
        loading.style.display = 'none';

        return false;
    }

    const content = input.value;

    input.value = '';

    await axios
        .post('/', {
            name: content
        })
        .then(r => {
            if (r.data.url) {
                resultImg.src = r.data.url;

                resultImg.style.display = 'block';
            } else {
                resultText.style.display = 'block';
            }
        })
        .catch(e => {
            resultText.style.display = 'block';
        })

    loading.style.display = 'none';
});
