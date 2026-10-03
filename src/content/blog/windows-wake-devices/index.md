---
heading: "Windows Wake Devices"
description: "A quick way to find and disable all devices that are allowed to wake windows from sleep"
cover: ./windows_wake_110ea402ab.jpg
tags: ["windows","guide"]
publishedAt: 2023-04-06T18:02:49.993Z
updatedAt: 2023-04-17T20:25:56.026Z
---

# Windows Wake Devices

> You know what’s worse than waking up to your alarm clock every morning? Waking up to the sound of a hundred fans revving up, because your mouse or keyboard accidentally woke up your computer. – ChatGPT *ish*

PowerShell command to show all devices that are allowed to wake Windows from sleep:

```powershell
powercfg /DEVICEQUERY wake_armed
```

![term-sheet-1680803476996.svg](./term_sheet_1680803476996_21e64e11ee.svg)

PowerShell command to show which device woke your Windows from last sleep:

```powershell
powercfg /LASTWAKE
```

PowerShell command to disable device (needs admin permissions):

```powershell
powercfg /DEVICEDISABLEWAKE "<device name>"
```

![term-sheet-1680804043647.svg](./term_sheet_1680804043647_516e05b86b.svg)
