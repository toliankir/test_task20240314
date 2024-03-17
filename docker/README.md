### Build
```bash
docker build --file docker/Dockerfile --tag test_task .
```

### Run
```bash
docker run \
--publish 3100:3000 \
--network test-task-local-tier \
--env MYSQL_CONNECTION_STRING=mysql://root:devel@mysql:3306/devdb \
--env JWT_SECRET=STRNG_JWT_SECRET \
--env JWT_REFRESH_SECRET=STRNG_JWT_REFRESH_SECRET \
test_task
```
