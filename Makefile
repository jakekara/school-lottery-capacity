default: src/school-capacity.js
	browserify src/school-capacity.js > js/school-capacity.js
	uglifyjs js/school-capacity.js > js/school-capacity.min.js
