import TicketTable from '../../../components/tables/ticketTable/ticketTable';
import useCheckStateStatus, {
  TICKETS_APPROVALS,
} from '../../../hooks/useCheckStateStatus';

const ApprovalList = () => {
  const { approvals } = useCheckStateStatus([TICKETS_APPROVALS]);
  return (
    <TicketTable
      spin={false}
      title="Pending Approval"
      dataSource={approvals || []}
      showFilters={true}
      showDelete={true}
      showCreate={true}
      showImport={true}
      showExport={true}
    />
  );
};
export default ApprovalList;
