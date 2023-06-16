const SuccessCard = ({ status }) => {
  return (
    <>
      <span className="bg-[#18950433] text-[#189504] text-sm font-semibold px-8 py-1 rounded-full">
        {status}
      </span>
    </>
  );
};

const WarningCard = ({ status }) => {
  return (
    <>
      <span className="bg-[#dbbb2333] text-[#FB9E14] text-sm font-semibold px-8 py-1 rounded-full">
        {status}
      </span>
    </>
  );
};

const ErrorCard = ({ status }) => {
  return (
    <>
      <span className="bg-[#ff080833] text-[#FF0808] text-sm font-semibold px-8 py-1 rounded-full">
        {status}
      </span>
    </>
  );
};

const StatusBadge = ({ status }) => {
  return (
    <>
      {status.toLowerCase() === "sent" ? (
        <SuccessCard status={status} />
      ) : status.toLowerCase() === "pending" ? (
        <WarningCard status={status} />
      ) : (
        <ErrorCard status={status} />
      )}
    </>
  );
};

export default StatusBadge;
