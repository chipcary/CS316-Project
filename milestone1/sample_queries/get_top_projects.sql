WITH available_projects AS(
	SELECT p1.project_name, p1.creator_email
	FROM Users, UserInterests, UserTimeSlots, Projects as p1
	WHERE Users.email = 'bhc17@duke.edu' 
	AND Users.city = p1.city
	AND Users.state = p1.state
	AND UserTimeSlots.email = Users.email
	AND UserTimeSlots.day_of_the_week = p1.day_of_the_week
	AND UserTimeSlots.start_time <= p1.start_time
	AND UserTimeSlots.end_time >= p1.end_time
	AND p1.curr_capacity < p1.goal_capacity
	EXCEPT(
		SELECT project_name, creator_email FROM UserJoinsProject
		WHERE user_email = 'bhc17@duke.edu'
	)
)
SELECT available_projects.project_name, available_projects.creator_email
FROM UserInterests, available_projects, Projects
WHERE Projects.project_name = available_projects.project_name
AND Projects.creator_email = available_projects.creator_email
AND UserInterests.email = 'bhc17@duke.edu'
order by interest1 = tag desc, interest2 = tag desc, interest3 = tag desc;