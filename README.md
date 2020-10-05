# [Reference](https://www.valentinog.com/blog/babel/)
## Initialize the project
    npm init -y
## Install Webpack
    npm i webpack webpack-cli --save-dev
## Add webpack command to package.json
    "scripts": {
        "build": "webpack --mode production"
    }
__babel-loader is the webpack loader responsible for talking to Babel. Babel on the other hand must be configured to use presets.__
- __babel preset env__ for compiling modern Javascript down to ES5
- __babel preset react__ for compiling JSX and other stuff down to Javascript
## Now install
    npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev

> To resolve error: Support for the experimental syntax 'classProperties' isn't currently enabled we should install __@babel/plugin-proposal-class-properties__

    npm i --save-dev @babel/plugin-proposal-class-properties

## For processing html, we should install additional components __html-webpack-plugin and html-loader__
    npm i html-webpack-plugin html-loader --save-dev

## Create and Configure __.babelrc__

    {
        "presets": [
            "@babel/preset-env",
            "@babel/preset-react"
        ],
        "plugins": [
            [
                "@babel/plugin-proposal-class-properties",
                {
                    "loose": true
                }
            ]
        ]
    }

## Create and configure webpack.config.js
    const HtmlWebPackPlugin = require("html-webpack-plugin");
    const path = require("path");

    module.exports = {
        entry: {
            index: path.resolve(__dirname, "src", "index.js")
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    resolve: { extensions: [".js", ".jsx"] },
                    use: {
                        loader: "babel-loader"
                    },
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader"
                        }
                    ]
                }
            ]
        },
        output: {
            path: path.resolve(__dirname, "../static/"),
            chunkFilename: '../static/[id].js'
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                filename: "./index.html"
            })
        ]
    };

## For webpack server install __webpack-dev-server__
    npm i webpack-dev-server --save-dev

## Package.json __scripts__
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "webpack --mode production",
        "start": "webpack-dev-server --open --mode development"
    }

### Create build file
    npm run build

# Configuration for Django

### `settings.py`
    STATIC_URL = "/static/"

    STATICFILES_DIRS = [
        BASE_DIR / "static",
    ]

    MEDIA_URL = ""
    MEDIA_ROOT = BASE_DIR / "media/"

### `urls.py`
    from django.conf import settings
    from django.conf.urls.static import static
    from django.urls import path
    from home.views import home

    urlpatterns = [
        path( "", home, name="home"),
    ]+ + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

### `templates/index.html`
    {% load static %}
    <!doctype html>
    <html lang="en">

    <head>
        <meta charset="utf-8">
        <title>React, Webpack, and Babel</title>
    </head>

    <body>
        <div id="container"></div>
        <script src="{% static 'index.js' %}"></script>
    </body>

    </html>

### `views.py`
    from django.shortcuts import render


    def home(request):
        return render(request, "index.html")