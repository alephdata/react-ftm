MAKEFLAGS += -j2

install:
	npm install

dev:
	npm start

translate:
	npm run messages
	tx push --source
	tx pull -a -f
	npm run compile-translations
	npm run concat-translations

build:
	npm run build

dist: translate
	build

publish:
	npm publish -timeout=9999999

clean:
	rm -rf node_modules dist

test:
	npm run test
