FROM node:20-bullseye

WORKDIR /app
EXPOSE 3000

COPY package*.json ./
RUN npm ci --quiet || npm install --quiet

COPY . .

ENV HOST=0.0.0.0

CMD ["npm", "start"]
