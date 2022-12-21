# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.187.0/containers/javascript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version: 16, 14, 12
ARG VARIANT="18-buster"
FROM mcr.microsoft.com/devcontainers/javascript-node:${VARIANT}

RUN su node -c "npm i -g gatsby-cli"
RUN su node -c "npm i -g azure-functions-core-tools@3 --unsafe-perm true"
RUN su node -c "npm i -g @azure/static-web-apps-cli"
