
SHELL = /bin/bash
GIT_SHA ?= $(shell git rev-parse HEAD)

REF ?= $(shell git branch | grep \* | cut -d ' ' -f2)
IMAGE_TAG = $(GIT_SHA)

compose_start:
	docker-compose up --build