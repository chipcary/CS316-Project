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

INSERT INTO Projects(creator_email, project_name, tag, start_date, end_date, curr_capacity, goal_capacity, city, state, description) VALUES
	('blah', 'test1', 'i1', (TIMESTAMP '2011-05-16 15:36:38'), (TIMESTAMP '2011-05-17 15:36:38'), 0, 1, 'DURHAM', 'NC', 'first test project'),
	('blah', 'test2', 'i2', (TIMESTAMP '2011-05-16 15:36:38'), (TIMESTAMP '2011-05-17 15:36:38'), 0, 2, 'DURHAM', 'NC', 'desc2'),
	('blah', 'test3', 'i3', (TIMESTAMP '2011-05-16 15:36:38'), (TIMESTAMP '2011-05-17 15:36:38'), 0, 2, 'DURHAM', 'NC', 'desc3'),
	('blah', 'test4', 'other', (TIMESTAMP '2011-05-16 15:36:38'), (TIMESTAMP '2011-05-17 15:36:38'), 0, 2, 'DURHAM', 'NC', 'desc4'),
	('blah', 'exclude', 'other', (TIMESTAMP '2011-05-16 15:36:38'), (TIMESTAMP '2011-05-17 15:36:38'), 0, 2, 'DURHAM', 'NC', 'desc5'),
	('bhc17@duke.edu', 'exclude', 'other', (TIMESTAMP '2011-05-16 15:36:38'), (TIMESTAMP '2011-05-17 15:36:38'), 0, 2, 'DURHAM', 'NC', 'desc6');

INSERT INTO UserJoinsProject VALUES
	('bhc17@duke.edu', 5);