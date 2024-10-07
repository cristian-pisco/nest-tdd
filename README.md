docker build -t mutistage:latest --target=dev

For development:
```sh
docker build -t nest-tdd:latest --target=dev .
```

```sh
npx prisma
npx prisma init
npx prisma migrate dev --name initial
```

## Reference
- https://dev.to/massivebrains/use-same-dockerfile-for-dev-production-1l7f
- https://www.divio.com/blog/guide-using-multiple-dockerfiles/
- https://medium.com/@mehdi_hosseini/how-to-link-multiple-docker-compose-files-7250f10063a9