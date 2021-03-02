# WPay Javascript SDK

This project contains a `npm` module that can facilitate applications accessing the WPay API.

| :memo: | The SDK is currently in development. Therefore parts may change. |
|--------|:-----------------------------------------------------------------|


The SDK is written in Javascript with Typescript definitions being published which means that 
type definitions will be available for client developers. Client applications can be written in 
Typescript or plain Javascript.

## Usage

The SDK is has the following core design philosophies.

1. Technology agnostic. Different browser applications may have different technology
choices and an SDK shouldn't force an application to depend on a different
technology stack as this bloats the build and increases complexity.

2. Swappable. Don't like a particular implementation of a part in the
SDK, then swap it out for another object that "implements" the correct
interface.

The SDK is comprised of:
 - An API layer which knows how to communicate with the WPay API
 - An authentication abstraction layer.

Applications have the flexibility to plug in different implementations of
the interfaces to allow particular technology choices (eg: choice of
HTTP client library). This makes it very easy to use the SDK in an
existing project, without necessarily introducing extra dependencies.

### Authentication layer

In order to access protected APIs, the SDK will need to know how to
authenticate with the API or a gateway that protects the API. The
`ApiAuthenticator` interface abstracts how the SDK authenticates from
the rest of the API interface. Applications that have a preexisting
authentication workflow can either update the relevant classes to implement the
`ApiAuthenticator` interface, or provide an [Adapter](https://en.wikipedia.org/wiki/Adapter_pattern#Java)
to make the existing authentication details available to the SDK.

### HTTP layer

As the WPay SDK uses the [api-sdk-creator](https://github.com/RedCrewOS/api-sdk-creator-js)
project, the HTTP stack is swappable when the SDK is created.

#### Reference Application

A [Reference Application]() is available to demonstrate the use of the SDK.

TODO: Reference app

## Versioning

The SDK follows [Semantic Versioning](https://semver.org/) principles.
As such if the API specification changes in a way that introduces breaking
changes (eg: path change or data changes) the major version of the SDK
will be increased.

The SDK currently supports version 1.0.2 of the API spec.

## Getting started

Read the [📘 SDK reference docs](/docs/index.html) for more information on the different types
in the SDK.

### Example usage

These examples use the `@api-sdk-creator/axios-http-client` `HttpClient`

#### Installation

If using the SDK in a project with a bundler (eg: Webpack) the SDK can be installed via NPM and imported like any other module. However because the module is currently private users will need access to the NPM repository.

```shell script
$ npm install @wpay/sdk
$ npm install @api-sdk-creator/axios-http-client
```

If using the SDK via a `<script>` tag, the `WPay` global will be made available

```html
<!-- Found in the @api-sdk-creator/axios-http-client repo -->
<script type="javascript" src="axios-http-client.js" />

<!-- For customer only -->
<script type="javascript" src="wpay-wallet-sdk.customer.js" />

<!-- For merchant only -->
<script type="javascript" src="wpay-wallet-sdk.merchant.js" />

<!-- For everything -->
<script type="javascript" src="wpay-wallet-sdk.all.js" />

<script>
const sdk = WPay.createCustomerSDK(AxiosHttpClient.createAxiosHttpClient, options);
</script>
``` 

```javascript
// mandatory options
const options = {
  apiKey: "<your key here>",
  baseUrl: "https://api.wpay.com/api"
}
```

#### Accessing an unauthenticated API

```javascript
const { createAxiosHttpClient } = require("@api-sdk-creator/axios-http-client");
import { createCustomerSDK } from "@wpay/sdk"

const sdk = createCustomerSDK(createAxiosHttpClient, options);

await sdk.admin.checkHealth();
```

#### Using a preprovided access token

If an access token is acquired outside the SDK, it can be given to the SDK and used for as long
as the token is valid.

```javascript
import { createCustomerSDK } from "@wpay/sdk"

options.accessToken = aquireAccessToken();

const sdk = createCustomerSDK(createAxiosHttpClient, options);

await sdk.preferences.get();
```

#### Using an ApiAuthenticator

If a client application wants to wrap an existing application authentication strategy then a
custom `ApiAuthenticator` can be given to the SDK. However it becomes the
responsibility of the client application to manage that token.

(This example is written in Typescript so that type information can be used).

```typescript
import { createCustomerSDK } from "@wpay/sdk"

const authenticator: ApiAuthenticator = createAuthenticator();
options.accessToken = authenticator;

const sdk = createCustomerSDK(createAxiosHttpClient, options);

await sdk.preferences.get();
```

### Building

To build the SDK from source

```shell
$ npm run dist
```

### Documentation

The SDK reference docs are generated using [JSDoc](https://jsdoc.app/)

```shell
$ npm run doc
```

## Publishing

Currently, publishing requires write access to the NPM organisation.
