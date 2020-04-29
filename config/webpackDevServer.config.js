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
        // Silence WebpackDevServer's own logs since they're generally not useful.
        clientLogLevel: "none",
        contentBase: paths.appPublic,
        contentBasePublicPath: paths.publicUrlOrPath,
        // By default files from `contentBase` will not trigger a page reload.
        watchContentBase: true,
        // Enable hot reloading server. It will provide WDS_SOCKET_PATH endpoint
        // for the WebpackDevServer client so it can learn when the files were
        // updated. The WebpackDevServer client is included as an entry point
        // in the webpack development configuration. Note that only changes
        // to CSS are currently hot reloaded. JS changes will refresh the browser.
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
        // src/node_modules is not ignored to support absolute imports
        // https://github.com/facebook/create-react-app/issues/1065
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
        // `proxy` is run between `before` and `after` `webpack-dev-server` hooks
        proxy,
        before(app, server) {
            // Keep `evalSourceMapMiddleware` and `errorOverlayMiddleware`
            // middlewares before `redirectServedPath` otherwise will not have any effect
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
            // Redirect to `PUBLIC_URL` or `homepage` from `package.json` if url not match
            app.use(redirectServedPath(paths.publicUrlOrPath))
        },
    }
}
