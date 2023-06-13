<img  src="https://static.mparticle.com/sdk/mp_logo_black.svg"  width="280"><br>

![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)

# The Core Snippet Sample App

This sample Web application will provide you with a hands-on way to understand how mParticle collects and forwards data, so you can easily implement data collection in your own projects. Throughout this application, the mParticle Web has been set up to initialize mParticle via a "snippet", capture user events and identities and forward them to mParticle.

By using this sample app, you will quickly learn how to:

-   Set up mParticle's Web Snippet

-   Collect and forward data with mParticle

-   View incoming data events and debugging information in real time

-   Implement data collection with mParticle's SDKs

## Getting Started

1. Open the root of this project in your IDE or Editor of choice

2. Install package dependencies using `npm install`

3. Locate `src/snippet.js` file and find the part of the code that says `REPLACE WITH API KEY`.

4. Update `REPLACE WITH API KEY` environment variable with with your mParticle Web API Key.

-   If you do not have a Web API key, visit your [mParticle Workspace](https://app.mparticle.com/setup/inputs/apps), then navigate to **Setup > Inputs** in the left column to generate one.

5. Run the project using `npm serve`

This will spawn a development server which listens on port `8080` by default. Manually navigate your browser to the address that is displayed in your console. `http://127.0.0.1:8080/` by default.

## Events used in this app

To make things simple yet declarative, this application has been built in such a way to keep event tracking close to the components that might logically trigger them rather than a fully DRY implementation. We've opted to be more repetitive so examples are consise and documented as necessary.

Please feel free to also visit our [Doc Site](https://docs.mparticle.com/) to gain more familiarity with some of the more advanced features of mParticle.

## Debugging The Web SDK

To use this application to debug or develop the Web SDK, please check out the [mParticle Web SDK Repository](https://github.com/mParticle/mparticle-web-sdk).

You can run this project in conjunction with the Web SDK using `npm link` to simulate importing the Web SDK into this project.

To do this:

-   It is recommended that you use [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) to make sure both your Web SDK and Sample app are on the EXACT same version of Node.

1. Clone the [mParticle Web SDK Repository](https://github.com/mParticle/mparticle-web-sdk) in a seperate folder on your computer.

2. Within your local copy of Web SDK directory:

-   run `npm install` to install any necessary dependencies.
-   run `npm link` so that npm registers your current Web SDK directory.
-   run `npm run watch` so that mParticle rebuilds your dev instance of the SDK whenever you make a code change.

3. Within the `core-sample-apps/core-snippet-sample-app` directory

-   run `npm link @mparticle/web-sdk` to link this sample app with your local instance of the Web SDK.
-   run `npm run serve` to activate your simple web server and navigate to the address in your console. Default should be `http://127.0.0.1:8080`
-   run `npm install` to install any necessary dependencies.
-   Modify `index.html` so that `src/snippet.js` is commented out and that the "Local Development" script tags are enabled.
-   Update `REPLACE WITH API KEY` within index.html with with your mParticle Web API Key.

## Support

<support@mparticle.com>

## License

The mParticle Web SDK is available under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0). See the LICENSE file for more info.
