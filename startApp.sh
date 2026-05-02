#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME="theo-game-ranker"
CONTAINER_NAME="theo-game-ranker"
HOST_PORT="${HOST_PORT:-8080}"

if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  echo "Removing existing container ${CONTAINER_NAME}..."
  docker rm -f "${CONTAINER_NAME}" >/dev/null
fi

echo "Building image ${IMAGE_NAME}..."
docker build -t "${IMAGE_NAME}" .

echo "Starting ${CONTAINER_NAME} on http://localhost:${HOST_PORT} ..."
docker run -d \
  --name "${CONTAINER_NAME}" \
  -p "${HOST_PORT}:80" \
  "${IMAGE_NAME}" >/dev/null

echo "Up. Open http://localhost:${HOST_PORT}"
