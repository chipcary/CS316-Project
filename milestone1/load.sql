INSERT INTO Users VALUES
	('bhc17@duke.edu', 'Chip', 'DURHAM', 'NC'),
	('blah', 'a', 'b', 'c');

INSERT INTO UserInterests VALUES
	('bhc17@duke.edu', 'i1', 'i2', 'i3'),
	('blah', 'a', 'b', 'c');

INSERT INTO UserTimeSlots VALUES
	('bhc17@duke.edu', 'monday', 10, 12);

INSERT INTO Projects VALUES
	('blah', 'test1', 'i1', TO_DATE('17/12/2018', 'DD/MM/YYYY'), 'monday', 10, 12, 0, 1, 'DURHAM', 'NC'),
	('blah', 'test2', 'i2', TO_DATE('17/12/2018', 'DD/MM/YYYY'), 'monday', 10, 12, 0, 2, 'DURHAM', 'NC'),
	('blah', 'test3', 'i3', TO_DATE('17/12/2018', 'DD/MM/YYYY'), 'monday', 10, 12, 0, 2, 'DURHAM', 'NC'),
	('blah', 'test4', 'other', TO_DATE('17/12/2018', 'DD/MM/YYYY'), 'monday', 10, 12, 0, 2, 'DURHAM', 'NC'),
	('blah', 'exclude', 'other', TO_DATE('17/12/2018', 'DD/MM/YYYY'), 'tuesday', 10, 12, 0, 2, 'DURHAM', 'NC'),
	('bhc17@duke.edu', 'exclude', 'other', TO_DATE('17/12/2018', 'DD/MM/YYYY'), 'monday', 10, 12, 0, 2, 'DURHAM', 'NC');

INSERT INTO UserJoinsProject VALUES
	('blah', 'blah', 'test1'),
	('bhc17@duke.edu', 'bhc17@duke.edu', 'exclude');