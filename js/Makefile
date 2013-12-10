TARGET := parkings.min.js
SOURCES := src/parkings_geojson.js src/parkings.js
UGLIFYJS := uglifyjs

all: $(TARGET)

$(TARGET): $(SOURCES)
	$(UGLIFYJS) -o $(TARGET) $(SOURCES)

clean:
	rm -f $(TARGET)
