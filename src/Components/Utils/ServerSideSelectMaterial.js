import React from 'react';
// import Select from 'react-select';
import { FetchData } from './DataService';
import { getRealProperty } from './HelperFunctions';
import debounce from 'lodash/debounce';
import Select from '@material-ui/core/Select';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
const INITIAL_STATE = {
  searchText: '',
  options: [],
  loading: false,
};

export default class ServerSideSelectMaterial extends React.Component {
  isInitial = true;
  firstTime = true;
  key = 'server-side-select';
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted && this.search();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSearchChange = (e) => {
    this.isInitial = false;
    this.setState({ searchText: e.target.value }, () => {
      this.search();
    });
  };

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  search = debounce(() => {
    this.setState({ loading: true });
    let {
      fetchProperties,
      labelField,
      labelField2 = null,
      labelField3 = null,
      labelField4 = null,
      labelField5 = null,
      labelDelimiter = ' ',
      labelMask = '',
      groupField = '',
      groupValue = '',
      valueField,
      initialDropdown,
      query,
      paramOverride = '',
      startsWith = false,
      orderBy = (labelField ? '' + labelField : '') +
        (labelField2 ? ',' + labelField2 : '') +
        (labelField3 ? ',' + labelField3 : '') +
        (labelField4 ? ',' + labelField4 : '') +
        (labelField5 ? ',' + labelField5 : ''),
    } = this.props;
    let { searchText } = this.state;
    let tempProperties = Object.assign({}, fetchProperties);
    let baseUrl = tempProperties.BaseUrl;
    let queryAdd = query ? query : '';
    let singleValue = false;
    let originalUrl = tempProperties.BaseUrl;
    if (labelField2 === undefined) {
      labelField2 = '';
    }
    if (!labelDelimiter) {
      labelDelimiter = '';
    }
    if (paramOverride) {
      // BMILLER - use custom parameters and override the filter logic for non ODATA calls
      // Example UserNameContains=%VALUE%&FirmId=999
      if (searchText) {
        paramOverride = paramOverride.replace('%VALUE%', searchText);
        tempProperties.BaseUrl = baseUrl + '?' + paramOverride;
      } else {
        // If no search text, remove the UserNameContains=%VALUE%
        paramOverride = paramOverride.replace('UserNameContains=%VALUE%', '');
        tempProperties.BaseUrl = baseUrl + '?' + paramOverride;
      }
    } else {
      if (initialDropdown && this.isInitial && this.props.value) {
        singleValue = true;
        // BMILLER - Adding this so that when a {label:'', value: ''} default is is in this drop down, we show results = to that default value rather than no results
        let val = this.props.value;
        if (this.props.value['value']) {
          val = `'${this.props.value['value']}'`;
        } else if (this.props.value !== '') {
          val = `'${this.props.value}'`;
        } else {
          if (this.props.value[0]) {
            val = `''`;
          }
        }
        tempProperties.BaseUrl = tempProperties.BaseUrl + `?$top=100&$filter=(cast(${valueField}, 'Edm.String') eq ${val})${queryAdd}&$orderby=${orderBy}`;
      } else {
        // BMILLER - Sometimes you come in here with an ID, need to cast the element we are searching on to string
        singleValue = false;
        let addSearchStartsWith = labelField3 ? ` or startswith(cast(${labelField3} , 'Edm.String'),'${searchText}')` : '';
        addSearchStartsWith = labelField4 ? `${addSearchStartsWith} or startswith(cast(${labelField4} , 'Edm.String'),'${searchText}')` : addSearchStartsWith;
        addSearchStartsWith = labelField5 ? `${addSearchStartsWith} or startswith(cast(${labelField5} , 'Edm.String'),'${searchText}')` : addSearchStartsWith;

        let addSearchContains = labelField3 ? ` or contains(cast(${labelField3} , 'Edm.String'),'${searchText}')` : '';
        addSearchContains = labelField4 ? `${addSearchContains} or contains(cast(${labelField4} , 'Edm.String'),'${searchText}')` : '';
        addSearchContains = labelField5 ? `${addSearchContains} or contains(cast(${labelField5} , 'Edm.String'),'${searchText}')` : '';

        if (labelField2) {
          if (startsWith) {
            tempProperties.BaseUrl =
              tempProperties.BaseUrl +
              `?$top=100&$filter=(startswith(cast(${labelField} , 'Edm.String'),'${searchText}') or startswith(cast(${labelField2} , 'Edm.String'),'${searchText}'))${addSearchStartsWith}${queryAdd}&$orderby=${orderBy}`;
          } else {
            tempProperties.BaseUrl =
              tempProperties.BaseUrl +
              `?$top=100&$filter=(contains(cast(${labelField} , 'Edm.String'),'${searchText}') or contains(cast(${labelField2} , 'Edm.String'),'${searchText}'))${addSearchContains}${queryAdd}&$orderby=${orderBy}`;
          }
        } else {
          if (startsWith) {
            tempProperties.BaseUrl =
              tempProperties.BaseUrl + `?$top=100&$filter=(startswith(cast(${labelField} , 'Edm.String'),'${searchText}'))${addSearchStartsWith}${queryAdd}&$orderby=${orderBy}`;
          } else {
            tempProperties.BaseUrl =
              tempProperties.BaseUrl + `?$top=100&$filter=(contains(cast(${labelField} , 'Edm.String'),'${searchText}'))${addSearchContains}${queryAdd}&$orderby=${orderBy}`;
          }
        }
      }
    }

    this._isMounted &&
      FetchData(tempProperties).then(async (res) => {
        if (!res.error) {
          let options = res.body ? (res.body['Value'] ? res.body.Value : res.body['value'] ? res.body.value : []) : [];
          // // When a value is passed in and selected in the drop down, we still want to grab the first 100 so the user doesn't have to clear the drop down to see more options in the drop down
          // // Adding this additional read if we only selected 1 value up above
          if (singleValue) {
            singleValue = false;
            let tempProps2 = tempProperties;
            tempProps2.BaseUrl = originalUrl + `?$top=100&$filter=(cast(${valueField}, 'Edm.String') ne null)${queryAdd}&$orderby=${orderBy}`;
            let res2 = await FetchData(tempProps2);
            let options2 = res2.body ? (res2.body['Value'] ? res2.body.Value : res2.body['value'] ? res2.body.value : []) : [];
            let single = options[0][valueField];
            if (
              options2.find((x) => {
                return x[valueField] === single;
              })
            ) {
              options = [...options2];
            } else {
              options = [...options, ...options2];
            }
          }

          if (labelMask) {
            options = options.map((opt) => {
              let groupFieldObj = {};
              let groupValueObj = {};
              if (groupField) {
                groupFieldObj[groupField] = opt[groupField];
              }
              if (groupValue) {
                groupValueObj[groupValue] = opt[groupValue];
              }
              let label = labelMask;
              // include any element from data in the label
              if (label.indexOf('{') !== -1) {
                let x = 0;
                while (label.indexOf('{') !== -1 && x < 50) {
                  let property = label.substring(label.indexOf('{') + 1, label.length);
                  property = property.substring(0, property.indexOf('}'));
                  const realProperty = getRealProperty(opt, property);
                  if (realProperty && opt[realProperty]) {
                    label = label.replace(`{${property}}`, opt[realProperty]);
                  } else {
                    label = label.replace(`{${property}}`, '');
                  }
                  x++; // Just in case - endless loop prevention
                }
                label = label.replace(', ,', '');
                label = label.replace(', ,', '');
                label = label.replace(',  |', ' |');
                label = label.replace(', |', ' |');
                label = label.replace('  |', ' |');

                return {
                  label: label,
                  value: opt[valueField],
                  ...groupFieldObj,
                  ...groupValueObj,
                  data: opt,
                };
              }
              return {
                label: labelField2 ? opt[labelField] + labelDelimiter + opt[labelField2] : opt[labelField],
                value: opt[valueField],
                ...groupFieldObj,
                ...groupValueObj,
                data: opt,
              };
            });
          } else {
            options = options.map((opt) => {
              let groupFieldObj = {};
              let groupValueObj = {};
              if (groupField) {
                groupFieldObj[groupField] = opt[groupField];
              }
              if (groupValue) {
                groupValueObj[groupValue] = opt[groupValue];
              }
              return {
                label: labelField2 ? opt[labelField] + labelDelimiter + opt[labelField2] : opt[labelField],
                value: opt[valueField],
                ...groupFieldObj,
                ...groupValueObj,
                data: opt,
              };
            });
          }

          this._isMounted && this.setState({ options, loading: false });
        }
      });
  }, 500);

