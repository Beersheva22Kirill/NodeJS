
const valid = (req,res,next) => {
    
    if (!req.body) { 
        throw 'Not body exists'
    } 

    if (!req.validated) {
        throw 'Must be validated'
    }

    if(!req.joiError){
        req.status(400);
        throw req.joiError;
    }

    
    next();
}

export default valid;