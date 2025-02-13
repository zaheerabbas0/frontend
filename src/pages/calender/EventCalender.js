import React, { useEffect, useState } from 'react';
import {
  Calendar as BigCalendar,
  dayjsLocalizer,
  Views,
} from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCalender,
  fetchCalendar,
} from '../../reduxToolkit/features/CalendarSlice';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';
import { CustomButton } from '../../styledComponents/CustomButton';
import { Form } from 'antd';
import CustomModal from '../../styledComponents/CustomModal';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { disabledDate } from '../../utils/ProjectUtils';
const localizer = dayjsLocalizer(dayjs);

const StyledCalendarWrapper = styled.div`
  background-color: white;
  padding: 0.5vw 0.5vw 2vw 0.5vw;
  .rbc-today {
    background-color: #effae4;
  }
  .rbc-calendar {
    height: 200px;
    padding: 0px 50px;
  }
  .rbc-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .rbc-toolbar button,
  .rbc-toolbar select {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px 16px;
    margin: 0 4px;
    font-size: 14px;
    cursor: pointer;
    background-color: #f5f5f5;
    transition:
      background-color 0.3s,
      color 0.3s;
  }
  .rbc-toolbar select {
    cursor: pointer;
  }
  .rbc-header {
    padding: 5px;
    text-align: center;
    vertical-align: middle;
    font-weight: bold;
    font-size: 100%;
  }
  .rbc-button-link {
    padding-bottom: 10px;
  }
`;

const CustomToolbar = (toolbar) => {
  const goToYear = (event) => {
    toolbar.date.setFullYear(event.target.value);
    toolbar.onNavigate('date', toolbar.date);
  };

  const goToMonth = (event) => {
    const month = event.target.value;
    toolbar.date.setMonth(month);
    toolbar.onNavigate('date', toolbar.date);
  };

  const handleViewChange = (view) => {
    toolbar.onView(view);
  };

  const currentYear = toolbar.date.getFullYear();
  const currentMonth = toolbar.date.getMonth();
  const years = [];
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    years.push(i);
  }

  const months = dayjs.months();

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button onClick={() => toolbar.onNavigate('TODAY')}>Today</button>
        <button onClick={() => toolbar.onNavigate('PREV')}>
          <LeftOutlined />
        </button>
        <button onClick={() => toolbar.onNavigate('NEXT')}>
          <RightOutlined />
        </button>
      </span>

      <span className="rbc-toolbar-label">
        <select
          value={currentYear}
          onChange={goToYear}
          className="rbc-toolbar-select"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select value={currentMonth} onChange={goToMonth}>
          {months.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
      </span>

      <span className="rbc-btn-group">
        <button onClick={() => handleViewChange(Views.MONTH)}>Month</button>
        <button onClick={() => handleViewChange(Views.WEEK)}>Week</button>
        <button onClick={() => handleViewChange(Views.DAY)}>Day</button>
      </span>
    </div>
  );
};

const EventCalendar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [form] = Form.useForm();
  const calender = useSelector((state) => state.calender.calenderData);
  const eventPropGetter = (event) => {
    let backgroundColor = '';
    if (event.type === 'warning') backgroundColor = '#FAAD14';
    if (event.type === 'success') backgroundColor = '#52C41A';
    if (event.type === 'error') backgroundColor = '#FF4D4F';
    return { style: { backgroundColor } };
  };

  const events = calender.map((item) => ({
    id: item.id,
    title: item.title,
    start: dayjs(item.start_date).toDate(),
    end: dayjs(item.due_date).toDate(),
  }));

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setIsModalVisible(false);
        const userData = JSON.parse(localStorage.getItem('user_info'));
        const userId = userData?.id;
        const formattedStartDate = values.start_date
          ? dayjs(values.start_date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
          : null;
        const formattedDueDate = values.due_date
          ? dayjs(values.due_date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
          : null;
        const updatedValues = {
          ...values,
          due_date: formattedDueDate,
          start_date: formattedStartDate,
          id: userId,
        };
        dispatch(createCalender(updatedValues));
        form.resetFields();
      })

      .catch((info) => {});
  };
  useEffect(() => {
    dispatch(fetchCalendar());
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    const dueDateElement = document.querySelector('.DUE_DATE');
    if (dueDateElement) {
      const clearButton = dueDateElement.querySelector(
        '.ant-picker-clear[role="button"]'
      );
      if (clearButton) {
        clearButton.click();
      }
    }
  };

  const modalFields = [
    {
      type: 'input',
      label: 'Title',
      name: 'title',
      rules: [{ required: true, message: 'Please input the email!' }],
      placeholder: 'Enter Title',
    },
    {
      type: 'datePicker',
      label: 'Start Date',
      name: 'start_date',
      rules: [{ required: true, message: 'Please select the closed date!' }],
      placeholder: 'Select closed date',
      props: {
        onChange: handleStartDateChange,
        disabledDate: disabledDate,
      },
    },
    {
      type: 'datePicker',
      label: 'Closed Date',
      name: 'due_date',
      rules: [{ required: true, message: 'Please select the closed date!' }],
      placeholder: 'Select closed date',
      props: {
        disabled: !startDate,
        disabledDate: (current) => current && current < startDate,
        className: 'DUE_DATE',
      },
    },
  ];
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px 60px',
          background: 'white',
        }}
      >
        <h2>Calendar</h2>
        <CustomButton onClick={() => setIsModalVisible(true)}>
          Create Event
        </CustomButton>
      </div>
      <StyledCalendarWrapper>
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          views={['month', 'week', 'day']}
          components={{
            toolbar: CustomToolbar,
          }}
          defaultView="month"
        />
      </StyledCalendarWrapper>
      <CustomModal
        variant=""
        isVisible={isModalVisible}
        onClose={handleCancel}
        onOk={handleOk}
        form={form}
        modalFields={modalFields}
        okButtonText="Create Event"
      />
    </>
  );
};

export default EventCalendar;
