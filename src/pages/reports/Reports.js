import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from './components/header';
import Overview from './components/overview/overview';
import CustomerDetails from './components/customer';
import Collaborators from './components/collaborators';
import TicketActivities from './components/ticketActivities';
import AxiosInstance from '../../appURL/AxiosInstance';
// import html2pdf from 'html2pdf.js';/
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { message } from 'antd';

const ReportContainer = styled.div`
  width: 1000px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  padding: 13px;
`;

const Reports = ({ projectId, setGenerateReport, month_number = 0 }) => {
  const [reportData, setReportData] = useState(null);
  const fetchReportData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user_info'));
      const userId = userData?.id;

      const currentMonth = new Date().getMonth() + 1;

      if (month_number === 0) {
        month_number = currentMonth;
      }

      const response = await AxiosInstance.post(
        '/api/v1/report/generate-report',
        {
          user_id: userId,
          project_id: projectId,
          month_number: month_number,
        }
      );

      console.log('RESPONSE FOR REPORT', response?.data);
      setReportData(response?.data);
    } catch (error) {
      console.error('Error fetching report data:', error);
      message.error('Error fetching data to generate report');
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  const preloadImages = async (element) => {
    const images = Array.from(element.getElementsByTagName('img'));
    const promises = images.map((img) => {
      if (img.complete) {
        return Promise.resolve();
      }
      return new Promise((resolve, reject) => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', reject);
      });
    });
    await Promise.all(promises);
  };

  const generatePdf = async () => {
    const input = document.getElementById('report');
    const mainContainer = document.getElementById('main-container');

    await preloadImages(input);

    html2canvas(input, {
      scrollY: -mainContainer.scrollTop,
      scrollX: -mainContainer.scrollLeft,
      windowWidth: mainContainer.scrollWidth,
      windowHeight: mainContainer.scrollHeight,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg');

        // Calculate the PDF height based on the aspect ratio of the canvas
        const pdfWidth = 210; // A4 width in mm
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Calculate the height in mm

        // Create a PDF with custom dimensions
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: [pdfWidth, pdfHeight],
        });

        // Add the image to the PDF with the custom dimensions
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

        pdf.save('report.pdf');
        setGenerateReport();
      })
      .catch((error) => {
        console.error('Error generating PDF', error);
      });
  };

  useEffect(() => {
    if (reportData) {
      const timeoutId = setTimeout(() => {
        generatePdf();
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [reportData]);

  return (
    <ReportContainer id="report">
      <Header data={reportData?.data} />
      <Overview data={reportData?.data?.overview} />
      <CustomerDetails customer={reportData?.data?.customer[0]} />
      <TicketActivities tickets={reportData?.data?.ticket_activity_table} />
      <Collaborators collabrators={reportData?.data?.project_collaborators} />
    </ReportContainer>
  );
};

export default Reports;
