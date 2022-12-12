install:
	npm ci

lint:
	npx eslint .

fix:
	npx eslint --fix .

publish:
	npm publish --dry-run

test:
	npx jest

test-watch-all:
	npx jest --watchAll

test-coverage:
	npx jest --coverage