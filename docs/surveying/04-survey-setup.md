---
title: Survey Setup (Electronic)
---

# Survey Setup (Electronic)

Configuring the logging software and sensor for the job: project setup, calibration/nulling, line spacing and the in-field logging routine. This is where data quality is won or lost.

!!! note "At a glance"
    Garbage in stays garbage — calibrate properly and keep line spacing/speed consistent.

## 1. Create the project / job

1. Open [CONFIRM: logging software name]
2. [CONFIRM: create new job, naming convention]
3. [CONFIRM: load paddock boundary / guidance lines]
4. [CONFIRM: set coordinate system / datum]

!!! warning "NAMING CONVENTION"
    Use the standard job naming format [CONFIRM exact format] every time. Consistent names are what make exporting and back-office processing painless later.

## 2. Calibration / nulling

1. [CONFIRM: calibration procedure for EM38]
2. [CONFIRM: calibration for Dual EMS]
3. [CONFIRM: how to verify calibration passed]

![Photo/screenshot: calibration screen with a good result. [ADD]](img/REPLACE-ME.png)
*Photo/screenshot: calibration screen with a good result. [ADD]*

<!-- TODO: drop the screenshot in img/ and update the filename above -->

## 3. Survey parameters

| Parameter | Setting | Notes |
| --- | --- | --- |
| Line spacing | [CONFIRM] | Per job spec |
| Logging rate | [CONFIRM] |  |
| Travel speed | [CONFIRM] | Keep consistent |
| GPS fix required | [CONFIRM] | Don't log without it |

## 4. In-field logging routine

1. Confirm GPS fix and live sensor reading before the first line.
2. Start logging at the line start; keep speed steady.
3. Maintain line spacing using guidance.
4. Watch the live data for dropouts or spikes.
5. Stop logging cleanly at the end of each line / the job.

!!! tip "WATCH THE LIVE DATA"
    Glance at the live trace regularly. Catching a dropout or a flat-lining sensor in the paddock costs minutes; catching it back at the office costs a return trip.
