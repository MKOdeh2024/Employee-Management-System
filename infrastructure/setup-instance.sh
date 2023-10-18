#!/bin/sh
set -e

sudo apt update
sudo apt upgrade -y

sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings

# install docker
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update

sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# create github user
sudo mkdir -p /home/app
sudo useradd --no-create-home --home-dir /home/app --shell /bin/bash github
sudo usermod --append --groups docker github
sudo usermod --append --groups docker ubuntu
sudo chown github:github -R /home/app

github_pubkey='ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCQcwRpKbMn+sXoY1Fz5spnqn1TZj6iQvIjy3d8TrehSLI7X+U0nEX3VHLHCx9SF3w6AUgG6QTpd+3Op4NYGSFtOETgsILSYfKAbmKJiiTVbdGeCxhu+OjItYHE+ehXr2pHAB+R5Yv2AvSXUa6mg1a0QBXKDHlO0O6koMIsJxKj4G5P44X2ivuY+BUmSY9hAFHfBqHzUy9NbVcZyU4pGLiEvRIPzzjN/QcXV01O1utMO4/3pW4HdwPfcgHtf1xh6FXVC6d8QuutjoddbU4w76Ps2joALM/tCiUzV/palm9iJ3w+AUEDevZx7Fi++IvPomxOCo/fHqz1o6SxpNWrMELJuxpS3WgYxA6FXBvuOi8ZiBEKZXeKJZIE0SBnSjIwID3X7BU/Tq2xkTo0PwBs36x9QVK2sWvf1FsOz5RRdoLM7xRtFrTxZHOl6NQ/LL3JYrXG8eoyiwVZWhFtdOsfsybNxq5RXu4enGmk0bWikvr/xaLDXHZD7wUN9jfbDf2q3TYRde15keULrj4/+sAix/BHe7Y8+OjbTrXvFa0pR/+ZNEWl62abize5tRthyUAA5CBW8GIkyUfKlDpMJIyaX4JVHJ0qNqc/Mo0wB4xx0p/JzDNL6lpfo4p68kPOWOyvrz1NUGuXPnONYvO9M0OXY+uiUIzHAIc7IJdONrqZxQpvFw== 217103@ppu.edu.ps'
'

sudo -u github sh -c "mkdir -p /home/app/.ssh && echo $github_pubkey > /home/app/.ssh/authorized_keys"

sudo reboot