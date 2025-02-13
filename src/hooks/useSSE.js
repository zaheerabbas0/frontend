import { useEffect, useRef } from 'react';

const useSSE = (url, onMessage) => {
  const eventSourceRef = useRef(null);

  useEffect(() => {
    if (!url || typeof onMessage !== 'function') {
      console.warn('URL and onMessage function are required');
      return;
    }

    eventSourceRef.current = new EventSource(
      `${process.env.REACT_APP_BASE_URL}${url}`
    );

    eventSourceRef.current.onmessage = (event) => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch (error) {
        console.log('Parsing Error', error);
      }
      onMessage(data);
    };

    eventSourceRef.current.onerror = (error) => {
      console.error('SSE error:', error);
      eventSourceRef.current.close();
    };

    return () => {
      eventSourceRef.current.close();
    };
  }, [url]);

  return eventSourceRef.current;
};

export default useSSE;

// example
// useSSE(
//     `/api/v1/monitoring/device_avalability_scheduler/cpu_utilization_stream?ip=${selectedDevice?.ip_address}`,
//     (data) => {
//       if (data && data.length > 0) {
//         setData(data[0]);
//       }
//     }
//   );
