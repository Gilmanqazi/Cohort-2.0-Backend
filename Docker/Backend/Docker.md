# Day 1: Introduction to Docker

## Images and Containers

### Docker Image:
A Docker image is a lightweight, standalone, and executable software package that includes everything needed to run an application. It typically contains:
1. **Codebase**: The application code and its logic.
2. **Dependencies**: Required libraries and packages (e.g., `express`, `mongoose`, `dotenv`).
3. **Runtime**: The environment to execute the application (e.g., Node.js).
4. **Operating System (OS)**: A minimal OS layer to support the application.

These components are bundled together to create a reusable image.

### Docker Container:
A container is a live, running instance of a Docker image. It is isolated, portable, and can be executed on any system with Docker installed.

**Flow**: `Codebase` + `Dependencies` → `Image` → `Container`

---

## Setting Up Docker

1. Download and install Docker Desktop for your operating system.
2. Create a simple Express server to test Docker functionality.

---

## Docker Commands

- **Build an Image**:
  ```bash
  docker build . -t <image_name>
  ```
  Example: `docker build . -t cohort_2`

- **Run a Container**:
  ```bash
  docker run <image_name>
  ```
  Example: `docker run cohort_2`

- **Run with Port Mapping**:
  ```bash
  docker run -p 8080:3000 <image_name>
  ```
  Example: `docker run -p 8080:3000 cohort_2`

---

## Docker Compose, Bind Mounts, and Volumes
Explore these advanced Docker features to manage multi-container setups and persistent data storage.

---

## Dockerfile Example

```dockerfile
# Base image
FROM node:20-alpine

# Copy dependencies
COPY ./package.json ./
COPY ./package-lock.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY ./server.js ./

# Command to run the application
CMD ["node", "server.js"]
```

The `node:20-alpine` base image combines Node.js version 20 with a lightweight Alpine Linux OS, ensuring a minimal and efficient runtime environment.