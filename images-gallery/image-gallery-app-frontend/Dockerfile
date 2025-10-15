# ./images-gallery/image-gallery-app-frontend/Dockerfile
FROM node:20-bullseye

WORKDIR /app
EXPOSE 3000

# install deps with cache
COPY package*.json ./
RUN npm ci --quiet || npm install --quiet

# copy the rest (overridden by volume in dev, but needed for the initial build layer)
COPY . .

# ensure dev server binds externally
ENV HOST=0.0.0.0

CMD ["npm", "start"]
