/**
 * Created by richard on 17-6-1.
 */
'use strict';

const _ = require('lodash');
const mongoose = require('mongoose');
const Article = mongoose.model('Article');
const User = mongoose.model('User');
const path = require('path');
const URL = require('url');
