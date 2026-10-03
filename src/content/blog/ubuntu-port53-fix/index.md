---
heading: "Ubuntu Port 53 Fix"
description: "A quick way to stop systemd-resolved from using port 53 on Ubuntu"
cover: ./ubuntu_1e79bfcc74.jpg
tags: ["guide","linux"]
publishedAt: 2023-02-12T17:29:39.775Z
updatedAt: 2024-04-02T10:16:11.342Z
---

# Ubuntu Port 53 Fix

In order to free up port 53 you need to edit the `/etc/systemd/resolved.conf` file. You can do that by running

```bash
sudo nano /etc/systemd/resolved.conf
```

Replace `#DNSStubListener=yes` with `DNSStubListener=no` and then save changes by pressing **ctrl + x** and then **y**.

and then run

```bash
sudo ln -sf /run/systemd/resolve/resolv.conf /etc/resolv.conf
sudo systemctl restart systemd-resolved
```

That’s it! Port 53 should be free now
