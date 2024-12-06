import { ValidationError } from "../errors/TypesError.js";


export const validationMiddleware = (validatorFn) => {
    return (req, res, next) => {
        try{
            validatorFn(req.body);
            next()
        } catch(error) {
            if(error instanceof ValidationError) {
                return res.status(400).json({
                    error: 'Errores de Validación',
                    details: error
                })
            }

            next(error)
        }
    }
}