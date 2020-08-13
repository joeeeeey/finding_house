# FROM node:12-alpine AS BUILD_IMAGE

# RUN apk update && apk add curl bash && mkdir -p /home/node/app

# WORKDIR /home/node/app
# COPY node_modules node_modules

# RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin
# # Remove unnecessary files from node_modules (.md, .ts, ...)
# RUN /usr/local/bin/node-prune node_modules

FROM node:14-alpine

RUN apk add --no-cache openssl

USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY . .

# COPY entrypoint.sh entrypoint.sh

EXPOSE 4000

# ENTRYPOINT ["sh", "entrypoint.sh"]
CMD ["node", "index.js"]
