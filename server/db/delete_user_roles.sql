DELETE FROM user_roles WHERE user_id = $1 AND company_id = $2 AND role_id = $3;

--ALL(ARRAY$3::bigint);