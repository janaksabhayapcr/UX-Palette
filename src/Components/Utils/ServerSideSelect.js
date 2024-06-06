import React from 'react';
import Select from 'react-select';
import { FetchData } from './DataService';

import debounce from 'lodash/debounce';

const INITIAL_STATE = {
  searchText: '',
  options: [],
};

export default class ServerSideSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    this.search();
  }
  componentDidUpdate(prevProps) {
    // If the components value is updated, we want to clear the searchText and re-search for the list of options
    // In the case we are constructing our own value in the select drop down, we want to re-search only if the label changes
    // Comparing objects for changes like prevProps.value !== this.props.value - does not compare correctly so this was running every time the ServerSideSelect rendered.
    // in order to properly compare the previous and current value, we use JSON.stringify in these situations.
    let prevVal = prevProps.value && typeof prevProps.value === 'object' ? JSON.stringify(prevProps.value) : prevProps.value;
    let thisVal = this.props.value && typeof this.props.value === 'object' ? JSON.stringify(this.props.value) : this.props.value;

    if (prevVal !== thisVal) {
      let e = { target: { value: '' } };
      this.handleSearchChange(e);
    }
  }
  handleSearchChange = (e) => {
    this.setState({ searchText: e.target.value }, () => {
      this.search();
    });
  };

  handleCallBackChange = (e) => {
    this.props.onKeyDown(e);
  };

  search = debounce((n) => {
    let { type, fetchProperties, labelField, labelField2, labelDelimiter, valueField, additionalFields, apply } = this.props;
    
    if (labelField2 === undefined) {
      labelField2 = '';
    }
    let { searchText } = this.state;
    let tempProperties = Object.assign({}, fetchProperties);
    let applyQuery = '';
    let filter = '';

    if (!labelDelimiter) {
      labelDelimiter = '';
    }
    if (apply) {
      applyQuery = `&$apply=${apply}`;
    }

    if (n == 'null') {
      if (labelField2) {
        filter = `(startswith(${labelField},'') or startswith(${labelField2},''))`;
      } else {
        filter = `(startswith(${labelField},''))`; // Default to previous behavior
      }
      tempProperties.BaseUrl = tempProperties.BaseUrl + `?$top=100${applyQuery}&$filter=(${filter} ${additionalFields})&$orderby=${labelField}`;
    } else {
      if (labelField2) {
        filter = `(startswith(${labelField},'${searchText}') or startswith(${labelField2},'${searchText}'))`; // Allow for second label field to be searched
      } else {
        if (type === 'fuzzy') {
          filter = `(contains(${labelField},'${searchText}') eq true)`;
        } else {
          filter = `(startswith(${labelField},'${searchText}'))`; // Default to previous behavior
        }
      }
      tempProperties.BaseUrl = tempProperties.BaseUrl + `?$top=100${applyQuery}&$filter=(${filter} ${additionalFields})&$orderby=${labelField}`;
    }

    FetchData(tempProperties).then((res) => {
      if (!res.error) {
        let options = res.body ? res.body.value : [];
        options = options.map((opt) => {
          return {
            label: labelField2 ? opt[labelField] + labelDelimiter + opt[labelField2] : opt[labelField], // If labelField2 exists, add to option label
            value: valueField ? opt[valueField] : opt,
          };
        });
        this.setState({ options });
      }
    });
  });
  filterOption = (option, inputValue) => {
    let { type } = this.props;

    if (type === 'fuzzy') {
      if (option.label.toUpperCase().includes(inputValue.toUpperCase())) {
        return true;
      } else {
        return false;
      }
    } else {
      if (option.label.toUpperCase().startsWith(inputValue.toUpperCase())) {
        return true;
      } else {
        return false;
      }
    }
  };
  render() {
    let { disabled, id, onChange, onClick, selectClassName, value, wrapperClassName, isClearable, placeholder, labelField2 } = this.props;
    let { options } = this.state;
    return (
      <div className={wrapperClassName} value={value} onChange={this.handleSearchChange}>
        <Select
          className={selectClassName + (disabled ? ' disabled-dropdown' : '')}
          id={id}
          isDisabled={disabled}
          options={options}
          onChange={(e) => {
            //Execute passed in OnChange and if the e value is cleared, re-get options with this.search
            onChange(e);
            if (!e) {
              this.search('null');
            }
          }}
          onClick={onClick}
          filterOption={!labelField2 && this.filterOption} // Only do this caps check for labels that are 1 value
          onBlur={() => {
            if (!value) {
              this.search('null');
            }
          }}
          value={value}
          isClearable={isClearable}
          placeholder={placeholder}
        />
      </div>
    );
  }
}