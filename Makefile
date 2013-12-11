JS_TARGET := script.js
CSS_TARGET := style.css
JS_SOURCES := \
	./lib/jquery.min.js \
	./lib/leaflet/leaflet.js \
	./lib/bootstrap/js/bootstrap.js \
	./js/src/parkings_geojson.js \
	./js/src/parkings.js
CSS_SOURCES := \
	./lib/bootstrap/css/bootstrap.css \
	./lib/bootstrap/css/bootstrap-theme.css \
	./lib/leaflet/leaflet.css \
	./css/style.css

SOURCES := src/parkings_geojson.js src/parkings.js

UGLIFYJS := uglifyjs
CSSMIN := cssmin

all: $(JS_TARGET) $(CSS_TARGET)

$(JS_TARGET): $(JS_SOURCES)
	$(UGLIFYJS) -o $@ $<

$(CSS_TARGET): $(CSS_SOURCES)
	$(CSSMIN) $< > $@

clean:
	rm -f $(JS_TARGET) $(CSS_TARGET)
