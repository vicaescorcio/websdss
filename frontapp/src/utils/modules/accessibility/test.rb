require 'json'
require 'rgeo'
require 'rgeo/geo_json'

# Load the GeoJSON file
geojson_file = './geojson.json'
geojson_data = File.read(geojson_file)
# Parse the GeoJSON data
geojson_hash = JSON.parse(geojson_data)
feature_collection = geojson_hash['features']

filteredArray = feature_collection.filter do |feature|
  return feature['properties']['from_id'] == 1
end

