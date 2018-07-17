'use strict';

const randomSalt = function getRandomSalt() {

    let milliseconds = new Date().getTime();
    let timestamp = (milliseconds.toString()).substring(9, 13)
    let random = ("" + Math.random()).substring(0, 20);
    let random_number = timestamp+random;  // string will be unique because timestamp never repeat itself
    let random_string = btoa(random_number).substring(0, 20); // you can set size here of return string
    let return_string = '';
    let Exp = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
    if (random_string.match(Exp)) {                 //check here whether string is alphanumeric or not
        return_string = random_string;
    } else {
        return getRandomSalt();  // call recursivley again
    }
    return return_string;
};

export default randomSalt;