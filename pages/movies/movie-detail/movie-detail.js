// pages/movies/movie-detail/movie-detail.js

let util = require('../../../utils/util.js'),
    app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let movieId = options.id,
            movieUrl = app.globalData.doubanBase + '/v2/movie/subject/' + movieId;
        util.http(movieUrl, this.processMovieData);
    },

    processMovieData(data)
    {
        let movie = {
            title: data.title,
            countries: data.countries,
            year: data.year,
            love: data.wish_count,
            review: data.reviews_count,
            original_title: data.original_title,
            stars: util.converDoubanRatingStars(data.rating.stars),
            average: data.rating.average,
            directors: data.directors[0].name,
            casts:data.casts,
            summary: data.summary,
            image: data.images.large,
            casts_name: this.processMovieCasts(data.casts, ' / '),
            genres: data.genres.join('、')
        };

        this.setData({
            movie
        });
    },

    processMovieCasts(casts, mode)
    {
        let name = '';
        for (let v of casts) {
            name += v.name + mode;
        }
        return name.substring(0, name.length - mode.length);
    },

    onLargeImg(event)
    {
        let src = event.currentTarget.dataset.src;
        wx.previewImage({
            current: src,
            urls: [src]
        })
    }
})