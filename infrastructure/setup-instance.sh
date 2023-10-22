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

github_pubkey='ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCK/gO3KOwZTeN/TSi9fF2UAPFLvrIwWi3g0369LGQ6PaFR1K3XBs0qf/Nyi0/Jo4LkXTpaTpvfbVN96P9mYf3lHyiydbuBsbkBToOWhd9lyDqb5NSCZN6zNRtdM8A6QTglE8E6YvPn/NkRQatssfGqDpMAaGW0KtnuEuCUwofLyDCIgpRsFHa7Wc82JvZuq6WCouE7DV9ob9N6sXQN96Wf4wS1H4XmyFHfrWVWZYI73RLa5mQRCWhY+fJ/0cMBJuZH+/hNnclPSVAND3jvDFk+4cpiA6+Ca42o4bFIS5jRqqPpN5tYCB2ZLuNNUiUXEFv8R7wAcZo6simjuK4FvlCb 217103@ppu.edu.ps'


sudo -u github sh -c "mkdir -p /home/app/.ssh && echo $github_pubkey > /home/app/.ssh/authorized_keys"

sudo reboot