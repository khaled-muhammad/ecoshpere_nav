import pandas as pd
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt


df = pd.read_csv('/content/Data1.csv')


X = df[['DN']]

kmeans = KMeans(n_clusters=10, random_state=0)
df['Cluster'] = kmeans.fit_predict(X)


cluster_means = df.groupby('Cluster')['DN'].mean().reset_index()


cluster_means = cluster_means.sort_values(by='DN', ascending=False).reset_index(drop=True)


cluster_means['Cluster_Name'] = cluster_means.index + 1

df = df.merge(cluster_means[['Cluster', 'Cluster_Name']], on='Cluster', how='left')

print(df)


plt.figure(figsize=(8, 6))
for cluster in df['Cluster'].unique():
    cluster_df = df[df['Cluster'] == cluster]
    plt.scatter(cluster_df.index, cluster_df['DN'], label=f'Cluster {cluster}')

plt.title('KMeans Clustering Results')
plt.xlabel('Index')
plt.ylabel('DN Value')
plt.legend()
plt.show()
