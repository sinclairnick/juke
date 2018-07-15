(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/helpers/typeof', 'babel-runtime/helpers/objectWithoutProperties', 'babel-runtime/helpers/extends', 'form-data', 'querystring', './Parser'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/helpers/typeof'), require('babel-runtime/helpers/objectWithoutProperties'), require('babel-runtime/helpers/extends'), require('form-data'), require('querystring'), require('./Parser'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._typeof, global.objectWithoutProperties, global._extends, global.formData, global.querystring, global.Parser);
    global.PirateBay = mod.exports;
  }
})(this, function (exports, _typeof2, _objectWithoutProperties2, _extends2, _formData, _querystring, _Parser) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.primaryCategoryNumbers = exports.defaultOrder = exports.baseUrl = undefined;
  exports.convertOrderByObject = convertOrderByObject;
  exports.search = search;
  exports.getTorrent = getTorrent;
  exports.getComments = getComments;
  exports.topTorrents = topTorrents;
  exports.recentTorrents = recentTorrents;
  exports.userTorrents = userTorrents;
  exports.getTvShow = getTvShow;
  exports.getCategories = getCategories;

  var _typeof3 = _interopRequireDefault(_typeof2);

  var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

  var _extends3 = _interopRequireDefault(_extends2);

  var _formData2 = _interopRequireDefault(_formData);

  var _querystring2 = _interopRequireDefault(_querystring);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var baseUrl = exports.baseUrl = process.env.THEPIRATEBAY_DEFAULT_ENDPOINT || 'https://thepiratebay.org';
  // $FlowFixMe - form-data library not supported
  var defaultOrder = exports.defaultOrder = { orderBy: 'seeds', sortBy: 'desc' };

  var searchDefaults = {
    category: '0',
    page: '0',
    filter: {
      verified: false
    },
    orderBy: 'seeds',
    sortBy: 'desc'
  };

  var primaryCategoryNumbers = exports.primaryCategoryNumbers = {
    audio: 100,
    video: 200,
    applications: 300,
    games: 400,
    xxx: 500,
    other: 600
  };

  /*
   * opts:
   *  category
   *    0   - all
   *    101 - 699
   *  page
   *    0 - 99
   *  orderBy
   *     1  - name desc
   *     2  - name asc
   *     3  - date desc
   *     4  - date asc
   *     5  - size desc
   *     6  - size asc
   *     7  - seeds desc
   *     8  - seeds asc
   *     9  - leeches desc
   *     10 - leeches asc
   */

  /**
   * Take a orderBy object and convert it to its according number
   *
   * @example: { orderBy: 'leeches', sortBy: 'asc' }
   * @example: { orderBy: 'name', sortBy: 'desc' }
   */
  function convertOrderByObject() {
    var orderByObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOrder;

    var options = [['name', 'desc'], ['name', 'asc'], ['date', 'desc'], ['date', 'asc'], ['size', 'desc'], ['size', 'asc'], ['seeds', 'desc'], ['seeds', 'asc'], ['leeches', 'desc'], ['leeches', 'asc']];

    // Find the query option
    var option = options.find(function (_option) {
      return _option.includes(orderByObject.orderBy) && _option.includes(orderByObject.sortBy);
    });

    // Get the index of the query option
    var searchNumber = option ? options.indexOf(option) + 1 : undefined;

    if (!searchNumber) throw Error("Can't find option");

    return searchNumber;
  }

  /**
   * Helper method for parsing page numbers
   */
  function castNumberToString(pageNumber) {
    if (typeof pageNumber === 'number') {
      return String(pageNumber);
    }

    if (typeof pageNumber === 'string') {
      return pageNumber;
    }

    if (typeof pageNumber !== 'string' || typeof pageNumber !== 'number') {
      throw new Error('Unexpected page number type');
    }

    throw new Error('Unable to cast ' + pageNumber + ' to string');
  }

  /**
   * Determine the category number from an category name ('movies', 'audio', etc)
   */
  function resolveCategory(categoryParam, defaultCategory) {
    if (typeof categoryParam === 'number') {
      return categoryParam;
    }

    if (typeof categoryParam === 'string') {
      if (categoryParam in primaryCategoryNumbers) {
        return primaryCategoryNumbers[categoryParam];
      }
    }

    return defaultCategory;
  }

  function search() {
    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var convertedCategory = resolveCategory(opts.category, parseInt(searchDefaults.category, 10));

    var castedOptions = (0, _extends3.default)({}, opts, {
      page: opts.page ? castNumberToString(opts.page) : searchDefaults.page,
      category: opts.category ? castNumberToString(convertedCategory) : searchDefaults.category,
      orderby: opts.orderby ? castNumberToString(opts.orderby) : searchDefaults.orderBy
    });

    var _searchDefaults$caste = (0, _extends3.default)({}, searchDefaults, castedOptions),
        page = _searchDefaults$caste.page,
        category = _searchDefaults$caste.category,
        orderBy = _searchDefaults$caste.orderBy,
        sortBy = _searchDefaults$caste.sortBy,
        rest = (0, _objectWithoutProperties3.default)(_searchDefaults$caste, ['page', 'category', 'orderBy', 'sortBy']);

    var orderingNumber = convertOrderByObject({ orderBy: orderBy, sortBy: sortBy });

    var url = baseUrl + '/s/?' + _querystring2.default.stringify({
      q: title,
      category: category,
      page: page,
      orderby: orderingNumber
    });

    return (0, _Parser.parsePage)(url, _Parser.parseResults, rest.filter);
  }

  function getTorrent(id) {
    var url = function () {
      if ((typeof id === 'undefined' ? 'undefined' : (0, _typeof3.default)(id)) === 'object') {
        return id.link;
      }
      return typeof id === 'number' || /^\d+$/.test(id) ? baseUrl + '/torrent/' + id :
      // If id is an object return it's link property. Otherwise,
      // return 'id' itself
      id;
    }();

    return (0, _Parser.parsePage)(url, _Parser.parseTorrentPage);
  }

  function getComments(id) {
    var url = baseUrl + '/ajax_details_comments.php';
    var formData = new _formData2.default();
    formData.append('id', id);
    return (0, _Parser.parsePage)(url, _Parser.parseCommentsPage, {}, 'POST', formData);
  }

  function topTorrents() {
    var category = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'all';

    var castedCategory = void 0;

    // Check if category is number and can be casted
    if (parseInt(category, 10)) {
      castedCategory = castNumberToString(category);
    }

    return (0, _Parser.parsePage)(baseUrl + '/top/' + (castedCategory || category), _Parser.parseResults);
  }

  function recentTorrents() {
    return (0, _Parser.parsePage)(baseUrl + '/recent', _Parser.parseResults);
  }

  function userTorrents(username) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var orderby = opts.orderby;


    // Determine orderingNumber given orderBy and sortBy
    if (opts.sortBy || opts.orderBy) {
      orderby = convertOrderByObject({
        sortBy: opts.sortBy || 'desc',
        orderBy: opts.orderBy || 'seeds'
      });
    }

    var query = baseUrl + '/user/' + username + '/?' + _querystring2.default.stringify({
      page: opts.page ? castNumberToString(opts.page) : '0',
      orderby: orderby || '99'
    });

    return (0, _Parser.parsePage)(query, _Parser.parseResults);
  }

  /**
   * @TODO: url not longer returning results
   */
  function getTvShow(id) {
    return (0, _Parser.parsePage)(baseUrl + '/tv/' + id, _Parser.parseTvShow);
  }

  function getCategories() {
    return (0, _Parser.parsePage)(baseUrl + '/recent', _Parser.parseCategories);
  }

  exports.default = {
    search: search,
    getTorrent: getTorrent,
    getComments: getComments,
    topTorrents: topTorrents,
    recentTorrents: recentTorrents,
    userTorrents: userTorrents,
    getTvShow: getTvShow,
    getCategories: getCategories
  };
});