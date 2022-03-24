
  

<img  src="https://static.mparticle.com/sdk/mp_logo_black.svg"  width="280"><br>

![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)

# The HiggsMart Sample App
:wave: Hello and welcome to HiggsMart! This sample Web application will provide you with a hands-on way to understand how mParticle collects and forwards data, so you can easily implement data collection in your own projects. Throughout this application, the mParticle Web and Media SDK have been set up to capture user events and identities and forward them to mParticle.

By using this sample app, you will quickly learn how to:

- Collect and forward data with mParticle

- View incoming data events and debugging information in real time

- Implement data collection with mParticle's SDKs

## Getting Started
1. Open the root of this project in your IDE or Editor of choice

2. Install package dependencies using `npm install`

3. Run the project using `npm start`

This will spawn a development server and open your browser to the HiggsMart sample app.

## Set up HiggsMart as a Web input in mParticle
While the code for this app may run and build without mParticle credentials, the SDKs will not upload events to our servers, and this will generate errors. In order to send data from this application to mParticle, you need to establish it as a Web input [input](https://docs.mparticle.com/guides/getting-started/create-an-input/) by completing these steps:

1. Navigate to **Setup > Inputs** in the left column of your [mParticle Workspace](https://app.mparticle.com/setup/inputs/apps).

2. Click anywhere in the "Web" row, then copy the generated Key.

3. In the root of this project, rename `.env.sample` to `.env` .

4. Update the `REACT_APP_MPARTICLE_API_KEY` environment variable with with your mParticle Web API Key

## Send data to mParticle
Now that HiggsMart is set up as an input, your on-site behaviors in the local build of this app will be captured and sent to mParticle as data events. To see this data in real time, navigate to **Data Master > Live Stream** in the mParticle UI.

Among other things, the mParticle [Live Stream](https://docs.mparticle.com/guides/data-master/live-stream/) allows you to:

- Review incoming data to ensure correct SDK and/or server-to-server implementation

- Quickly identify and debug data collection errors

- Review outbound events to your connected integrations

- Test that your integrations are set up correctly

## Set up an output for your events
[Outputs](https://docs.mparticle.com/guides/getting-started/connect-an-event-output/#outputs) are destinations for data that has been forwarded to mParticle. Outputs can include analytics tools (like Indicative or Mixpanel), data processing services (like Amazon Kinesis), or marketing tools (like Braze or Appsflyer).

An output can also be a simple Webhook, and since this provides an easy way to set up a complete flow of data, a Webhook is what we'll use for this example. To set up a Webhook output in mParticle:

1. Navigate to **Setup > Inputs** in the left column of your mParticle Workspace.

2. Click the "Add Event Output" button in the top-right corner of the UI.

3. Select "Webhooks" from the dropdown.

4. Enter the configuration name “Web Sample App”

5. Open [Webhook.site](https://www.webhook.site) in a new browser tab and copy your Webhook's unique URL.

6. In mParticle, paste the unique URL in the "POST URL" field in the event configuration window, then click "Save."

## Create a connection between your input and output
A [connection](https://docs.mparticle.com/guides/platform-guide/connections/) is the combination of an input, an output, and the configuration information that determines how data should be shared between the two. To create a connection between HiggsMart and your Webhook:

1. Navigate to **Connections > Connect** in the left column of your mParticle Workspace.

2. Click "Web Platform" to select the web app input you just created.

3. Click "Connect Output" to view all available outputs.

4. Select the Webhooks group of connections, then click "Select Configuration."

5. Choose "Web Sample App" from the dropdown, then click "Next."

6. Toggle the “Status” button to “Active,” then click “Add Connection” to create the connection.

## Review forwarded events
At this point, data should be flowing from your sample app, to mParticle, then finally out to your Webhook output. Let's test this to make sure it's working. Back in the **Data Master > Live Stream** view:

1. Click the "Message Direction" dropdown and select “Outbound.”

2. Go back to Webhook.site to view your request details

Here, you should see your events from mParticle arriving at their intended destination. And that's it! You have successfully collected and forwarded data with mParticle.

## Development Notes
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
  
## Support

<support@mparticle.com>

## License 

The mParticle Web SDK is available under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0). See the LICENSE file for more info.