### Build
```bash
docker build --file docker/Dockerfile --tag test_task_frontend .
```

### Run
```bash
docker run --publish 3180:80 test_task_frontend
```
