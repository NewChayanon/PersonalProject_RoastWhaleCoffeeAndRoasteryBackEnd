const passport = require("passport");
const userService = require("../services/user-service");
const hashService = require("../services/hash-service");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${process.env.PORT_BACK_END || 8888}/auth/google/callback`,
    },
    async (token, tokenSecret, profile, done) => {
      try {
        const { email, given_name: first_name, family_name: last_name, picture: profile_image } = profile._json;
        let user = await userService.findEmail(email);
        
        if (!user) {
          const data = {
            email,
            password:await hashService.hash(profile.id),
            first_name,
            last_name,
            display_name: profile.displayName,
            google_id: await hashService.hash(profile.id),
          };
          if (profile_image) {
            data.profile_image = profile_image;
          }
          user = await userService.createUserByData(data);
        } else {
          const isMatch = await hashService.compare(profile.id, user.google_id);
          if (!isMatch) {
            return done(null, false, { message: "Invalid credentials" });
          }
        }
        profile.id = user.id;
        return done(null, profile);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