  onInputChange = (event, newInputValue, reason) => {
    this.isInitial = false;
    if (reason === 'clear') {
      this.setState({ searchText: '' }, () => {
        this.search();
      });
    }
  };

  handleDefault = (def) => {
    if (def && this.firstTime) {
      this.firstTime = false;
      this.key = def;
    }
  };
  render() {
    let { disabled, id, onChange, onClick, selectClassName, value: passedValue, defaultValue, wrapperClassName, placeholder, name, multi, groupField } = this.props;
    let { searchText, options, loading } = this.state;

    let def = options.filter((x) => {
      return x.value === passedValue;
    });

    if (this.key === 'server-side-select') {
      this.handleDefault(def[0], id);
    }

    return (
      <div className={wrapperClassName} value={searchText} onKeyUp={this.handleSearchChange}>
        <Autocomplete
          key={this.key}
          id={id}
          name={name}
          disabled={disabled}
          options={options}
          renderOption={(option) => <>{option.label}</>}
          groupBy={(option) => option[groupField]}
          getOptionLabel={(option) => option.label}
          filterOptions={(x) => x}
          getOptionSelected={(option, value) => option.value === value.value}
          defaultValue={defaultValue && defaultValue}
          placeholder={placeholder && placeholder}
          multi={multi}
          onChange={onChange}
          noOptionsText={loading ? 'Loading...' : 'No options'}
          onInputChange={this.onInputChange}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      </div>
    );
  }
}
