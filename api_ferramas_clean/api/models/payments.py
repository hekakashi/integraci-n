# api/models/payments.py
from pydantic import BaseModel
from typing import Optional

class PaymentRequest(BaseModel):
    order_id: str
    amount: float
    customer_email: str
    # otros campos necesarios

class PaymentResponse(BaseModel):
    payment_id: str
    redirect_url: str
    token: str
    status: str

class PaymentStatus(BaseModel):
    status: str
    amount: float
    authorization_code: Optional[str]