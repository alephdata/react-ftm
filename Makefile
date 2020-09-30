MAKEFLAGS += -j2

all: build

install:
	npm install && npm link

dist: translate
	npm run build

clean:
	rm -rf node_modules dist

dev:
	npm start

build: dist

publish:
	npm publish -timeout=9999999

translate:
	npm run messages
	tx push --source
	tx pull -a -f
	npm run compile-translations
	npm run concat-translations
