"use strict"

const fs = require("fs")
const path = require("path")
const paths = require("./paths")

function getAdditionalModulePaths(options = {}) {
    const baseUrl = options.baseUrl

    // We need to explicitly check for null and undefined (and not a falsy value) because
    // TypeScript treats an empty string as `.`.
    if (baseUrl == null) {
        // If there's no baseUrl set we respect NODE_PATH
        // Note that NODE_PATH is deprecated and will be removed
        // in the next major release of create-react-app.

        const nodePath = process.env.NODE_PATH || ""
        return nodePath.split(path.delimiter).filter(Boolean)
    }

    const baseUrlResolved = path.resolve(paths.appPath, baseUrl)

    // We don't need to do anything if `baseUrl` is set to `node_modules`. This is
    // the default behavior.
    if (path.relative(paths.appNodeModules, baseUrlResolved) === "") {
        return null
    }

    // Allow the user set the `baseUrl` to `appSrc`.
    if (path.relative(paths.appSrc, baseUrlResolved) === "") {
        return [paths.appSrc]
    }

    // If the path is equal to the root directory we ignore it here.
    // We don't want to allow importing from the root directly as source files are
    // not transpiled outside of `src`. We do allow importing them with the
    // absolute path (e.g. `src/Components/Button.js`) but we set that up with
    // an alias.
    if (path.relative(paths.appPath, baseUrlResolved) === "") {
        return null
    }
}

function getWebpackAliases(options = {}) {
    const baseUrl = options.baseUrl

    if (!baseUrl) {
        return {}
    }

    const baseUrlResolved = path.resolve(paths.appPath, baseUrl)

    if (path.relative(paths.appPath, baseUrlResolved) === "") {
        return {
            src: paths.appSrc,
        }
    }
}

function getModules() {
    const hasJsConfig = fs.existsSync(paths.appJsConfig)

    let config
    if (hasJsConfig) {
        config = require(paths.appJsConfig)
    }

    config = config || {}
    const options = config.compilerOptions || {}

    const additionalModulePaths = getAdditionalModulePaths(options)

    return {
        additionalModulePaths: additionalModulePaths,
        webpackAliases: getWebpackAliases(options),
        hasTsConfig: false,
    }
}

module.exports = getModules()