lib-build:
	npm --prefix ./lib/ run build
lib:
	npm --prefix ./lib/ start
app: lib-build
	npm --prefix ./app/ start
app-build: lib-build
	npm --prefix ./app/ run build
dev: lib app
build: lib-build app-build
