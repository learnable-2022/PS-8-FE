const policy = [
  {
    id: 1,
    performance: "Appraisal score",
    condition: "=",
    perfvalue: 5,
    percentage: 10,
  },
  {
    id: 2,
    performance: "Appraisal score",
    condition: "=",
    perfvalue: 3,
    percentage: 5,
  },
  {
    id: 3,
    performance: "Appraisal score",
    condition: "=",
    perfvalue: 4,
    percentage: 7,
    salary: "Monthly Base Pay",
  },
  {
    id: 4,
    performance: "Appraisal score",
    condition: "=",
    perfvalue: 2,
    percentage: 0,
    salary: "Monthly Base Pay",
  },
  {
    id: 5,
    performance: "Total working hours",
    condition: ">=",
    perfvalue: 160,
    percentage: 10,
  },
  {
    id: 6,
    performance: "Total working hours",
    condition: "<",
    perfvalue: 100,
    percentage: -10,
  },

  {
    id: 7,
    performance: "Years of service",
    condition: ">",
    perfvalue: 4,
    percentage: 5,
  },
];

export default policy;


