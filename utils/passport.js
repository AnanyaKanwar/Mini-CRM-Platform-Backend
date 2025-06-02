// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('../models/User');

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "https://minicrmbackend.vercel.app/api/auth/google/callback",
//   passReqToCallback: true
// },
// async (accessToken, refreshToken, profile, done) => {
//   let user = await User.findOne({ googleId: profile.id });
//   if (!user) {
//     user = await User.create({
//       googleId: profile.id,
//       name: profile.displayName,
//       email: profile.emails[0].value,
//       avatar: profile.photos[0].value
//     });
//   }
//   return done(null, user);
// }));

// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)));
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://minicrmbackend.vercel.app/api/auth/google/callback",
  passReqToCallback: true
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value || '',
        avatar: profile.photos?.[0]?.value || ''
      });
    }
    return done(null, user);
  } catch (error) {
    console.error("Error in GoogleStrategy callback:", error);
    return done(error, null);
  }
}));
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)));
