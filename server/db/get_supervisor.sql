SELECT 
    id, 
    company_id AS "companyId", 
    username, 
    first_name AS "firstName", 
    last_name AS "lastName", 
    email, 
    password, 
    supervisor_id AS "supervisorId", 
    created
FROM users u WHERE u.id = $1 LIMIT 1;