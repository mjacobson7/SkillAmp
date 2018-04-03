ALTER TABLE customer_feedback 
ADD COLUMN product_description TEXT;

ALTER TABLE customer_feedback
DROP COLUMN agent_advice cascade;

ALTER TABLE customer_feedback
DROP COLUMN purchase_reason cascade;

ALTER TABLE customer_feedback
DROP COLUMN customer_name cascade;