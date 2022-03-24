const Profile = require('../model/customerProfile');
exports.viewProfile = (request,response) => {
   Profile.findOne({_id:request.params.id}).then(result=>{
       console.log(result);
       return response.status(200).json(result);
   }).catch(err=>{
       return response.status(500).json(err);
   });
}
exports.deleteProfile = (request,response) => {
    Profile.deleteOne({_id:request.params.id}).then(result=>{
        console.log(result);
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    });
}