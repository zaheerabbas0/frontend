import { configureStore } from '@reduxjs/toolkit';
import UserSlice from '../features/UserSlice';
import AdminSlice from '../features/AdminSlice';
import DashboardSlice from '../features/DashboardSlice';
import TicketSlice from '../features/TicketSlice';
import ProjectSlice from '../features/ProjectSlice';
import ContractSlice from '../features/ContractSlice';
import CustomerSlice from '../features/CustomerSlice';
import CalenderSlice from '../features/CalendarSlice';
import ChatSlice from '../features/ChatSlice';
import SlaSlice from '../features/SlaSlice';
import SettingSlice from '../features/SettingSlice';
import SkillSlice from '../features/SkillSlice';
import GroupSlice from '../features/GroupSlice';
import CategoriesSlice from '../features/CategorySlice';
import TagSlice from '../features/TagSlice';
import PrioritySlice from '../features/PrioritySlice';

const AppStore = configureStore({
  reducer: {
    dashboard: DashboardSlice,
    ticket: TicketSlice,
    user: UserSlice,
    admin: AdminSlice,
    project: ProjectSlice,
    contract: ContractSlice,
    customer: CustomerSlice,
    calender: CalenderSlice,
    chatUser: ChatSlice,
    sla: SlaSlice,
    skills: SkillSlice,
    groups: GroupSlice,
    setting: SettingSlice,
    categories: CategoriesSlice,
    tags: TagSlice,
    priorities: PrioritySlice,
  },
});

export default AppStore;
