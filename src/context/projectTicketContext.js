import { createContext, useContext, useState, useCallback } from 'react';
import AxiosInstance from '../appURL/AxiosInstance';

const ProjectTicketContext = createContext();

export const useProjectTicket = () => useContext(ProjectTicketContext);

export const ProjectTicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDataStale, setIsDataStale] = useState(true);

  const fetchTickets = useCallback(
    async (projectId) => {
      if (!isDataStale) return;

      setLoading(true);
      setError(null);
      try {
        const response = await AxiosInstance.get(
          `/api/v1/project/projects/${projectId}/tickets`
        );
        setTickets(response.data);
        setIsDataStale(false);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [isDataStale]
  );

  const updateTicketData = useCallback((updatedTickets) => {
    setTickets(updatedTickets);
    setIsDataStale(false);
  }, []);

  const invalidateData = useCallback(() => {
    setTickets([]);
    setIsDataStale(true);
  }, []);

  const contextValue = {
    tickets,
    loading,
    error,
    fetchTickets,
    updateTicketData,
    invalidateData,
  };

  return (
    <ProjectTicketContext.Provider value={contextValue}>
      {children}
    </ProjectTicketContext.Provider>
  );
};
