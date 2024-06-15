FROM node:20-alpine
RUN apk add --no-cache libc6-compat

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --chown=nextjs:nodejs package.json package-lock.json ./

RUN npm install

COPY --chown=nextjs:nodejs . ./

USER nextjs

WORKDIR /app/prisma
RUN echo 'DATABASE_URL="file:/app/prisma/empty.db"' > .env
RUN npx prisma db pull
RUN npx prisma migrate diff --from-empty --to-schema-datamodel schema.prisma --script > migrations/0_init/migration.sql
RUN npx prisma generate

EXPOSE 3000
ENV PORT 3000

WORKDIR /app

RUN npm run build
CMD npm run start
