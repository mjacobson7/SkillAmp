SELECT r.id, r.name, r.is_user AS "isUser", r.is_supervisor AS "isSupervisor", r.is_admin AS "isAdmin" 
FROM roles r 
JOIN user_roles ur 
ON ur.role_id = r.id
WHERE ur.company_id = $1
AND ur.user_id = $2;