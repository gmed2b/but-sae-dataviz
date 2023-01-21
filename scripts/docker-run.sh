sudo docker kill sae-dataviz
sudo docker rm sae-dataviz
sudo docker run --name sae-dataviz -p 3500:4173/tcp -d sae-dataviz