MAKEFLAGS += -j2

all: build

install:
	npm install && npm link

dist:
	translate && npm run build

clean:
	rm -rf node_modules dist

dev:
	npm start

build: dist

translate:
	npm run translate
	tx push --source
	tx pull -a -f
	npm run po2json
