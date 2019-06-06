# skyway-conference-dev

Web conference app using SkyWay JS-SDK.

## Feat

### env

- PC Chrome
- PC Firefox
- PC Safari(12.1~)
- PC Edge(Chromium)
- iOS Safari
- Android Chrome
- Android Firefox

### index

- input room id
- select room type(`mesh` or `sfu`)
- enter conf app with room id and type

### conf

- require audio device to enter
- send media
  - audio
  - audio + video
  - audio + display
- mute audio / video
- switch audio / video / display devices
- show voice-activity
- edit display name
- display browser info
- dispaly stream info
- send chat
- show local stream
  - mirror my video
- show remote streams
- pin one of remote streams
- cast my stream
- try to re-enter the room on disconnect
- notify events
  - remote user join
  - remote user leave
  - remote user chat
  - local action information
- display stats report(SFU only)
