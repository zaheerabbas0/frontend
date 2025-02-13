import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { fetchUsers } from '../reduxToolkit/features/UserSlice';
import { fetchProjects } from '../reduxToolkit/features/ProjectSlice';
import { fetchTickets } from '../reduxToolkit/features/TicketSlice';
import { fetchCustomers } from '../reduxToolkit/features/CustomerSlice';
import { fetchContracts } from '../reduxToolkit/features/ContractSlice';
import { fetchSla } from '../reduxToolkit/features/SlaSlice';
import { fetchSkill } from '../reduxToolkit/features/SkillSlice';
import { fetchGroup } from '../reduxToolkit/features/GroupSlice';
import { fetchTags } from '../reduxToolkit/features/TagSlice';
import { fetchPriority } from '../reduxToolkit/features/PrioritySlice';
import { fetchCategories } from '../reduxToolkit/features/CategorySlice';
import { fetchAdmins } from '../reduxToolkit/features/AdminSlice';

export const USER_STATE = 'users';
export const ADMIN_STATE = 'admins';
export const PROJECT_STATE = 'projects';
export const TICKETS_STATE = 'tickets';
export const TICKETS_APPROVALS = 'approvals';
export const CUSTOMERS_STATE = 'customers';
export const CONTRACTS_STATE = 'contracts';
export const SLA_STATE = 'slas';
export const SKILL_STATE = 'skills';
export const GROUPS_STATE = 'groups';
export const TAGS_STATE = 'tags';
export const PRIORITY_STATE = 'priorities';
export const CATEGORY_STATE = 'categories';

const useCheckStateStatus = (states = []) => {
  const dispatch = useDispatch();

  const statusSelectors = {
    [USER_STATE]: useSelector((state) => state.user.status),
    [ADMIN_STATE]: useSelector((state) => state.admin.status),
    [PROJECT_STATE]: useSelector((state) => state.project.status),
    [TICKETS_STATE]: useSelector((state) => state.ticket.status),
    [TICKETS_APPROVALS]: useSelector((state) => state.ticket.status),
    [CUSTOMERS_STATE]: useSelector((state) => state.customer.status),
    [CONTRACTS_STATE]: useSelector((state) => state.contract.status),
    [SLA_STATE]: useSelector((state) => state.sla.status),
    [SKILL_STATE]: useSelector((state) => state.skills.status),
    [GROUPS_STATE]: useSelector((state) => state.groups.status),
    [TAGS_STATE]: useSelector((state) => state.tags.status),
    [PRIORITY_STATE]: useSelector((state) => state.priorities.status),
    [CATEGORY_STATE]: useSelector((state) => state.categories.status),
  };

  const dataSelectors = {
    [USER_STATE]: useSelector((state) => state.user.users),
    [ADMIN_STATE]: useSelector((state) => state.admin.admins),
    [PROJECT_STATE]: useSelector((state) => state.project.projects),
    [TICKETS_STATE]: useSelector((state) => state.ticket.tickets),
    [TICKETS_APPROVALS]: useSelector((state) => state.ticket.approvals),
    [CUSTOMERS_STATE]: useSelector((state) => state.customer.customers),
    [CONTRACTS_STATE]: useSelector((state) => state.contract.contracts),
    [SLA_STATE]: useSelector((state) => state.sla.slas),
    [SKILL_STATE]: useSelector((state) => state.skills.skills),
    [GROUPS_STATE]: useSelector((state) => state.groups.groups),
    [TAGS_STATE]: useSelector((state) => state.tags.tags),
    [PRIORITY_STATE]: useSelector((state) => state.priorities.priorities),
    [CATEGORY_STATE]: useSelector((state) => state.categories.categories),
  };

  useEffect(() => {
    states.forEach((stateType) => {
      if (statusSelectors[stateType] === 'idle') {
        try {
          switch (stateType) {
            case USER_STATE:
              dispatch(fetchUsers());
              break;
            case ADMIN_STATE:
              dispatch(fetchAdmins());
              break;
            case PROJECT_STATE:
              dispatch(fetchProjects());
              break;
            case TICKETS_STATE:
              dispatch(fetchTickets());
              break;
            case TICKETS_APPROVALS:
              dispatch(fetchTickets());
              break;
            case CUSTOMERS_STATE:
              dispatch(fetchCustomers());
              break;
            case CONTRACTS_STATE:
              dispatch(fetchContracts());
              break;
            case SLA_STATE:
              dispatch(fetchSla());
              break;
            case SKILL_STATE:
              dispatch(fetchSkill());
              break;
            case GROUPS_STATE:
              dispatch(fetchGroup());
              break;
            case TAGS_STATE:
              dispatch(fetchTags());
              break;
            case CATEGORY_STATE:
              dispatch(fetchCategories());
              break;
            case PRIORITY_STATE:
              dispatch(fetchPriority());
              break;
            default:
              break;
          }
        } catch (error) {
          message.error(`Failed to fetch ${stateType}`);
        }
      }
    });
  }, [
    states,
    statusSelectors[USER_STATE],
    statusSelectors[ADMIN_STATE],
    statusSelectors[PROJECT_STATE],
    statusSelectors[TICKETS_STATE],
    statusSelectors[TICKETS_APPROVALS],
    statusSelectors[CUSTOMERS_STATE],
    statusSelectors[CONTRACTS_STATE],
    statusSelectors[SLA_STATE],
    statusSelectors[SKILL_STATE],
    statusSelectors[GROUPS_STATE],
    statusSelectors[TAGS_STATE],
    statusSelectors[PRIORITY_STATE],
    statusSelectors[CATEGORY_STATE],
    dispatch,
  ]);

  const selectedData = states.reduce((acc, stateType) => {
    acc[stateType] = dataSelectors[stateType];
    return acc;
  }, {});

  return selectedData;
};

export default useCheckStateStatus;
