"use strict";
//The Lookup: https://developers.google.com/youtube/v3/docs/search/list#try-it

import Base from './base';

export default class Search extends Base {
  constructor(ref_func) {
    super('search');
    this.creds = ref_func();
    this.field_names = [ 'part' , 'forDeveloper' , 'forMine' , 'relatedToVideoId' , 'relatedToVideoId' ,
                          'channelType' , 'eventType' , 'location' , 'locationRadius' , 'maxResults' , 'onBehalfOfContentOwner' ,
                          'order' , 'pageToken' , 'publishedAfter' , 'publishedBefore' , 'q' , 'regionCode' ,
                          'relevanceLanguage' , 'safeSearch' , 'topicId' , 'type' , 'videoCaption' , 'videoCategoryId' , 'videoDefinition',
                          'videoDimension' , 'videoDimension' , 'videoDuration' , 'videoLicense' , 'videoSyndicated' , 'videoType' ];
  }
  set params(obj) {
    this.toFormat(Object.assign(this.creds, obj));
  }
  search(callback) {
    console.log(this.__params.length);
    if(this.__params.length  > 0) {
      this.get(this.__params, callback);
    } else throw "Parameters must be set before this method may be called!";
  }
}
