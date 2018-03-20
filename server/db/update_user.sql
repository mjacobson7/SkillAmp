UPDATE users 
   SET username = $1,
       first_name = $2,
       last_name = $3,
       password = COALESCE($4, password),
       email = $5,
       supervisor_id = $6
 WHERE id = $7
 AND company_id = $8;
