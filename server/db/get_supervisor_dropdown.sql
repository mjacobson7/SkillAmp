SELECT 
    u.id, 
    u.username, 
    u.first_name AS "firstName", 
    u.last_name AS "lastName"
FROM users u
JOIN user_roles ur
ON ur.user_id = u.id
JOIN roles r
ON r.id = ur.role_id
WHERE u.company_id = $1
AND r.is_supervisor IS TRUE;