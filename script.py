import pandas as pd
import geopandas as gpd
import folium
from shapely.geometry import Point


data = {
    'uf': ['AM', 'AM', 'AM', 'AM', 'PA', 'PA', 'PA', 'PA'],
    'nome_estacao': ['BARCELOS', 'FONTE BOA', 'ITACOATIARA', 'MANAUS', 'BELTERRA', 'ITAITUBA', 'MONTE ALEGRE', 'PORTO DE MOZ'],
    'latitude': [-0.974167, -2.515833, -3.136944, -3.103889, -2.642222, -4.276986, -2.000000, -1.751055],
    'longitude': [-62.928611, -66.100833, -58.442778, -60.015556, -54.943889, -55.993087, -54.076389, -52.236186],
    '1961-1991 TEMP MAX': ['31,7', '30,8', '31,2', '31,4', '30,3', '32,1', '30,9', '31,7'],
    '1991-2020 TEMP MAX': ['32,5', '32', '32,3', '32,3', '31,2', '33,3', '31,3', '32,2'],
    'TEMP MAX DIFF': ['0,8', '1,2', '1,1', '0,9', '0,9', '1,2', '0,4', '0,5']
}


df = pd.DataFrame(data)


df['1961-1991 TEMP MAX'] = df['1961-1991 TEMP MAX'].str.replace(',', '.').astype(float)
df['1991-2020 TEMP MAX'] = df['1991-2020 TEMP MAX'].str.replace(',', '.').astype(float)
df['TEMP MAX DIFF'] = df['TEMP MAX DIFF'].str.replace(',', '.').astype(float)


geometry = [Point(xy) for xy in zip(df['longitude'], df['latitude'])]
gdf = gpd.GeoDataFrame(df, geometry=geometry)


mapa = folium.Map(
    location=[-2.5, -60.0], 
    zoom_start=5,
    tiles='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',  
    attr="Esri"
)


for idx, row in gdf.iterrows():
    folium.Marker(
        location=[row['latitude'], row['longitude']],
        popup=(
            f"<b>Estação:</b> {row['nome_estacao']}<br>"
            f"<b>1961-1991 Temp Max:</b> {row['1961-1991 TEMP MAX']}°C<br>"
            f"<b>1991-2020 Temp Max:</b> {row['1991-2020 TEMP MAX']}°C<br>"
            f"<b>Diferença de Temp Max:</b> {row['TEMP MAX DIFF']}°C"
        ),
        icon=folium.Icon(color='red', icon='none')
    ).add_to(mapa)

mapa.save("meu_mapa_estacoes_folium.html")

