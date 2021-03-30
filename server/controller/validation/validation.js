const Joi = require('joi');

exports.validateRegistarAdmin = (data) => {
    // Create Schema
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
        repeat_password: Joi.ref('password')
    });

    return schema.validateAsync(data);
};

exports.validateRegisterStudent = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
        repeat_password: Joi.ref('password'),
        degrees: Joi.number()
    });
    return schema.validateAsync(data);
}

exports.validateLogin = (data) => {
    // Create Schema
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    });

    return schema.validateAsync(data);
};

exports.validateAddLevel = (data) => {
    // Create Schema
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required(),
        level: Joi.number()
            .min(1)
            .max(5)
            .required()
    });

    return schema.validateAsync(data);
};

exports.validateAddSubjects = (data) => {
    // Create Schema
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required(),
        level: Joi.number()
            .min(1)
            .max(5)
            .required(),
        subjects: Joi.array()
            .items(
                Joi.object({
                    subject: Joi.string().required(),
                    degree: Joi.number().min(0).max(0).required()
                })
            )
            .required()
            .min(1)
    });
    return schema.validateAsync(data);
};

exports.validateAddDegrees = (data) => {
    // Create Schema
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required(),
        level: Joi.number()
            .min(1)
            .max(5)
            .required(),
        subjects: Joi.array()
            .items(
                Joi.object({
                    subject: Joi.string().required(),
                    degree: Joi.number().min(1).max(100).required()
                })
            )
            .required()
            .min(1)
    });

    return schema.validateAsync(data);
};

exports.validateGetAllDataStudent = (data) => {
    // Create Schema
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required()
    });
    return schema.validateAsync(data);
};

