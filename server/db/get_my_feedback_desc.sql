SELECT 
    id, 
    user_id AS "userId", 
    company_id AS "companyId", 
    rating, 
    "like", 
    dislike, 
    agent_advice AS "agentAdvice", 
    purchase_reason AS "purchaseReason",
    customer_name AS "customerName",
    created
FROM customer_feedback
WHERE user_id = $1
AND company_id = $2
AND rating = ANY($5)
ORDER BY created DESC
OFFSET $3 LIMIT $4;