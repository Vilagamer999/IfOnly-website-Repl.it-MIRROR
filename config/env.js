"use strict"

const fs = require("fs")
const path = require("path")
const paths = require("./paths")

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve("./paths")]

const NODE_ENV = process.env.NODE_ENV
if (!NODE_ENV) {
    throw new Error(
        "The NODE_ENV environment variable is required but was not specified."
    )
}

const appDirectory = fs.realpathSync(process.cwd())
process.env.NODE_PATH = (process.env.NODE_PATH || "")
    .split(path.delimiter)
    .filter((folder) => folder && !path.isAbsolute(folder))
    .map((folder) => path.resolve(appDirectory, folder))
    .join(path.delimiter)

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in webpack configuration.
const REACT_APP = /^REACT_APP_/i

function getClientEnvironment(publicUrl) {
    const raw = Object.keys(process.env)
        .filter((key) => REACT_APP.test(key))
        .reduce(
            (env, key) => {
                env[key] = process.env[key]
                return env
            },
            {
                // Useful for determining whether we’re running in production mode.
                // Most importantly, it switches React into the correct mode.
                NODE_ENV: process.env.NODE_ENV || "development",
                // Useful for resolving the correct path to static assets in `public`.
                // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
                // This should only be used as an escape hatch. Normally you would put
                // images into the `src` and `import` them in code to get their paths.
                PUBLIC_URL: publicUrl,
                // We support configuring the sockjs pathname during development.
                // These settings let a developer run multiple simultaneous projects.
                // They are used as the connection `hostname`, `pathname` and `port`
                // in webpackHotDevClient. They are used as the `sockHost`, `sockPath`
                // and `sockPort` options in webpack-dev-server.
                WDS_SOCKET_HOST: process.env.WDS_SOCKET_HOST,
                WDS_SOCKET_PATH: process.env.WDS_SOCKET_PATH,
                WDS_SOCKET_PORT: process.env.WDS_SOCKET_PORT,
            }
        )
    // Stringify all values so we can feed into webpack DefinePlugin
    const stringified = {
        "process.env": Object.keys(raw).reduce((env, key) => {
            env[key] = JSON.stringify(raw[key])
            return env
        }, {}),
    }

    return { raw, stringified }
}

module.exports = getClientEnvironment