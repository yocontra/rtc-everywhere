# IE/Safari

- test on IE
- IE doesn't load invisible plugins
- DOM mutation observer that replaces webrtc video tags with the plugin
  - should copy stylesheet
  - need to override URL.createObjectURL to return a dummy url if the object passed in is a temasys stream url
- add option to check if plugin is installed and prompt user to install
  - https://github.com/Temasys/AdapterJS/blob/master/source/adapter.plugin.rtc.adapter.js#L122

# General

- actually add tests

## Enhancements

- debug option
- platform specific options

## Features

- add MediaStreamTrack.getSources hacks
- add screen sharing hacks
