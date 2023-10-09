export const zip_comms = [
  { code: "DG", name: "Dangerous Goods" },
  { code: "CC01A", name: "CATEGORY 1 ACTUAL TEMP: RQRD TEMP:" },
  { code: "OG001", name: "OUT OF GAUGE" },
  { code: "BB002", name: "SPECIAL HANDLING" },
  { code: "RC001", name: "ROLLING CARGO" },
  { code: "FC001", name: "FRAGILE CARGO" },
  { code: "LA001", name: "LIVE ANIMAL" },
  { code: "PC001", name: "PERISHABLE CARGO" },
  { code: "CC02B", name: "CATEGORY 2B ACTUAL TEMP: RQRD TEMP:" },
  { code: "BB001", name: "LIFT ON/LIFT OFF" },
  { code: "CC002", name: "SPECIAL HANDLING" },
  { code: "AP", name: "APPLIANCES" },
  { code: "CELL", name: "CELLULAR PHONES" },
  { code: "CC02A", name: "CATEGORY 2A ACTUAL TEMP: RQRD TEMP:" },
  { code: "DC001", name: "DANGEROUS CARGO" },
  { code: "OT001", name: "OTHERS" },
  { code: "GC001", name: "GENERAL CARGO" },
  { code: "FA", name: "FIRE ARMS" },
  { code: "RR01", name: "RORO" },
].sort((a, b) => {
  let fa = a.name,
    fb = b.name;

  if (fa < fb) {
    return -1;
  }
  if (fa > fb) {
    return 1;
  }
  return 0;
});
