const {validationResult}= require('express-validator')
const contactController = {
    contato: (req, res) => {
        const context = {}
        res.render('contact', context);
    },
    sent:(req,res,next)=>{

 const errors = validationResult(req)
       
if(!errors.isEmpty()){
    return res.render('contact',{errors:errors.mapped(),old:req.body})
}else{
   return res.render('contactSent')
}
    }
    
}

module.exports = contactController;