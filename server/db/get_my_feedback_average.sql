select rating, sum(rating) 
FROM customer_feedback
WHERE company_id = $1
AND user_id = $2
GROUP BY rating
ORDER BY rating ASC;