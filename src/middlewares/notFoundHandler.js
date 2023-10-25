import logger from "../config/logger.js";

const not_found_handler = (req, res, next) => {
  req.logger = logger;
  req.logger.ERROR(
    `${req.method} ${
      req.url
    } - ${new Date().toLocaleTimeString()} - not found path`
  );
  return res.status(404).json({
    method: req.method,
    path: req.url,
    message: "not found",
  });
};

export default not_found_handler;




/*
export default (req,res,next)=> {
    return res.status(404).json({
        success:false,
        message:'endpoint nod found'
    })
}
*/