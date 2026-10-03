---
heading: "Docker Guide"
description: "A basic guide on how to install, set up and use the basic commands of Docker."
cover: ./docker_A_0364a243be.jpg
tags: ["guide","linux","docker"]
publishedAt: 2023-01-28T21:18:59.492Z
updatedAt: 2024-04-23T16:59:09.476Z
---

# What is docker?

The basic idea behind [Docker](https://www.docker.com/) is to create lightweight ‘virtual machines’ that are specifically configured to run a single piece of software. This means you don’t have to worry about dependencies or any sort of compatibility issues, as the ‘virtual machine’ has everything pre-configured and ready to go.

## How to install and setup?

There are many ways to install docker depending on your distro. Here are the ones i need

```bash
# Debain
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Arch
sudo pacman -S docker
```

This will install docker but please be smart and use docker-compose, most distros built-in package manager should have it so

```bash
# Debian
sudo apt install docker-compose

# Arch
sudo pacman -Syu docker-compose
```

By default we need root privilege but that can be fixed!

```bash
sudo groupadd docker
sudo usermod -aG docker $USER

# Re-login for it to have effect
```

Now you can run docker and docker-compose commands without sudo.

## Basic Commands

Start/Stop/Remove containers

```bash
# Start existing container(s)
docker start <container name>

# Stop running container(s)
docker stop <container name>

# Remove existing container(s) (Must be stopped)
docker rm <container name>
```

To check running/all containers

```bash
# List all running containers
docker ps

# List ALL containers
docker ps -a
```

Docker networks

```bash
# list networks
docker network ls

# Remove all unused networks
docker network prune

# Remove selected network(s)
docker network rm <network name> 
```

Docker images

```bash
# List all images
docker image ls

# Remove all unused images
docker image prune -a

# Remove selected image(s)
docker image rm <image name>
```

Docker build

```bash
# Build image
docker build -t <image name> .

# Use -f for files that aren't named Dockerfile
docker build -t <image name> -f <file name>

# Clear build cache
docker builder prune -a
```

Running commands inside containers

```bash
# Single command
docker exec <container name> <command>

# Access to shell on container
docker exec -it <container name> bash
```

Docker compose commands

```bash
# Run docker compose in foreground
docker compose up

# Run docker compose in background
docker compose up -d

# Use -f for files that aren't named docker-compose.yml
docker compose up -d -f /path/to/docker-compose.yml

# Pull new images
docker compose pull

# You can run most of the commands using docker-compose too
docker compose start
docker compose stop
docker compose rm
docker compose -f logs
docker compose exec <container-name> <command>
```
