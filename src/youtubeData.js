"use strict";

import Search from './search';

/** Base Object Where queries will be made and processed
  * for Youtubes v3 Data API.
  * Client Side ES6 based.
  */
export default class Youtube {
  constructor(API_KEY, AUTH_TOKEN) {
    if(API_KEY == undefined) throw "Google API Key is required";
    //Basic Props to run
    this.API_KEY = API_KEY;
    this.AUTH_TOKEN = AUTH_TOKEN !== undefined ? AUTH_TOKEN : false;

    //Branch Objects
    this.Search = new Search(this.creds.bind(this));
  }
  creds(){
    let CREDS = { 'key' : this.API_KEY, 'access_token' : this.AUTH_TOKEN };
    if(CREDS['access_token'] == false) delete CREDS['access_token'];
    return CREDS;
  }
}
