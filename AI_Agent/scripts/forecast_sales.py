import pandas as pd
import numpy as np
from prophet import Prophet
from sklearn.metrics import mean_squared_error

df = pd.read_excel("Raw_Sales_Data.xlsx")
df['ds'] = pd.to_datetime(df['Date'])
df['y'] = df['Sales']

model = Prophet()
model.fit(df[['ds', 'y']])

future = model.make_future_dataframe(periods=6, freq='M')
forecast = model.predict(future)

forecast[['ds', 'yhat']].to_excel("Clean_Forecast.xlsx", index=False)

rmse = np.sqrt(mean_squared_error(df['y'], model.predict(df[['ds']])['yhat']))
pd.DataFrame([{'Metric': 'RMSE', 'Value': rmse}]).to_excel("KPI_Metrics.xlsx", index=False)
