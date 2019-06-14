'use strict';

export default function (url, data, cb) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);

  xhr.onload = function () {
    let result = JSON.parse(xhr.responseText);
    cb(result.status);
  };

  xhr.send(data);
}