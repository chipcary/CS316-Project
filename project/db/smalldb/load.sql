INSERT INTO Users VALUES
	('bhc17@duke.edu', 'Chip', 'DURHAM', 'NC'),
	('blah', 'a', 'b', 'c');

INSERT INTO UserCreds VALUES
	('bhc17@duke.edu', "100"),
	('blah', "200");

INSERT INTO UserInterests VALUES
	('bhc17@duke.edu', 'i1', 'i2', 'i3'),
	('blah', 'a', 'b', 'c');

INSERT INTO UserTimeSlots VALUES
	('bhc17@duke.edu', 'monday', 10, 12),
	('bhc17@duke.edu', 'tuesday', 10, 12);

INSERT INTO Projects(creator_email, project_name, tag, project_date, day_of_the_week, start_time, end_time, curr_capacity, goal_capacity, city, state, description) VALUES
	('blah', 'test1', 'i1', TO_DATE('17/12/2018', 'DD/MM/YYYY'), 'monday', 10, 12, 0, 1, 'DURHAM', 'NC', 'first test project'),
	('blah', 'test2', 'i2', TO_DATE('17/12/2018', 'DD/MM/YYYY'), 'monday', 10, 12, 0, 2, 'DURHAM', 'NC', 'desc2'),
	('blah', 'test3', 'i3', TO_DATE('17/12/2018', 'DD/MM/YYYY'), 'monday', 10, 12, 0, 2, 'DURHAM', 'NC', 'desc3'),
	('blah', 'test4', 'other', TO_DATE('17/12/2018', 'DD/MM/YYYY'), 'monday', 10, 12, 0, 2, 'DURHAM', 'NC', 'desc4'),
	('blah', 'exclude', 'other', TO_DATE('17/12/2018', 'DD/MM/YYYY'), 'tuesday', 10, 12, 0, 2, 'DURHAM', 'NC', 'desc5'),
	('bhc17@duke.edu', 'exclude', 'other', TO_DATE('17/12/2018', 'DD/MM/YYYY'), 'monday', 10, 12, 0, 2, 'DURHAM', 'NC', 'desc6');

INSERT INTO UserJoinsProject VALUES
	('blah', 1),
	('blah', 5),
	('bhc17@duke.edu', 6);