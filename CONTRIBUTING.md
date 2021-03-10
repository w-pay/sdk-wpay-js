# Developing the WPay SDK

As the WPay API evolves, it will become necessary to update the SDK to cater for the changes.

The goal of this doc is to outline the steps needed to uplift the SDK to a new API version.

## Target a spec version

The SDK targets a particular version of the [WPay API specification](https://github.com/woolworthslimited/oas-wow-pay-wallet/). When uplifting the SDK the first task is to 
identify what the changes are between the version the SDK was targeting, and the new version
of the specification.

Once the differences are analysed the Typescript definitions need to be updated. This includes
defining new model types that model the inputs and outputs of the SDK, and the interfaces that
collect the operations on the SDK. This defines the "requirements" of the SDK in an executable
format. Documentation should be added to the definitions as these are part of the HTML docs 
that are generated from the project which will be used by application developers.

The WPay SDK tries to group related operations together to organise the SDK and prevent the
necessity of long, complex operations names. For example `sdk.instruments.list()` instead of
`sdk.listPaymentInstruments()`. New interfaces can be added grouping operations together in
a way that is a natural fit for developers to use while still being faithful to the API
specification.

## Data transformation

The SDK tries to do some nice things for application developers, one of which is to transform 
JSON datatypes into JavaScript datatypes. For example, an ISO8601 date string can be converted 
into a `Date` object so that the application developer can use the date data. If changes in the 
models (or there are addition of new models) then data transformers need to be written.

The SDK uses the concept of a "DTO" to represent the JSON data being sent to or received from 
the API, and "model" to represent an object that is one of the SDK model types. Builder 
functions are used to create sample data, and [Hamjest](https://github.com/rluba/hamjest) 
matchers are used to assert that transformation is correct.

## API implementation

The WPay SDK builds on the [API SDK Creator](https://github.com/RedCrewOS/api-sdk-creator-js)
library which allows SDK developers to model the consuming of an API endpoint as a sequence of
functions that are composed (piped) together to form a function that is capable of calling an 
API endpoint. The SDK facades the implementation functions behind an OO style interface as that
is more natural (and familar) for application developers to use.

As each API interface (eg: AdministrationApi) is a function, we use a Functional Programming 
technique called currying to create functions that return functions, so that a `client` can be 
bound when the SDK is created, and used later when the API operation is invoked. This is a
functional form of Dependency Injection, but instead of injecting objects, the SDK is injecting
functions.

The method of the
SDK module (eg: `CustomerPaymentSessionsApi.list()`) that is used by the end application
developer is deliberately left uncurried. This is to allow application developers to be able to
use optional parameters. In a curried nAry function, all arguments must be given which doesn't
allow for optional arguments. Consequently, having a curried function returning an uncurried
function is the best compromise.

JSDoc comments are used to link the JavaScript code to the Typescript defs to aid with code
completion, etc.

Each of the different "API interfaces" that make up the SDK are tested with stub `HttpClient`
and `HttpApiClient` objects available for tests to use, and the existing tests can be used as
a starting point.

## Testing

All components of the SDK are expected to be tested, and Test Driven Development is a good
practise to use in order to achieve that outcome. Tests are run as part of the "build" process
for the SDK.

## Documentation

End documentation for application developers can be generated using the `doc` script in the
`package.json`. The SDK documentation should be of a sufficient standard to have application
developers quickly understand how to use the components of the SDK.

## Versioning

In accordance with [SemVer](https://semver.org/) the SDK should see the version changed based
on the type of changes occurring. Breaking changes to the SDK should really occur without a
breaking change in the API specification, which would see the major versions bumped accordingly.

## Publishing

Currently, the SDK is published to an internal WPay NPM registry on pushing/merging to the `main` branch. In order for the publishing to succeed the version number of the module needs to be incremented pre-merging.

The development strategy is that work should take place on an `uplift` branch and merged when the changes are ready to be published, including the version bump as required under the SemVer rules.
