mithril-di.js:
	@gulp

.mithril-di.min.js: mithril-di.js
	@gulp minify

clean:
	@gulp clean

minify: .mithril-di.min.js

test: mithril-di.js
	@npm test

build: test minify

.PHONY: clean minify test build
