---
heading: "Windows 11 Skip Setup Login"
description: "A quick way to bypass Microsoft login during Windows 11 setup"
cover: ./windows_activation_0912ad999b.jpg
tags: ["guide","windows"]
publishedAt: 2024-05-21T21:05:06.839Z
updatedAt: 2024-05-21T21:05:06.841Z
---

# How to Bypass Microsoft Login During Windows 11 Setup

Do you want to bypass the Microsoft login during Windows 11 setup because you value your privacy, but then log in anyway to install some garbage from the Windows Store? If the answer is yes, then keep on reading this beautiful post!

## Steps to Bypass Microsoft Login

1.  **Open Command Prompt**  
    Press `Shift + F10` to open CMD.
    
2.  **Run the Bypass Command**  
    Run the following command:
    
    ```bash
    OOBE\BYPASSNRO
    ```
    
    Your device will restart at this point.
    
3.  **Open Command Prompt Again**  
    Press `Shift + F10` to open CMD.
    
4.  **Disable Internet**  
    Run the following command:
    
    ```bash
    ipconfig /release
    ```
    

Now you will be able to bypass the login!
