INSERT INTO users ( id, company_id, username, first_name, last_name, email, password, supervisor_id) 
VALUES ( nextVal('user_sequence'), $1, $2, $3, $4, $5, $6, $7);