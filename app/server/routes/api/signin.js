// sign in, sign up, log out functionality

const User = require('../../models/User')
module.exports = (app) => {

app.post('api/account/signup', (req, res, next) => {
    const { body } = req;
    const { firstName,
            lastName,
            email,
            password
         } = body;
         
         if (!firstName) {
             res.end({
                 success: false,
                 message: 'Error: Values cannot be blank'
             });
         }
         if (!lastName) {
             res.end({
                 success: false,
                 message: 'Error: Values cannot be blank'
             });
         }
         if (!email) {
             res.end({
                 success: false,
                 message: 'Error: Values cannot be blank'
             });
         }
         if (!password) {
             res.end({
                 success: false,
                 message: 'Error: Values cannot be blank'
             });
         }

         email = email.toLowerCase();

         //Check if email exists
         User.find({

         }, (err, previousUsers) => {
            if (err) {
                res.end('Error: Server error');
            } else if (previousUsers.length > 0) {
                res.end('Error: User with this email already exists');
            }

            // if email does not exist save new user
            const newUser = new User();
            newUser.email = email;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.password = newUser.generateHash(password);
            newUser.save((err, user) => {
                if (err) {
                    res.end({
                        success: false,
                        message: 'Error: Server error'
                    });
                }

                res.end({
                    success: true,
                    message: 'User created!'
                });
            })
         })


         //save email
})

};