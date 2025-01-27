import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import User from "../models/User.js";
import env from "dotenv";

env.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      console.log(profile);
      try {
        const user = await User.findOrCreate({
          googleId: profile.id,
          username: profile.displayName,
          token: accessToken,
        });

        console.log("User found or created:", user);

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

export default passport;
