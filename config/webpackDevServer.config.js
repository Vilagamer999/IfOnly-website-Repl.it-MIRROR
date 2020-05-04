"use strict"

const fs = require("fs")
const errorOverlayMiddleware = require("react-dev-utils/errorOverlayMiddleware")
const evalSourceMapMiddleware = require("react-dev-utils/evalSourceMapMiddleware")
const ignoredFiles = require("react-dev-utils/ignoredFiles")
const redirectServedPath = require("react-dev-utils/redirectServedPathMiddleware")
const paths = require("./paths")

const host = process.env.HOST || "0.0.0.0"
const sockHost = process.env.WDS_SOCKET_HOST
const sockPath = process.env.WDS_SOCKET_PATH
const sockPort = process.env.WDS_SOCKET_PORT

module.exports = function (proxy, allowedHost) {
    return {
        disableHostCheck:
            !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === "true",
        compress: true,
        clientLogLevel: "none",
        contentBase: paths.appPublic,
        contentBasePublicPath: paths.publicUrlOrPath,
        watchContentBase: true,
        hot: true,
        // Use 'ws' instead of 'sockjs-node' on server since we're using native
        // websockets in `webpackHotDevClient`.
        transportMode: "ws",
        // Prevent a WS client from getting injected as we're already including
        // `webpackHotDevClient`.
        injectClient: false,
        sockHost,
        sockPath,
        sockPort,
        publicPath: paths.publicUrlOrPath.slice(0, -1),
        quiet: true,
        // Reportedly, this avoids CPU overload on some systems.
        // https://github.com/facebook/create-react-app/issues/293
        watchOptions: {
            ignored: ignoredFiles(paths.appSrc),
        },
        https: undefined,
        host,
        overlay: false,
        historyApiFallback: {
            // Paths with dots should still use the history fallback.
            // See https://github.com/facebook/create-react-app/issues/387.
            disableDotRule: true,
            index: paths.publicUrlOrPath,
        },
        public: allowedHost,
        proxy,
        before(app, server) {
            // This lets us fetch source contents from webpack for the error overlay
            app.use(evalSourceMapMiddleware(server))
            // This lets us open files from the runtime error overlay.
            app.use(errorOverlayMiddleware())

            if (fs.existsSync(paths.proxySetup)) {
                // This registers user provided middleware for proxy reasons
                require(paths.proxySetup)(app)
            }
        },
        after(app) {
            app.use(redirectServedPath(paths.publicUrlOrPath))
        },
    }
}
