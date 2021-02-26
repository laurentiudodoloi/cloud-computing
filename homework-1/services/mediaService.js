require('dotenv').config()

module.exports.getUrl = (imageUrl, text) => {
    let query = '?image_url=' + imageUrl;
    query = query + '&text=' + text;
    query = query + '&x_align=center&y_align=middle';

    return process.env.TEXTOVERIMAGE_API_URL + query;
}
