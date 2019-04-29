import pandas as pd
import datetime as dt
import random

projects = pd.read_csv("Projects.csv")

print(projects.columns)

projects.rename(columns = {'project_date' : 'start_date', 'end_time' : 'end_date'}, inplace=True)
projects['start_date'] = pd.to_datetime(projects['start_date'])


projects['start_date'] += pd.Timedelta('365 days')
projects['start_date'] = projects['start_date'].apply(lambda date: date + dt.timedelta(hours=random.randint(0,24)))
projects['end_date'] = projects['start_date'].apply(lambda date: date + dt.timedelta(hours=random.randint(1,24)))

projects.drop('day_of_week', axis=1, inplace=True)
projects.drop('start_time', axis=1, inplace=True)
projects.drop('pid', axis=1, inplace=True)

print(projects.head())

projects.to_csv('Projects_datetime.csv', index=False)