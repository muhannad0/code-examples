# Example: Securely build Docker images for Node.js projects

This is an example for [the post on my website about "Securely Installing Private Packages in Node.js Docker Builds"]().

# Development

- Install with `npm install`.

- Run dev server `npm run dev`.

- Build project `npm run build`. Build outputs are saved in `dist` folder.

- Test endpoint with `curl http://localhost:3000`

## Docker

- Build Docker image:

```
export GITHUB_TOKEN=<personal-access-token>

docker build -t secure-app-image --secret id=GITHUB_TOKEN .
```

- Run the Docker image:

```
docker run --rm -p 3000:3000 secure-app-image
```
