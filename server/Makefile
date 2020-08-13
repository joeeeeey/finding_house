
IMAGE_NAME = finding_houing_server
SHELL = /bin/bash
GIT_SHA ?= $(shell git rev-parse HEAD)

REF ?= $(shell git branch | grep \* | cut -d ' ' -f2)
IMAGE_TAG = $(GIT_SHA)

build:
	yarn install --prod
	docker build -t $(IMAGE_NAME):$(IMAGE_TAG) -f Dockerfile .;

init:
	cp .env.dist .env

compose_start:
	docker-compose up --build