import passport from "passport";
import GoogleStrategy from "passport-google-oauth2";
import User from "../models/User";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/google",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const user = await User.findOrCreate({
          googleId: profile.id,
          username: profile.name,
        });
        console.log(user);
        return done(null, user);
      } catch (err) {
        console.error("Error during user findOrCreate:", err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});
