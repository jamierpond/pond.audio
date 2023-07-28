import React, { useEffect, useRef } from 'react';

const GoogleCalendarAppointment = () => {
  const scriptRef = useRef(null);

  useEffect(() => {
    const loadSchedulingButton = () => {
      if (window.calendar && window.calendar.schedulingButton) {
        window.calendar.schedulingButton.load({
          url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3jOHRmuTPimqu4GnmxizGapFjz_cM32zf0_cBdA-EkVKlxE4VRx8dg0nUojgopkV1N_xtGWF5i?gv=true',
          color: '#039BE5',
          label: 'Book an appointment',
          target: scriptRef.current,
        });
      }
    };

    const script = document.createElement('script');
    script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
    script.async = true;
    script.onload = loadSchedulingButton;
    document.body.appendChild(script);

    return () => {  // Cleanup on unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <link href="https://calendar.google.com/calendar/scheduling-button-script.css" rel="stylesheet" />
      <script ref={scriptRef} />
    </>
  );
};

export default GoogleCalendarAppointment;

