SELECT 
    id, 
    user_id AS "userId", 
    company_id AS "companyId", 
    rating, 
    "like", 
    dislike, 
    product_description AS "productDescription", 
    created
FROM customer_feedback
WHERE user_id = $1
AND company_id = $2
AND rating = ANY($5)
ORDER BY created ASC
OFFSET $3 LIMIT $4;


