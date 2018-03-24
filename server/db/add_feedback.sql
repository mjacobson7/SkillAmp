INSERT INTO customer_feedback (id, user_id, company_id, rating, "like", dislike, product_description, created)
VALUES ( nextVal('feedback_sequence'), $1, $2, $3, $4, $5, $6, now());