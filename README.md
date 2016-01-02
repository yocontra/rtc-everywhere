# rtc-everywhere [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

![fancy thing](https://i.imgur.com/xDnqJCo.gif)

## What is this?

Hidden in the incompatible mess of vendor prefixes, adapters, plugins, extensions, and native modules - WebRTC is available. This library aims to tie the whole ecosystem together and ensure your code works the same in any environment.

TODO: More documentation inbound

### Supported Environments

#### Desktop

- Chrome
- Firefox
- MS Edge [Partial]
  - No data channels
- Safari 7+
  - Requires Temasys Plugin
- Internet Explorer 9+ [In Progress]
  - Requires Temasys Plugin

#### Mobile

- Android 5+
- Cordova iOS
  - Requires cordova-iosrtc
- Cordova Android
  - Requires cordova-crosswalk
- react-native iOS/Android [In Progress]
  - Requires react-native-webrtc

#### Other

- Node.js 0.10+ (via wrtc) [In Progress]

### Example

```
npm install rtc-everywhere --save
```

```js
var rtc = require('rtc-everywhere')();

// Available:
// rtc.RTCPeerConnection
// rtc.RTCIceCandidate
// rtc.RTCSessionDescription
// rtc.getUserMedia
// rtc.attachStream(stream, videoElement)
```

### API
#### RTCPeerConnection
[Specification Documentation](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection)

#### RTCIceCandidate
[Specification Documentation](http://html5index.org/WebRTC%20-%20RTCIceCandidate.html)

#### RTCSessionDescription
[Specification Documentation](https://developer.mozilla.org/en-US/docs/Web/API/RTCSessionDescription)

#### getUserMedia(constraints, cb)
[Specification Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia)

##### Modifications
- `constraints` is optional (makes things easier)
  - Defaults to `{video: true, audio: true}`

- `cb` is a node-style error first callback

```js
// these are the same thing
rtc.getUserMedia(function(err, stream){});
rtc.getUserMedia({video: true, audio: true}, function(err, stream){});
```

#### attachStream(stream, element)

- Attaches a stream to a given video element
- Returns the element the video was attached to
- In IE and Safari, the video element will be replaced by an `object` element
  - Elements will not be replaced or modified unless they exist on the DOM
  - Regardless of replacement, the new `object` element will be returned

### Related Libraries
- [simple-peer](https://github.com/feross/simple-peer)
- [blob-util](https://github.com/nolanlawson/blob-util)

### LICENSE
(MIT License)

Copyright (c) 2015 Contra [contra@maricopa.edu](mailto:yo@contra.io)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[downloads-image]: http://img.shields.io/npm/dm/rtc-everywhere.svg
[npm-url]: https://npmjs.org/package/rtc-everywhere
[npm-image]: http://img.shields.io/npm/v/rtc-everywhere.svg
[travis-url]: https://travis-ci.org/contra/rtc-everywhere
[travis-image]: https://travis-ci.org/contra/rtc-everywhere.png?branch=master
[depstat-url]: https://david-dm.org/contra/rtc-everywhere
[depstat-image]: https://david-dm.org/contra/rtc-everywhere.png
[david-url]: https://david-dm.org/contra/rtc-everywhere
[david-image]: https://david-dm.org/contra/rtc-everywhere.png?theme=shields.io
