const OrderStatusBadge = ({ status }: { status: string }) => {
  const statusColor: { [key: string]: string } = {
    pending: "alert-warning",
    placed: "alert-primary",
    paid: "alert-secondary",
    confirmed: "alert-info",
    shipping: "alert-dark",
    delivered: "alert-success",
    cancelled: "alert-danger",
  };

  const statusColorClass = statusColor[status];

  return (
    <span className={`badge rounded-pill ${statusColorClass}`}>
      {status?.toUpperCase()}
    </span>
  );
};

export default OrderStatusBadge;
