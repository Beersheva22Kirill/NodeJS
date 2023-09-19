import Joi from "joi";
import config from 'config'

const {minId, maxId, minDate, maxDate, departments, minSalary, maxSalary} = config.get('employee');

export const schemaEmployee = Joi.object({
    id: Joi.number().min(minId).max(maxId),
    name:Joi.string().required(),
    department: Joi.any().allow(...departments).required(),
    salary: Joi.number().min(minSalary).max(maxSalary).required(),
    birthDate: Joi.date().iso().less(maxDate).greater(minDate).required(),
    gender:Joi.string().valid('male','female').required()
});
