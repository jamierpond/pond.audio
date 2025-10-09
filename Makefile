# Docker configuration
IMAGE_NAME := pond-audio
CONTAINER_NAME := pond-audio-container
PORT := 3000

.PHONY: docker-prod docker-build docker-run docker-stop docker-clean docker-logs

# Build and run the production Docker container
docker-prod: docker-build docker-run

# Build the Docker image
docker-build:
	docker build -t $(IMAGE_NAME) .

# Run the Docker container
docker-run:
	docker run -d \
		--name $(CONTAINER_NAME) \
		-p $(PORT):$(PORT) \
		$(IMAGE_NAME)
	@echo "Container running at http://localhost:$(PORT)"

# Stop the running container
docker-stop:
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true

# Clean up container and image
docker-clean: docker-stop
	docker rmi $(IMAGE_NAME) || true

# View container logs
docker-logs:
	docker logs -f $(CONTAINER_NAME)

# Restart the container
docker-restart: docker-stop docker-run
