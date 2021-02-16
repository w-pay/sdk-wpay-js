# WPay Wallet Javascript SDK

This project contains a `npm` module that can facilitate applications accessing the WPay API.

The SDK is currently in development. Therefore parts may change.

The SDK is written in Typescript which means that type definitions will be available for client
developers. Client applications can be written in Typescript or plain Javascript.

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

### API layer

The API layer is decoupled from the rest of the SDK via the
`WPayCustomerApi` and `WPayMerchantApi`
interfaces. Consumers can configure their `WPay` instance to use
an implementation of the correct repository that conforms to needs and
technology choices of the application.

#### Open API Implementation

For convenience, the [WPay SDK Open API Repository](https://github.com/woolworthslimited/sdk-wow-pay-web-openapi)
project provides an implementation of the API Repository interfaces
that wraps an API Client created with the Open API generator.

#### Reference Application

A [Reference Application]() is available to demonstrate the use of the SDK.

TODO: Reference app

## Versioning

The SDK follows [Semantic Versioning](https://semver.org/) principles.
As such if the API specification changes in a way that introduces breaking
changes (eg: path change or data changes) the major version of the SDK
will be increased.

The SDK currently supports version 0.0.7 of the API spec.

## Getting started

Read the [📘 SDK reference docs](/docs/index.html) for more information on the different types
in the SDK.

### Example usage

Some of the examples use the Open API implementation, however any class conforming to the correct
interface can be used.

#### Installation

If using the SDK in a project with a bundler (eg: Webpack) the SDK can be installed via NPM and imported like any other module. However because the module is currently private and unpublished, it can only be installed via Git. This means that a consumer will need to be authorised to clone the repo.

```shell script
# see `npm install help` for other ways to install from GitHub

# not required if using the Open API implementation as the SDK will be a transitive dependency.
$ npm install git+ssh://git@github.com:woolworthslimited/sdk-wow-pay-web.git#semver:1.0.0

# not required if not using the Open API implementation
$ npm install git+ssh://git@github.com:woolworthslimited/sdk-wow-pay-web-openapi.git#semver:1.0.0
```

<!--
TODO: When modules are published.

If using the SDK in a project with a bundler (eg: Webpack) the SDK can be installed via NPM and imported like any other module.

```shell script
# not required if using the Open API implementation as the SDK will be a transitive dependency.
$ npm install @wpay/wallet-sdk

# not required if not using the Open API implementation
$ npm install @wpay/wallet-sdk-openapi
```
-->

If using the SDK via a `<script>` tag, the `WPay` global will be made available

```html
<!-- For customer only -->
<!-- Not required if using the Open API implementation as the SDK will be bundled -->
<script type="javascript" src="wpay-wallet-sdk.customer.js" />

<!-- Not required if not using the Open API implementation -->
<script type="javascript" src="wpay-open-api-wallet-sdk.customer.js" />

<!-- For merchant only -->
<!-- Not required if using the Open API implementation as the SDK will be bundled -->
<script type="javascript" src="wpay-wallet-sdk.merchant.js" />

<!-- Not required if not using the Open API implementation -->
<script type="javascript" src="wpay-open-api-wallet-sdk.merchant.js" />

<!-- For everything -->
<!-- Not required if using the Open API implementation as the SDK will be bundled -->
<script type="javascript" src="wpay-wallet-sdk.all.js" />

<!-- Not required if not using the Open API implementation -->
<script type="javascript" src="wpay-open-api-wallet-sdk.all.js" />

<script>
const sdk = WPay.createCustomerSDK(options);
</script>
``` 

```javascript
const options = {
  apiKey: "<your key here>",
  baseUrl: "https://api.wpay.com/api"
}
```

#### Accessing an unauthenticated API

```javascript
import { createCustomerSDK } from "@wpay/wallet-sdk-openapi"

const sdk = createCustomerSDK(options);

await sdk.admin.checkHealth();
```

#### Using a preprovided access token

If an access token is acquired outside the SDK, it can be given to the SDK. However it becomes the
responsibility of the client application to manage that token.

```javascript
import { createCustomerSDK } from "@wpay/wallet-sdk-openapi"

const accessToken = aquireAccessToken();

const sdk = createCustomerSDK(options, accessToken);

await sdk.preferences.get();
```

#### Using an ApiAuthenticator

If a client application wants to wrap an existing application authentication strategy then a
custom `ApiAuthenticator` can be given to the SDK.

(This example is written in Typescript so that type information can be used).

```typescript
import { createCustomerSDK } from "@wpay/wallet-sdk-openapi"

/*
 * The SDK requires at minimum an `accessToken` to be be provided from an ApiAuthenticator.
 */
const authenticator: ApiAuthenticator<A extends HasAccessToken> = createAuthenticator();

const sdk = createCustomerSDK(options, authenticator);

await sdk.authenticate();
await sdk.preferences.get();
```

#### Using a custom API implementation class

If a client application doesn't want to use the Open API implementation then a custom implementation
class can be provided to the SDK factory.

(This example is written with ES6 classes)

```javascript
import { createCustomerSDK } from "@wpay/wallet-sdk"

class CustomCustomerApiRepository {
  /*
   * Must conform to the `CustomerApiRepositoryConstructor` signature to be compatible with SDK factory.
   */
  constructor(
    options,
    headers,
    authenticator
  ) {
    // ... instantiate properties of API repository
  }
}

const sdk = createCustomerSDK(options, "accessToken", CustomCustomerApiRepository);

await sdk.authenticate();
await sdk.preferences.get();
```

#### Completely customising the SDK

If a client application wishes to have a completely custom SDK configured, the factory function
`createCustomerSDK` or `createMerchantSDK` is the place to start to learn how to build an SDK
instance using the component parts of the SDK module.

### Building

To build the SDK from source

```shell
$ npm run dist
```

### Documentation

The SDK reference docs are generated using [TypeDoc](https://typedoc.org/)

```shell
$ npm run doc
```

## Publishing

Currently, the module build is only available in GitHub.
