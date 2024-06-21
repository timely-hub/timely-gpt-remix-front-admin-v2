# Step 1: Build the application
FROM node:20 AS builder
# Set working directory
WORKDIR /usr/src/app
# define args
ARG NODE_ENV=production
ARG ENV_FILE=.env.${NODE_ENV}
# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./
# Install pnpm
RUN npm install -g pnpm
# Install dependencies
RUN pnpm install
# Copy the rest of the application files
COPY . .
# Verify the environment file exists
RUN if [ -f "${ENV_FILE}" ]; then echo "${ENV_FILE} found"; else echo "${ENV_FILE} not found"; exit 1; fi
# Build the application
RUN if [ "${NODE_ENV}" = "staging" ]; then pnpm run build:staging; else pnpm run build; fi


# Step 2: Run the application
FROM node:20-alpine
# Set working directory
WORKDIR /usr/src/app
# Copy the built files from the previous stage
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/package.json ./
# Install pnpm in the final container
RUN npm install -g pnpm && pnpm install --prod
# Expose the default port
EXPOSE 3000
# Start the application
CMD ["pnpm", "run", "start"]
