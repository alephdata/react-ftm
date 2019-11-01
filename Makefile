MAKEFLAGS += -j2

all: build

install:
	npm install && npm link

dist:
	npm run build

clean:
	rm -rf node_modules dist

dev:
	npm start

build: dist
