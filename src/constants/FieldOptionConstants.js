export const RESOLVED_KEY = 'Resolved';
export const ON_HOLD_KEY = 'On Hold';
export const Open_Key = 'Open';
export const OVERDUE_Key = 'Overdue';
export const Escalated_Key = 'Escalated';
export const Pending_Approval_Key = 'Pending Approval';
export const Violated_Key = 'Violated';
export const Non_Violated_Key = 'Non Violated';
export const Active_Key = 'Active';
export const In_Active_Key = 'In Active';
export const Scheduled_Key = 'Scheduled';

export const KeyToStatusMap = {
  [RESOLVED_KEY]: 'Resolved',
  [ON_HOLD_KEY]: 'On Hold',
  [Open_Key]: 'Open',
  [OVERDUE_Key]: 'Overdue',
  [Violated_Key]: 'Violated',
  [Non_Violated_Key]: 'Non Violated',
  [Active_Key]: 'Active',
  [In_Active_Key]: 'In Active',
  [Escalated_Key]: 'Escalated',
  [Pending_Approval_Key]: 'Pending Approval',
  [Scheduled_Key]: 'Scheduled',
};

// export const PriorityConstants = ['P1', 'P2', 'P3'];

// export const Regions = ['North', 'West', 'East', 'South'];
export const Regions = ['Siddiq', 'Zahra', 'Abu Halifa', 'Rawdha', 'Daiya'];
export const TicketRegions = Regions.map((r) => ({
  value: r,
  name: r,
}));

export const TicketConstants = {
  [Open_Key]: KeyToStatusMap[Open_Key],
  [ON_HOLD_KEY]: KeyToStatusMap[ON_HOLD_KEY],
  [RESOLVED_KEY]: KeyToStatusMap[RESOLVED_KEY],
  [OVERDUE_Key]: KeyToStatusMap[OVERDUE_Key],
  [Escalated_Key]: KeyToStatusMap[Escalated_Key],
  [Pending_Approval_Key]: KeyToStatusMap[Pending_Approval_Key],
  [Scheduled_Key]: KeyToStatusMap[Scheduled_Key],
};

export const SlaStatusOptions = ['Violated', 'Non Violated'];
