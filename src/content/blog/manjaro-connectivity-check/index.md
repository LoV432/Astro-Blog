---
heading: "Manjaro Connectivity Check"
description: "Disable manjaro connectivity check"
cover: ./manjaro_connectivity_bf5ec00134.jpg
tags: ["guide","linux"]
publishedAt: 2023-02-23T20:42:55.273Z
updatedAt: 2023-02-25T10:05:25.399Z
---

# Disable Manjaro Connectivity Check

```bash
sudo nano /etc/NetworkManager/conf.d/20-connectivity.conf
```

Add this in the file

```text
[connectivity]
enabled=false
```

and then run

```bash
sudo systemctl restart NetworkManager
```

-   [Source](https://wiki.archlinux.org/title/NetworkManager#Checking_connectivity)
