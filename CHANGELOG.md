# 2.9.2

- Update dev/prod dependencies

# 2.9.1

- Fix bug: camera devices are not shonw on Safari 13.1
  - [#93](https://github.com/nttcom-webcore/skyway-conference-dev/issues/93)

# 2.9.0

- Add exit to app button

# 2.8.8

- Fix "Room name or mode is undefined!" error
  - It happens when skyway-server is too slow to respond

# 2.8.7

- Update dev/prod dependencies

# 2.8.6

- Display name is now required to enter
  - [#100](https://github.com/nttcom-webcore/skyway-conference-dev/issues/100)
- Sort remote streams(video+audio -> audio only)
  - [#102](https://github.com/nttcom-webcore/skyway-conference-dev/issues/102)

# 2.8.5

- Enhance index app
  - Add background animation
  - Apply `React.StrictMode`

# 2.8.4

- Update dev/prod dependencies

# 2.8.3

- Fix `getUserMedia(constraintsWithDeviceId)` call fails for the really first time

# 2.8.2

- Fix some Android Chrome crashing when video source changes
- Fix app styles for root element
  - Prevent from breaking empty `div` insertion by some extensions

# 2.8.1

- Fix stats summary calculation logic
  - Firefox drops some keys for inactive media

# 2.8.0

- Add stats summary view
- Fix video recvonly case in mesh room

# 2.7.9

- Improve stats panel
  - show filtered count
- Refactor
  - internal components structure
  - use `React.StrictMode` for development

# 2.7.8

- Improve performance of stats panel

# 2.7.7

- Update version of dev/prod dependencies

# 2.7.6

- Fix proper icon not shown for MS-Edge

# 2.7.5

- Improve some UIs
  - add edge shadows for white icon on white bg
  - intro new VAD visualizer
  - fix minimized view

# 2.7.4

- Update version of dev/prod dependencies

# 2.7.3

- Add some performance tuning

# 2.7.2

- Update version of dev/prod dependencies

# 2.7.1

- Add notes that microphone is default muted

# 2.7.0

- Add flag to use H264
  - but currently SkyWay supports this only in mesh room

# 2.6.5

- Update version of dev/prod dependencies

# 2.6.4

- Update version of dev/prod dependencies

# 2.6.3

- Show browser info w/o mouseover
- Update version of dev dependencies

# 2.6.2

- Add notification for sending reaction
- Add some reaction emoji

# 2.6.1

- Fix styles

# 2.6.0

- Add reaction feature
  - from right menu
  - let's emoji communication!
- Use different duration for each notification types
  - chat notification stays a bit longer
- Some cosmetic changes

# 2.5.3

- Update version of dependencies

# 2.5.2

- Update version of dependencies

# 2.5.1

- Switch `skyway-js` to npm from CDN

# 2.5.0

- Add feature to force TURN(relay) for ICE

# 2.4.0

- Add stats view for SFU room

# 2.3.1

- Print a lot for room name validation errors

# 2.3.0

- Show browser version
- Show stream and track id for debugging

# 2.2.0

- Some enhancements for mobile browsers
  - [#89](https://github.com/nttcom-webcore/skyway-conference-dev/issues/89)
  - [#84](https://github.com/nttcom-webcore/skyway-conference-dev/issues/84)

# 2.1.1

- Use SVG for browser icons

# 2.1.0

- Add feature to minimize local video

# 2.0.2

- Update `/script/build.sh` to include `package.version` in commit message

# 2.0.1

- Support mobile browsers(= small screen)

# 2.0.0

- Rewrite whole things with TypeScript!
