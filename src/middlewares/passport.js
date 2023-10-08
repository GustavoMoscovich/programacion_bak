import passport from "passport";
import { Strategy } from "passport-local";
import GhStrategy from "passport-github2";
import jwt from "passport-jwt";
import User from "../dao/mongo/models/userdb.js";
import config from "../config/config.js";

export default function () {
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    return done(null, user);
  });
  passport.use(
    "register", // se le asigna el nombre a la estrategia
    new Strategy( // se crea y define la estretégia propiamente dicha
      { passReqToCallback: true, usernameField: "email" }, // objeto de configuración
      async (req, username, password, done) => {
        //callback que será la encargada de procesar los datos y dejarme PASAR
        try {
          //let one = await User.findOne({ mail:req.body.mail })
          let one = await User.findOne({ email: username }); //en L18 se configuró como campo principal el mail popr eso esto es lo mismo que la L22
          if (!one) {
            let user = await User.create(req.body);
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  passport.use(
    "login",
    new Strategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          //console.log('passport.js: ',username)
          let usr = await User.findOne({ email: username });
          if (!usr) {
            //console.log('passport.js login no lo encontró')
            return done(null);
          } else {
            return done(null, usr); 
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // para usar con GitHub
  passport.use(
    "github",
    new GhStrategy(
      {
        clientID: 'Iv1.528468346494adad' , //  'process.env.GH_CLIENT_ID',
        clientSecret: '7ab3ca828854f4415cacab5b92531879e22d46f1', // 'process.env.GH_CLIENT_SECRET',
        callbackURL: 'http://localhost:8080/api/auth/github/callback', // 'process.env.GH_CB',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          //console.log('profile: ',  profile);
          let user = await User.findOne({ email: profile._json.login });
          if (user) {
            return done(null, user);
          } else {
            let one = await User.create({
              name: profile.username,
              email: profile._json.login,
              password: profile.profileUrl,
            });
            return done(null, one);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new jwt.Strategy(
      {
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([
          (req) => req?.cookies["token"],
        ]),
        secretOrKey: config.SECRET_KEY,
      },
      async (payload, done) => {
        try {
          //console.log('passport jwt: ', payload);
          let one = await User.findOne({ email: payload.mail });
          if (one) {
            done(null, one); 
          } else {
            done(null);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

}



