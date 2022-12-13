# Deploy
docker-compose up -d

# Rebuild
docker-compose build

# Rebuild & Deploy
docker-compose up --build -d

# Options
-d = Detached mode: Run containers in the background.
--build = Build images before starting containers.