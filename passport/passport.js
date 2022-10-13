const handleLogin = (passport, localStrategy) => {
  passport.use(
    'login',
    new localStrategy((username, password, done) => {
      user;
    })
  );
};

const handleSignup =
  ('signup',
  new localStrategy(
    {
      passReqToCallBack: true,
    },
    (req, username, password, done) => {
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          console.log('Error en signup: ', err);
          return done(err);
        }

        if (user) {
          console.log('User already exists');
          return done(null, user);
        }

        const newUser = {
          username: username,
          password: password,
          name: 'Pepe',
        };

        User.create(newUser, (err, userWithId) => {
          if (err) {
            console.log('Error saving user: ', err);
            return done(error);
          }
          console.log(user);
          console.log('User registration succesful');
          return done(null, userWithId);
        });
      });
    }
  ));
