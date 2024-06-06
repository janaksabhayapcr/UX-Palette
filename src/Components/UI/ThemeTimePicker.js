import React from 'react';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import "flatpickr/dist/flatpickr.css";

export default function ThemeTimePicker(props) {
    const { id, name, value, onChange, className = '', placeholder = 'Select Time', ...rest } = props;

    return (
        <Flatpickr
            {...rest}
            className="form-control"
            id="event-start-date"
            name={name ? name : ''}
            placeholder={placeholder}
            value={value ? value : ''}
            options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
                time_24hr: true,
            }}
            onChange={(date) => {
                onChange({
                    target: {
                        name,
                        value: date[0],
                    },
                });
            }}
        />
    );
}
