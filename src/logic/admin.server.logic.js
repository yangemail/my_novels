'use strict';

const {check, validationResult} = require('express-validator/check');
const {matcheData, sanitize} = require('express-validator/filter');

exports.checkCategoryName = check('name', '分类名称不能为空').trim().not().isEmpty();

exports.isBlock = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(422).json({errors: errors.mapped()});
        // res.render('admin/error', {
        //     errors: errors.array()
        // });
        // return;
        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            // Build your resulting errors however you want! String, object, whatever - it works!
            return `message: ${msg}`;
        };
        const result = validationResult(req).formatWith(errorFormatter);
        if (!result.isEmpty()) {
            // Response will contain something like
            // { errors: [ "body[password]: must be at least 10 chars long" ] }
            // return res.json({ errors: result.array() });
            res.render('admin/error', {
                errors: errors.array()
            });
            return;
        }
    }
}