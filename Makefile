MAKEFLAGS += -j2

all: build

install:
	cd lib && npm install
	cd app && npm install
	cd lib && npm link
	cd app && npm link @alephdata/vislib

lib/dist:
	cd lib && npm run build

clean:
	rm -rf lib/node_modules lib/dist app/node_modules

lib:
	cd lib && npm start

app:
	cd app && npm start

app-build: lib/dist
	cd app && npm run build

dev: lib app

build: app-build

.PHONY: app lib
