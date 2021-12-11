// blitz.config.js
var { sessionMiddleware, simpleRolesIsAuthorized } = require("@blitzjs/server")
var withTM = require("next-transpile-modules")(["@react-three/drei", "three"])
module.exports = withTM({
  middleware: [
    sessionMiddleware({
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
})
