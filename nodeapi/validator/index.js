exports.createPostValidator = (req, res, next) => {
    //title
    req.check("title", "Writer a title").notEmpty();
    req.check("title", "write a longer title").isLength({
        min: 4,
        max: 150
    });
    //body
    req.check("body", "Writer a body").notEmpty();
    req.check("body", "write a longer body").isLength({
        min: 4,
        max: 2000
    });
    //check for err
    const errors = req.validationErrors();
    //if err show the first one as they happen
    if (errors) {
        const firstError = errors.map((error) =>  error.msg)[0];
        return res.status(400).json({error: firstError });
    }
    // proceed to next middleware
    next();
};

exports.userSignupValidator = function(req,res,next) {
    // NAME IS NOT NULL AND BETWEEN 4-10 chars
    req.check("name","Name is req").notEmpty();
    //email is not null,valid and nromalised
    req.check("email","email must be between 3 to 32 CHR")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min:4,
        max:2000
    })
    //check for password
    req.check("password","password is req").notEmpty();
    req.check("password")
    .isLength({min:6})
    .withMessage("Password must contain at least 6 chr")
    .matches(/\d/)
    .withMessage("Must contain at least a digit")
    //check for errors
    const errors = req.validationErrors();
    //if err show the first one as they happen
    if (errors) {
        const firstError = errors.map((error) =>  error.msg)[0];
        return res.status(400).json({error: firstError });
    }
    // proceed to next middleware
    next();
}
