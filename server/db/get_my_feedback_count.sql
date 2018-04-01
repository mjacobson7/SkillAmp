SELECT COUNT(rating) 
FROM customer_feedback
WHERE company_id = $1
AND user_id = $2;