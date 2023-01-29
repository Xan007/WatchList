import jwt from "jsonwebtoken";
import passport from "passport";

import db from "../db/index.js"
import roleHierarchy from "../db/roleHierarchy.js"

export const authenticate = passport.authenticate("jwt", { session: false });

export const signToken = (id) => {
  const token = jwt.sign({ sub: id }, process.env.SECRET, {
    expiresIn: "1d",
  });

  return token;
};

export const hasRole = (role_name) => {
  return async(req, res, next) => {
    try {
      const row_result = await db.query("SELECT role FROM users WHERE user_id = $1::INT", [req.user.user_id]).rows[0]
      if (!row_result)
        throw new Error(`Couldn't find role for that user`)

      const { role } = row_result

      if (roleHierarchy[role] < roleHierarchy[role_name])
        throw new Error(`User doesn't have permissions: endpoint for ${role_name}`)

      next()
    } catch(err) {
      next(err)
    }
  }
}