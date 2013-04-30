// Generated by CoffeeScript 1.6.2
exports.index = function(req, res) {
  var colors;

  colors = global.controls.lib.colors();
  console.log('start'.data);
  return res.jsonp({
    user: 'tobi'
  });
};

exports.get = function() {
  var check, checkLink, clearTags, clearText, cn, colors, get, getCaption, getLinks, getName, getNames, getPage, iconv, index, insertIntoBase, mysql, parsePage, sanitize, url, urls;

  colors = global.controls.lib.colors();
  check = require('validator').check;
  sanitize = require('validator').sanitize;
  iconv = require('iconv-lite');
  get = require('get');
  mysql = require('mysql');
  insertIntoBase = function(caption, name, link) {
    var values;

    values = {
      caption: caption,
      name: name,
      ind: index,
      url: url,
      link: link
    };
    return cn.query('insert into rlsnet set ?', values, function(err) {
      if (!err) {
        return console.log(caption.data, name.info);
      }
    });
  };
  getCaption = function(value) {
    value = clearText(value);
    value = value.replace(/(.*?)<div id="div_nest">(.*?)$/, '$2');
    value = value.replace(/(.*?)<h2>(.*?)<\/h2>(.*?)<h2>(.*)/i, '$3');
    value = value.replace(/<img(.*?)>/, '');
    value = value.replace(/<a(.*?)><\/a>/, '');
    return value;
  };
  getName = function(value, res) {
    if (res == null) {
      res = null;
    }
    if (value.match(/<a(.*?)>(.*?)<\/a>/i)) {
      res = value.replace(/(.*)<a(.*?)>(.*?)<\/a>(.*)/i, '$3');
      res = sanitize(res).escape();
      res = sanitize(res).entityEncode();
      res = clearTags(res);
    }
    return res;
  };
  getNames = function(value, res) {
    if (res == null) {
      res = [];
    }
    value = clearText(value);
    value = value.replace(/(.*?)<table border="0" cellspacing="0" cellpadding="0" width="100%" class="rest_nest" id="tblpanel">(.*?)$/, '$2');
    if (value != null) {
      res = value.match(/<td class="rest_data"(.*?)<\/td>/gi);
    }
    return res;
  };
  checkLink = function(link, callback) {
    if (link != null) {
      return cn.query('select * from rlsnet where link = ?', link, function(err, rows) {
        if (!((rows != null) && (rows[0] != null) && rows[0].id > 0)) {
          if (callback) {
            return callback();
          }
        }
      });
    }
  };
  clearText = function(text) {
    if (text != null) {
      text = text.replace(/\n/gi, '');
      text = text.replace(/\r/gi, '');
      text = text.replace(/\t/gi, '');
    }
    return text;
  };
  clearTags = function(text) {
    if (text != null) {
      text = text.replace(/\&?amp\;?/gi, '');
      text = text.replace(/\&?nbsp\;?/gi, ' ');
      text = text.replace(/\&?lt\;?/gi, '');
      text = text.replace(/\&?gt\;?/gi, '');
      text = text.replace(/\&?trade\;?/gi, '');
      text = text.replace(/<?\/?sup>?/gi, '');
      text = text.replace(/\&?reg\;?/gi, '');
    }
    return text;
  };
  parsePage = function(page, link) {
    var caption, names;

    if (link == null) {
      link = '';
    }
    if (page != null) {
      caption = getCaption(page);
      names = getNames(page);
      if (names != null) {
        return names.filter(function(value, i) {
          var name;

          name = getName(value);
          if ((name != null) && (caption != null)) {
            return insertIntoBase(caption, name, link);
          }
        });
      }
    }
  };
  getPage = function(link) {
    if (link != null) {
      return get(link).asBuffer(function(err, b) {
        var page;

        if (!err) {
          page = iconv.decode(b, 'win1251');
          return parsePage(page, link);
        }
      });
    }
  };
  getLinks = function(links) {
    if (links != null) {
      return links.filter(function(value, i) {
        var link;

        link = value.replace(/href="(.*?)"/i, '$1');
        return checkLink(link, function() {
          console.log('link'.data, link.debug);
          return getPage(link);
        });
      });
    }
  };
  urls = function(i) {
    var def;

    if (i == null) {
      i = 0;
    }
    def = ['http://www.rlsnet.ru/mnn_alf_letter_2.htm', 'http://www.rlsnet.ru/mnn_alf_letter_C0.htm', 'http://www.rlsnet.ru/mnn_alf_letter_C1.htm', 'http://www.rlsnet.ru/mnn_alf_letter_C2.htm', 'http://www.rlsnet.ru/mnn_alf_letter_C3.htm', 'http://www.rlsnet.ru/mnn_alf_letter_C4.htm', 'http://www.rlsnet.ru/mnn_alf_letter_C6.htm', 'http://www.rlsnet.ru/mnn_alf_letter_C7.htm', 'http://www.rlsnet.ru/mnn_alf_letter_C8.htm', 'http://www.rlsnet.ru/mnn_alf_letter_C9.htm', 'http://www.rlsnet.ru/mnn_alf_letter_CA.htm', 'http://www.rlsnet.ru/mnn_alf_letter_CB.htm', 'http://www.rlsnet.ru/mnn_alf_letter_CC.htm', 'http://www.rlsnet.ru/mnn_alf_letter_CD.htm', 'http://www.rlsnet.ru/mnn_alf_letter_CE.htm', 'http://www.rlsnet.ru/mnn_alf_letter_CF.htm', 'http://www.rlsnet.ru/mnn_alf_letter_D0.htm', 'http://www.rlsnet.ru/mnn_alf_letter_D1.htm', 'http://www.rlsnet.ru/mnn_alf_letter_D2.htm', 'http://www.rlsnet.ru/mnn_alf_letter_D3.htm', 'http://www.rlsnet.ru/mnn_alf_letter_D4.htm', 'http://www.rlsnet.ru/mnn_alf_letter_D5.htm', 'http://www.rlsnet.ru/mnn_alf_letter_D6.htm', 'http://www.rlsnet.ru/mnn_alf_letter_D7.htm', 'http://www.rlsnet.ru/mnn_alf_letter_D8.htm', 'http://www.rlsnet.ru/mnn_alf_letter_DD.htm', 'http://www.rlsnet.ru/mnn_alf_letter_DF.htm'];
    return def[i];
  };
  if (global.dbsettings != null) {
    cn = mysql.createConnection({
      host: global.dbsettings.connections.mysql.host,
      user: global.dbsettings.connections.mysql.login,
      password: global.dbsettings.connections.mysql.password,
      database: global.dbsettings.connections.mysql.dbname
    });
  }
  if (cn != null) {
    cn.connect();
    if ((global.program != null) && (global.program.index != null)) {
      index = global.program.index;
    } else {
      index = 0;
    }
    url = urls(index);
    if (url != null) {
      console.log(url.debug);
      return get({
        uri: url
      }).asBuffer(function(err, b) {
        var data, div;

        data = iconv.decode(b, 'win1251');
        if (!err) {
          console.log('parsing...'.data);
          div = clearText(data);
          div = div.replace(/(.*?)<div class="tn_alf_list">(.*?)<div class="new_sub_slices">(.*)/i, '$2');
          return getLinks(div.match(/href="(.*?)"/gi));
        }
      });
    }
  }
};