'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    SkillsSchema = new Schema({
        skills: Schema.Types.Mixed
    });

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('skills', SkillsSchema);