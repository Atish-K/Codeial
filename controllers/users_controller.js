const User = require('../models/user');

// let's keep it same as before
module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile',{
            title: 'User Profile',
            profile_user: user
        });
    });
   
}


module.exports.update = function(req ,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            req.flash('success', 'Updated!');
            return res.redirect('back');
        });
    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}


// Render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    })
}


// Render the sign in page
module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err,user){
         if(err){req.flash('error', err); return}

        if(!user){
            User.create(req.body, function(err,user){
                if(err){req.flash('error', err); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }
    });

}
// sign in and create a session for the user
module.exports.createSession = function(req,res){
    req.flash('success','Logged in Sucessfully');
    return res.redirect('/');

}

module.exports.destroySession = function(req, res){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        req.flash('success','You have Logged Out')
        res.redirect('/')
    });
    
    // return res.redirect('/');
     // this is also work
    // req.session.destroy((err) => {
    //     // req.flash('success','You have Logged Out')
       
    //     res.redirect('/') // will always fire after session is destroyed
    //   })
      
}