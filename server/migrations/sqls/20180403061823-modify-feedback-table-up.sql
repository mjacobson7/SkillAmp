ALTER TABLE customer_feedback DROP COLUMN product_description cascade;

ALTER TABLE customer_feedback
ADD COLUMN agent_advice TEXT;

ALTER TABLE customer_feedback
ADD COLUMN purchase_reason TEXT;

ALTER TABLE customer_feedback
ADD COLUMN customer_name varchar(255);