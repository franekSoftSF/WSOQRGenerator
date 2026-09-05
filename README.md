# Android Enrollment QR Generator

**[Open the tool](https://franeksoftsf.github.io/WSOQRGenerator/)**

A free, single-page generator for Android Enterprise device-owner provisioning QR codes —
for **Workspace ONE UEM** and the **Android Management API**. No account, no install, no
server: everything happens in your browser, and the page keeps working after you save it to
disk and open it offline.

## What it generates

**Workspace ONE UEM (custom DPC)** — Device Services address, Group ID and an optional
staging account. Two ways to identify the device:

- **Group ID with username and password.** Leave the credentials empty and the device asks
  for them during enrollment.
- **Enrollment token.** The token takes the place of the group in the `gid` field. A username
  can still travel with it, and leaving the password out is the safer choice — a QR code gets
  printed, photographed and passed around, and everything inside it is readable by whoever
  holds it.

**Read an existing QR code** — a console shows the enrollment code on screen rather than as a
link you can copy, so hand it the code itself: drop an image, pick a file, or paste a
screenshot with Ctrl+V. A whole provisioning payload is taken over as it is (including WiFi,
region and options); an enrollment link carrying `serverurl` and `gid` fills in those two
fields.

**Android Management API** — from an enrollment token, or by pasting the ready-made payload
your console or `enrollmentTokens.create` returned. In the second case the WiFi, region and
provisioning options are merged into it and everything else is left untouched.

## WiFi is left to the device by default

The code carries **no network settings at all**, so the device shows its own WiFi picker
during setup: whoever is enrolling selects the network and types the password there. The WiFi
password never ends up inside the code.

This matters more than it looks. Sending an empty SSID is not the same as sending nothing —
an empty value makes the device try to join a network with no name instead of offering the
picker. Embedding the network is still one dropdown away, together with hidden-SSID and proxy
settings, when a site genuinely needs it.

## The rest

- **Locale and time zone** from the complete Android 9+ lists, with search
- **Provisioning options** — keep the manufacturer's system apps, skip encryption
- **Editable payload** — every generated code is shown as JSON you can edit by hand, and
  anything Android accepts but this page does not write can simply be typed in
- **Colour and a centre logo** — set on a separate appearance page and remembered for every
  code you generate afterwards. Every rendered code is read back with the decoder this page
  already carries, so a logo that covers too much or a colour too pale is caught here rather
  than on an already-wiped device
- **Save and reload your settings** as a file, on another machine or another day
- **Printable instruction sheet** with the code, the steps and a summary of what the code
  contains — the browser's own "Save as PDF" turns it into a PDF, with no PDF library involved
- **Five languages** — English, Polish, German, French and Czech, detected from the browser
  and overridable with the selector. Reference sections stay in English on purpose: they quote
  API key names that are English anyway

## Privacy

No analytics, no external requests, no server side, nothing stored anywhere but your own
browser. The page is three plain files — reading them is enough to confirm it.

## Running it yourself

Download `index.html`, `qrcode.min.js`, `data.js` and `i18n.js` into one folder and open the
HTML file. That is the whole installation, and it works with no network connection.

## Credits

The idea comes from [ws1-android-qr-helper](https://wssyd.github.io/ws1-android-qr-helper/),
which does the same job for Workspace ONE. This one adds Android Management API tokens, leaves
WiFi to the device by default, reads enrollment links, prints instructions and speaks five
languages.

QR rendering by [node-qrcode](https://github.com/soldair/node-qrcode) (MIT), bundled with the
page — see `LICENSE-qrcode.txt`.

## The bigger tool

This page covers a single device at a time. Bulk Android enrollment and migration to
Workspace ONE UEM — from on-prem Workspace ONE, SOTI, ME MDM or Intune — are what
[WSO QR](https://github.com/franekSoftSF/WS1QRGen) does, together with day-2 device actions,
a self-service portal, Active Directory password rotation and email notifications. It is a
self-hosted application installed on your own IIS.

## License

Apache License 2.0 — see [LICENSE](LICENSE).
