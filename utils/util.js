function converDoubanRatingStars(stars) {
    let starArr = [];
    let count = stars.substr(0, 1);
    for (let i = 1; i <= 5; i++) {
        if (i <= count) {
            starArr.push(1);
        } else {
            starArr.push(0);
        }
    }
    return starArr;
}

module.exports = {
    converDoubanRatingStars: converDoubanRatingStars
}