SELECT count(*) 
FROM customer_feedback 
WHERE user_id = $1
AND company_id = $2;