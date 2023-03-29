/**
 * This function takes in an async function and handles any error that the callback might produce. 
 * @param {*} cb is a function defined in a controller that requests data.
 * @returns the results of the executed call back function. 
 */
export function asyncRequestWrapper(cb) {
    return function (req, res, next) {
      cb(req, res, next)
      .catch((err) =>  {
            console.log({message: "error with req", error: err}); 
            next(err)
        }); 
    }
}