"use strict";
exports.__esModule = true;
exports.authRoutes = exports.favoritesRoutes = exports.tracksRoutes = exports.albumsRoutes = exports.artistsRoutes = exports.usersRoutes = void 0;
exports.usersRoutes = {
    getAll: '/user',
    getById: function (userId) { return "/user/".concat(userId); },
    create: '/user',
    update: function (userId) { return "/user/".concat(userId); },
    "delete": function (userId) { return "/user/".concat(userId); }
};
exports.artistsRoutes = {
    getAll: '/artist',
    getById: function (artistId) { return "/artist/".concat(artistId); },
    create: '/artist',
    update: function (artistId) { return "/artist/".concat(artistId); },
    "delete": function (artistId) { return "/artist/".concat(artistId); }
};
exports.albumsRoutes = {
    getAll: '/album',
    getById: function (albumId) { return "/album/".concat(albumId); },
    create: '/album',
    update: function (albumId) { return "/album/".concat(albumId); },
    "delete": function (albumId) { return "/album/".concat(albumId); }
};
exports.tracksRoutes = {
    getAll: '/track',
    getById: function (trackId) { return "/track/".concat(trackId); },
    create: '/track',
    update: function (trackId) { return "/track/".concat(trackId); },
    "delete": function (trackId) { return "/track/".concat(trackId); }
};
exports.favoritesRoutes = {
    getAll: '/favs',
    artists: function (artistId) { return "/favs/artist/".concat(artistId); },
    albums: function (albumId) { return "/favs/album/".concat(albumId); },
    tracks: function (trackId) { return "/favs/track/".concat(trackId); }
};
exports.authRoutes = {
    signup: '/auth/signup',
    login: '/auth/login',
    refresh: '/auth/refresh'
};
