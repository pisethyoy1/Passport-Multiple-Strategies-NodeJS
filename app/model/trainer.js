const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const trainerSchema = mongoose.Schema({
	//Data for local authentication
	local: {
		//login email and password
		email 		 	: { type: String, required: true },
		password 	 	: String,
		//account info
        isTrainer    	: Boolean,
        name 		 	: String,
        description	 	: String,
        age             : String,
        birthday        : Date,
        address         : [String],
        specialization	: [String],
        gymInfo		    : String
	},
	//Data for oauth using facebook
	facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    //Data for oauth using gmail or google+
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

trainerSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

trainerSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};


module.exports = mongoose.model('Trainer', trainerSchema);