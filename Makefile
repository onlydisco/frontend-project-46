install:
	npm ci

lint:
	npx eslint .

fix:
	npx eslint --fix .

publish:
	npm publish --dry-run

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-watch-all:
	NODE_OPTIONS=--experimental-vm-modules npx jest --watchAll

test-coverage:
	npx jest --coverage