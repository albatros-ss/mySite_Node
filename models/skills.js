'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    SkillsSchema = new Schema({
        skills: {type: Array, default: [{
        "HTML5" : "90",
        "CSS3" : "90",
        "JavaScript & jQuery" : "65",
        "NodeJs & npm" : "30",
        "MongoDB" : "15",
        "Git" : "75",
        "Gulp" : "85",
        "Webpack" : "25"
        }]}
    });

mongoose.model('skills', SkillsSchema);