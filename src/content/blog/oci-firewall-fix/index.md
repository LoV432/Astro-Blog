---
heading: "OCI Firewall Fix"
description: "A quick and dirty way to revert all the weird iptable rules on OCI VPS"
cover: ./port_4665fe4d9b.jpg
tags: ["guide","linux"]
publishedAt: 2023-02-12T19:01:16.517Z
updatedAt: 2023-10-01T21:29:01.478Z
---

# OCI Firewall Fix

Oracle VPS has weird iptable rules that block all ports except SSH and also render UFW non-functional. The only way to port forward is by using iptables or firewalld, and both of them are not very user-friendly. So here’s a quick way to fix that.

## WARNING

**YOU MIGHT COMPLETELY LOSE ACCESS TO YOUR VPS IF SOMETHING GOES WRONG.**  
[Here’s how you might be able to recover if that happens but no guarantees](https://stackoverflow.com/questions/54794217/opening-port-80-on-oracle-cloud-infrastructure-compute-node#comment124418033_54810101) ¯\\\_(ツ)\_/¯<br><br>
Ok now let’s continue!  
First make a backup of all existing iptable rules in case you need to revert them

```bash
sudo iptables-save > ~/iptables-rules
```

Now to clear all rules

```bash
sudo iptables --flush
```

To ensure that these rules don’t revert after reboot

```bash
sudo mv /etc/iptables/rules.v4 /etc/iptables/rules.v4.bak
sudo mv /etc/iptables/rules.v6 /etc/iptables/rules.v6.bak
sudo reboot
```

All the ports should be wide open now. You can now install UFW if you want

```
sudo apt install ufw
sudo ufw allow ssh
sudo ufw enable
```

-   [Source for most of this](https://stackoverflow.com/questions/54794217/opening-port-80-on-oracle-cloud-infrastructure-compute-node)
