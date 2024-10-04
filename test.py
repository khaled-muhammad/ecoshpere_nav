import rasterio
import numpy as np
from scipy import stats

# Step 1: Load the .tif file using rasterio
tif_path = '/Users/doddy/Downloads/Data.tif'
with rasterio.open(tif_path) as src:
    raster_data = src.read(1)  # Read the first band of the raster data

# Step 2: Flatten the raster data and remove NaN values if present
raster_data_flattened = raster_data.flatten()
raster_data_no_nan = raster_data_flattened[~np.isnan(raster_data_flattened)]

# Step 3: Calculate the Z-scores for the entire raster
z_scores = stats.zscore(raster_data_no_nan)

print("Z-scores for the entire raster:", z_scores)
