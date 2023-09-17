

export default function errorHandler(err,req,res,next) {
    res.send(err);
}