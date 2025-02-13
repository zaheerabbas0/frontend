// import RecentActivitiesTable from "../../../components/recentActivitiesTable/recentActivitiesTable";
import RecentActivitiesTable from '../../../components/recentActivitiesTable/recentActivitiesTable';
import SectionHeader from './sectionHeader';

const TicketActivities = ({ tickets }) => {
  return (
    <div>
      <SectionHeader title="Ticket Activities" />
      <RecentActivitiesTable
        dataSource={tickets || []}
        pagination={false}
        showHeader={false}
      />
    </div>
  );
};

export default TicketActivities;
