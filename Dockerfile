FROM node
WORKDIR /app
COPY . .
RUN npm install
RUN npm install prisma --save-dev  # Install Prisma CLI for migrations
CMD ["npm", "run", "dev"]