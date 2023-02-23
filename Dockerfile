FROM node:18-alpine
ENV NODE_ENV production

WORKDIR /app

RUN apk add --no-cache tini

COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --prod --frozen-lockfile

COPY --chown=node:node . .

USER node

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "bin/www"]
