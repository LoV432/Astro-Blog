---
heading: "Bridge PTCL F670L Fiber Modem"
description: "A quick guide on how to put PTCL F670L fiber modem in bridge mode"
cover: ./OIG_K9z5i2_Rgg_Uv_B6k_QNN_3zj_dca9335209.jpg
tags: ["guide"]
publishedAt: 2023-08-17T21:30:45.125Z
updatedAt: 2024-03-20T11:33:59.041Z
---

# How to Bridge PTCL F670L Fiber Modem

**Note: This is only tested on F670L V9.0.11P1N67. If you have a different version, these steps may not work.**

## Login to Modem

1.  Default IP for modem’s web page should be: `192.168.0.1`
2.  Use default credentials:
    -   Username: admin
    -   Password: The last 8 digits of your modem’s MAC address (in uppercase). You can find the MAC address on the back of your modem, e.g., MAC = 66:55:E3:5G:6J:GH, Password = E35G6JGH

## Configure WAN Settings

1.  Go to **Internet > WAN**. ![wan page.png](./wan_page_9846febb7e.png)
2.  Open browser console:
    -   Firefox: `CTRL + SHIFT + K`
    -   Chrome: `CTRL + SHIFT + J` ![empty console.png](./empty_console_58bf4f055d.png)
3.  Paste the following JavaScript code into the console and press Enter:

```javascript
document.querySelector('#addInstBar_Internet').click()
allEditPages = document.querySelectorAll("[id^='template_Internet_']")
editPage = allEditPages[allEditPages.length - 1]
newNode = editPage.querySelector('.selectNorm')[0].cloneNode()
newNode.value = 'bridge'
editPage.querySelector('.selectNorm')[0].after(newNode)
editPage.querySelector('.selectNorm')[1].selected = true
editPage.querySelector('.selectNorm').dispatchEvent(new Event('change'))
editPage.querySelector('[id^="WANCName"]').value = 'Bridge'
editPage.querySelector('[id^="Prefix_linkMode"]').remove()
editPage.querySelector('[id^="VlanEnable1"]').click()
editPage.querySelector('[id^="VlanEnable1"]').dispatchEvent(new Event('change'))
editPage.querySelector('[id^="VLANID"]').value = 10
editPage.querySelector('[id^="Btn_apply_internet"]').click()
```

![bridge code.png](./bridge_code_b56fab3c6c.png)

If you see the message “Your data have been stored,” the configuration was successful ![bridge success.png](./bridge_success_1eb8d1175e.png)

## Port Binding

1.  Go to **Internet > Port Binding**.
2.  Select “Bridge” from the drop-down menu. ![port binding.png](./port_binding_1a1b2611bb.png)
3.  Check **LAN4** and click **Apply**.

## Disable VLAN for PPPoE Configuration

1.  Go to **Internet > WAN**.
2.  Expand the “omci\_ipv4\_pppoe\_1” drop-down. ![default pppoe config.png](./default_pppoe_config_6cb8f6a86e.png)
3.  Set **VLAN** to **off** and click **Apply**. (Your internet will stop working at this point)

## Connect to Router

1.  Connect the modem’s **LAN Port 4** to the router’s **WAN port**.
2.  Set up **PPPoE** on your router (password is usually “ptcl”).
