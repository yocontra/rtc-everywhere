# rtc-everywhere [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]
## Information
<table>
<tr>
<td>Package</td>
<td>rtc-everywhere</td>
</tr>
<tr>
<td>Description</td>
<td>Cross-everything WebRTC Adapter/Polyfill</td>
</tr>
</table>

### Install

```
npm install rtc-everywhere --save
```

TODO: Real documentation inbound

### Supported Platforms
- Chrome
- Firefox
- Node.js (via wrtc)
- iOS (via cordova-iosrtc)
- Android (via cordova-crosswalk)
- Safari (via Telerik Plugin)
- Internet Explorer (via Telerik ActiveX)
- MS Edge (via ORTC)

### Example

```js
var rtc = require('rtc-everywhere')();

// Available:
// rtc.RTCPeerConnection
// rtc.RTCIceCandidate
// rtc.RTCSessionDescription
// rtc.getUserMedia
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

### Related Libraries
- [simple-peer](https://github.com/feross/simple-peer)
- [blob-util](https://github.com/nolanlawson/blob-util)

### LICENSE
(MIT License)

Copyright (c) 2015 Contra [contra@maricopa.edu](mailto:contra@maricopa.edu)

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
