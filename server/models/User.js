const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // List of ratings this user has made
    ratings: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Rating',
        },
      ],
      validate: [ratingsLimit, 'Number of ratings exceeds 100000'],
    },
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Checks if the length of the ratings array is below 100,000
function ratingsLimit(val) {
  return val.length <= 100000;
}

// hash user password
UserSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
UserSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', UserSchema);

module.exports = User;
