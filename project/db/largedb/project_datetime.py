#
# Switch to start_date and end_date for projects
# Make city and state match users city and state for more realistic results
#


import pandas as pd
import datetime as dt
import random

projects = pd.read_csv("Projects.csv")
users = pd.read_csv("Users.csv")

print(projects.columns)
print(users.columns)

projects.rename(columns = {'project_date' : 'start_date', 'end_time' : 'end_date'}, inplace=True)

projects['city'] = users['City']
projects['state'] = users['State']

#make start_date more recent and randomly generate an end date
projects['start_date'] = pd.to_datetime(projects['start_date'])
projects['start_date'] += pd.Timedelta('365 days')
projects['start_date'] = projects['start_date'].apply(lambda date: date + dt.timedelta(hours=random.randint(0,24)))
projects['end_date'] = projects['start_date'].apply(lambda date: date + dt.timedelta(hours=random.randint(1,24)))

#drop old columns
projects.drop('day_of_week', axis=1, inplace=True)
projects.drop('start_time', axis=1, inplace=True)
projects.drop('pid', axis=1, inplace=True)

print(projects.head())

projects.to_csv('Projects_datetime.csv', index=False)