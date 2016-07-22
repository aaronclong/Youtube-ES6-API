"use strict";

//Google API base
const uri = "https://www.googleapis.com/youtube/v3/";

/**
  * Validates the appropriate response code
  * @param {Int} status -  whatever is returned from ajax request
  * @param {Int Array} accepts - numerical bounds of the response code
  */

function manageStatus(status, accepts) {
  if(status !== undefined && accepts instanceof Array) {
    let equals = (x, array) => {
      return array[0] === x ? true : false;
    };
    let between = (x, array) => {
      return array[0] >= x < array[1] ? true : false;
    };
    return accepts.length > 1 ? between(status, accepts) : equals(status, accepts);
  } else return false;
}

/**
  * Builds AJAX Requests based upon Method
  * @param {String} method - GET, DELETE, POST, PUT
  * @param {String} extension - url based paramater
  * @param {string} info -
  * @param {Int Array} accepts - Response codes to verify against
  */
function ajaxAction(method, extension, info, accepts) {
    return new Promise(function(resolve, reject) {
      let http = new XMLHttpRequest();
      let query = '?' + info;
      let the_uri = uri + extension + query;
      console.log(the_uri);
      http.open(method, the_uri);
      http.onload = () => {
        if (manageStatus(http.status, accepts)===true) resolve(http.response);
        else reject(http.statusText);
      };
      http.onerror = () => {
        reject(this.statusText);
      };
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      http.send();
    });
}


/**
  * Base Class for Each Data Action to Build from
  */
export default class Base {
  constructor(extension) {
    this.creds;
    this.extension = extension;
    this.field_names;
    this.__func;
    this.__params;
  }
  dlt(query_string, callback) {
    return ajaxAction('DELETE', this.extension, query_string, [200]).then(data => {
      let parse = JSON.parse(data)
      callback(parse)
      return parse;
    }).catch(error => {
      console.log(error);
    });
  }
  get(query_string, callback) {
    return ajaxAction('GET', this.extension, query_string, [200]).then(data => {
      let parse = JSON.parse(data)
      callback(parse)
      return parse;
    }).catch(error => {
      console.log(error);
    });
  }
  post(query_string, callback) {
    return ajaxAction('POST', this.extension, query_string, [200,300]).then(data => {
      let parse = JSON.parse(data)
      callback(parse)
      return parse;
    }).catch(error => {
      console.log(error);
    });
  }
  put(query_string, callback) {
    return ajaxAction('PUT', this.extension, query_string, [200]).then(data => {
      let parse = JSON.parse(data)
      callback(parse)
      return parse;
    }).catch(error => {
      console.log(error);
    });
  }
  toFormat(obj){
    if(obj instanceof Object) {
      let keys = Object.keys(obj);
      let valid = keys.filter(key => {
        if(key === 'key' || key === 'access_token') return true;
        return this.field_names.indexOf(key) > -1 ? true : false;
      });
      this.__params = '';
      let cur = [];
      for (let i = 0; i < valid.length; i++){
        let key = valid[i];
        let component = key + '=' + encodeURI(obj[key]);
        cur.push(component);
      }
      this.__params = cur.join('&');
      console.log(this.__params);
    } else throw "You need to pass an object.";
  }
}
